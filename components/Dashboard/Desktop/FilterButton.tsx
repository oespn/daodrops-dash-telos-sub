import React from 'react';

function FilterButton({
  rows
}) {
  return (
    <div className="">
      <div className="flex items-center">
        <button className="btn bg-white border-gray-200 hover:border-gray-300 text-red-500 hover:text-red-600">Filter</button>
      </div>
    </div>
  );
}

export default FilterButton;