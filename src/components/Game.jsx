import { useEffect, useState } from "react";
import PACK_OF_BLOCKS from '../utiles/packOfBlocks'
import shuffleArray from "../utiles/shuffelArray";
import { io } from 'socket.io-client';
import DraggableElement from "./Draggable";
import TargetElement from "./Target";

const socket = io("http://localhost:4000")

const Game = () => {
  const [gameOver, setGameOver] = useState(false)
  const [winner, setWinner] = useState('')
  const [turn, setTurn] = useState('')
  const [playerHeand1, setPlayerHeand1] = useState(new Array(20).fill(null))
  const [playerHeand2, setPlayerHeand2] = useState([])
  const [bordBlocksPile, setBordBlocksPile] = useState(new Array(60).fill(null))
  const [drawBlockPile, setDrawBlockPile] = useState([])
  const [gridColumns, setGridColumns] = useState(10);


  useEffect(() => {
    const shuffelBlocks = shuffleArray(PACK_OF_BLOCKS)

    const playerHeandStart1 = shuffelBlocks.splice(0, 14)
    const playerHeandStart2 = shuffelBlocks.splice(0, 14)
    while(playerHeandStart1.length < 20) {
      playerHeandStart1.push(null);
   }

    const drawBlockPile = shuffelBlocks

    socket.emit('initGameState', {
      gameOver: false,
      turn: 'Player 1',
      playerHeand1: playerHeandStart1,
      playerHeand2: playerHeandStart2,
      bordBlocksPile: bordBlocksPile,
      drawBlockPile: drawBlockPile
    })
  }, [])
  // console.log(playerHeand1)

  useEffect(() => {
    socket.on('initGameState', ({ gameOver, turn, playerHeand1, playerHeand2, bordBlocksPile, drawBlockPile }) => {
      setGameOver(gameOver)
      setTurn(turn)
      setPlayerHeand1(playerHeand1)
      setPlayerHeand2(playerHeand2)
      setBordBlocksPile(bordBlocksPile)
      setDrawBlockPile(drawBlockPile)
    })
  }, [])
  const drawCard = () => {
    const popedCard =drawBlockPile.pop()
    
    if(popedCard !== undefined) {
      const epmtyIndex = playerHeand1.findIndex(item => item === null)
      if(epmtyIndex !== -1){
        playerHeand1[epmtyIndex] = popedCard
      } else {
        playerHeand1.push(popedCard, null)

        if( gridColumns > 10 && playerHeand1.filter(item => item === null).length >= 3){
          setGridColumns(gridColumns - 1)
        } else {
          setGridColumns(gridColumns +  1);
        }
      }
      setPlayerHeand1([...playerHeand1])
    }
  }

  const handleDragStart = (e) => {
    // e.dataTransfer.setData('text/plain', ''); // required for Firefox
    e.dataTransfer.setData('text/plain', e.target.textContent);
  };

  const handleDragEnd = (item, i) => {
    // e.target.classList.remove('bg-red-600', 'hover:bg-red-700', 'opacity-75');
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    // Add your styles when the draggable element is dragged over the target
    e.target.classList.add('bg-slate-500', 'text-black');
    // console.log(index)
  };

  const handleDragLeave = (e) => {
    // Remove the styles when the draggable element leaves the target
    e.target.classList.remove('bg-slate-500', 'text-black');
  };

  const handleDrop = (e, index, type) => {
    e.preventDefault();
    // Handle the drop event if needed
    // You can access the dragged data using e.dataTransfer.getData()
    e.target.classList.remove('bg-slate-500', 'text-black');
    const item = e.dataTransfer.getData('text/plain');
    const originalIndex = bordBlocksPile.indexOf(item)
    const originalhandIndex = playerHeand1.indexOf(item)
    if(originalIndex !== -1 &&  originalIndex !== index && bordBlocksPile[index] === null){

      bordBlocksPile[originalIndex] = null
    }
    if(bordBlocksPile[index] === null && item != '' && type === 'bord'){
      bordBlocksPile[index] = item;
      setBordBlocksPile([...bordBlocksPile]);
      
      //neet to fix this cose the problem with the duplicate drag drop
      const itemIndex = playerHeand1.findIndex(i => i === item);
      if(itemIndex !== -1) {
        playerHeand1[itemIndex]= null
        setPlayerHeand1([...playerHeand1])
      }
      console.log(bordBlocksPile)
    }else if (playerHeand1[index] === null && item != '' && type === 'hand') {
      const temp = playerHeand1[index]
      playerHeand1[index] = playerHeand1[originalhandIndex]
      playerHeand1[originalhandIndex] = temp
      setPlayerHeand1([...playerHeand1])
    }
  };

  return (
    <>
      <div className="flex justify-center items-center my-4">
        <div className=" grid grid-cols-12 grid-rows-4 gap-0 w-[70%] justify-center text-center">
          {bordBlocksPile.map((block, index) => (
            <div key={index} data- onDragStart={(e) => handleDragStart(e)} onDragEnd={handleDragEnd} onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={(e) => handleDrop(e, index, 'bord')} className=' border-2 py-12 px-2 border-black border-solid' draggable >{block !== null ? block : ''}</div>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-5 justify-center items-center ">
        <div className=" col-span-1"></div>
        <div style={{gridTemplateColumns:`repeat(${gridColumns}, minmax(0, 1fr))`}} className= "col-span-3 grid bg-blue-200 w-full justify-center place-items-center text-center">
          {playerHeand1.map((item, i) => (
            <div key={i} onDragStart={(e) => handleDragStart(e)} onDragEnd={handleDragEnd} onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={(e) => handleDrop(e, i, 'hand')} className='py-12 px-2 w-full h-full' draggable >{item}</div>
          ))}
        </div>
        <div className="col-span-1 flex justify-center items-center bg-blue-700 m-2 h-full rounded-md mx-[100px]">
          <button onClick={drawCard}>Draw Card</button>
        </div>
      </div>
    </>

  )
}

export default Game