import React from 'react';

function ActionButton({
  selectedItems,
  onClick
}) {
  return (
    <div className={`${selectedItems.length < 1 && 'hidden'}`}>
      <div className="flex items-center">
        {/* <div className="hidden xl:block text-sm italic mr-2 whitespace-nowrap"><span>{selectedItems.length}</span> items selected</div> */}
        {/* <button onClick={onClick}
         className="btn p-3 bg-white border-1 border-blue-200 hover:border-blue-300 text-blue-500 hover:text-blue-600">Disabled for DAO Drops</button> */}
      </div> 
    </div>
  );
}

export default ActionButton;