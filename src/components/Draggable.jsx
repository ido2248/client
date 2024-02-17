
const DraggableElement = () => {
  const handleDragStart = (e) => {
    e.dataTransfer.setData('text/plain', ''); // required for Firefox
    e.target.classList.add('bg-red-600', 'hover:bg-red-700', 'opacity-75');
  };

  const handleDragEnd = (e) => {
    e.target.classList.remove('bg-red-600', 'hover:bg-red-700', 'opacity-75');
  };

  return (
    <div
      className="draggable w-32 h-16 bg-blue-500 text-white text-center flex items-center justify-center cursor-grab transition-all"
      draggable="true"
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      Drag me
    </div>
  );
};


export default DraggableElement;
