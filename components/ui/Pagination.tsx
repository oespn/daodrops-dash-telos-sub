import React from 'react';

function Pagination(props) {
  const { total, nextPage, prevPage, currentPage = 0, itemPerPage = 10 } = props
  const from = currentPage * itemPerPage + 1;
  const to = Math.min((currentPage + 1) * itemPerPage, total)
  const totalPageCount = Math.ceil(total / itemPerPage)
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
      <nav className="sm:order-1" role="navigation" aria-label="Navigation">
        <ul className="flex justify-center">
          <li className="ml-3 first:ml-0">
            <button className={`btn bg-white border-gray-200 ${currentPage == 0 ? 'text-gray-300 cursor-not-allowed' : 'hover:border-gray-300 text-indigo-500'}`} onClick={prevPage} >&lt;- Previous</button>
          </li>
          <li className="ml-3 first:ml-0">
            <button className={`btn bg-white border-gray-200 ${currentPage >= totalPageCount - 1 ? 'text-gray-300 cursor-not-allowed' : 'hover:border-gray-300 text-indigo-500'}`} onClick={nextPage}>Next -&gt;</button>
          </li>
        </ul>
      </nav>
      <div className="text-sm text-gray-500 text-center sm:text-left">
        Showing <span className="font-medium text-gray-600">{from}</span> to <span className="font-medium text-gray-600">{to}</span> of <span className="font-medium text-gray-600">{total}</span> results
      </div>
    </div>
  );
}

export default Pagination;