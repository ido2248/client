const TargetElement = () => {
    const handleDragOver = (e) => {
      e.preventDefault();
      // Add your styles when the draggable element is dragged over the target
      e.target.classList.add('bg-green-500', 'text-black');
    };
  
    const handleDragLeave = (e) => {
      // Remove the styles when the draggable element leaves the target
      e.target.classList.remove('bg-green-500', 'text-black');
    };
  
    const handleDrop = (e) => {
      e.preventDefault();
      // Handle the drop event if needed
      // You can access the dragged data using e.dataTransfer.getData()
    };
  
    return (
      <div
        className="target w-48 h-24 bg-gray-300 text-center flex items-center justify-center"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        Drop here
      </div>
    );
  };

  export default TargetElement