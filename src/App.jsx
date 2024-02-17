import { useEffect, useState } from "react";
import PACK_OF_BLOCKS from './utiles/packOfBlocks'
import shuffleArray from "./utiles/shuffelArray";
import { io } from 'socket.io-client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import Game from "./components/Game";


// const socket = io("http://localhost:4000")
function App() {
  // const [gameOver, setGameOver] = useState(false)
  // const [winner, setWinner] = useState('')
  // const [turn, setTurn] = useState('')
  // const [playerHeand1, setPlayerHeand1] = useState([])
  // const [playerHeand2, setPlayerHeand2] = useState([])
  // const [bordBlocksPile, setBordBlocksPile] = useState([])
  // const [drawBlockPile, setDrawBlockPile] = useState([])


  //   useEffect(() => {
  //     const shuffelBlocks = shuffleArray(PACK_OF_BLOCKS)

  //     const playerHeand1 = shuffelBlocks.splice(0,14)
  //     const playerHeand2 = shuffelBlocks.splice(0,14)
      
  //     const drawBlockPile = shuffelBlocks

  //     socket.emit('initeGame', {
  //       gameOver: true,
  //       turn: 'Player 1',
  //       playerHeand1: [playerHeand1],
  //       playerHeand2: [playerHeand2],
  //       bordBlocksPile: [bordBlocksPile],
  //       drawBlockPile:[drawBlockPile]
  //     })
      
  //   }, [])

  //   useEffect(() => {
  //     socket.on('initGameState', ({ gameOver, turn, playerHeand1, playerHeand2, playedCardsPile, drawCardPile }) => {
  //         setGameOver(gameOver)
  //         setTurn(turn)
  //         setPlayerHeand1(playerHeand1)
  //         setPlayerHeand2(playerHeand2)
  //         setBordBlocksPile(playedCardsPile)
  //         drawBlockPile(drawCardPile)
  //     })
  //   }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/game" element={<Game/>}/>
      </Routes>
    </BrowserRouter>
    
  )
}

export default App
