import React, { useState, useEffect } from 'react';
import SearchResultsTableItem from './SearchResultsTableItem';


function SearchResultsTable({
  selectItems,
  selectedItems,
  data = [],
  total,
  selectAllEnabled,
  selectAll
}) {
  const [allSelected, setAllSelected] = useState(false);
  const [isCheck, setIsCheck] = useState([]);
  const [list, setList] = useState([data]);

  const handleSelectAll = (e) => {
    const { checked } = e.target;
    setAllSelected(!allSelected);
    if (!checked) {
      selectAll(false);
      // setIsCheck([]);
    } else {
      selectAll(true);
      // setIsCheck(data.map(li => li['id']));
    }
  };

  const handleClick = e => {
    const { id, checked } = e.target;
    setAllSelected(false);
    const itemid = parseInt(id)
    if (!checked) {
      console.log(itemid, checked)
      const newItems = selectedItems.filter(item => '' + item.id != '' + itemid)
      console.log(newItems)
      selectItems(newItems);
    } else {
      const item = data.filter(item => item.id === itemid)
      selectItems([...selectedItems, item[0]]);
    }
  };


  return (
    <div className="bg-white shadow-lg rounded-sm border border-gray-200 relative z-screen">
      <header className="px-5 py-4">
        <div className="flex justify-between">
          <h2 className="font-semibold text-gray-800">Enriched Accounts <span className="text-gray-400 font-medium">{total}</span></h2>
          {
            selectAllEnabled &&
            (
              <div className="flex items-center">
                <label className="inline-flex items-center">
                  <span className="mr-2">Select all</span>
                  <input className="form-checkbox" type="checkbox" checked={allSelected} onChange={handleSelectAll} />
                </label>
              </div>
            )
          }
        </div>
      </header>
      <div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full divide-y divide-gray-200">
            {/* Table header */}
            <thead className="text-xs uppercase text-gray-500 bg-gray-50 border-t border-gray-200">
              <tr>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
                  {/* <div className="flex items-center">
                    <label className="inline-flex">
                      <span className="sr-only">Select all</span>
                      <input className="form-checkbox" type="checkbox" checked={selectAll} onChange={handleSelectAll} />
                    </label>
                  </div> */}
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Avatar</div>
                </th>
                <th className="px-2 first:pl-3 last:pr-3 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Username</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Tags</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Votes</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold">Proposals</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Address</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <span className="sr-only">Menu</span>
                </th>
              </tr>
            </thead>
            {/* Table body */}
            {
              data.map(item => {
                return (
                  <SearchResultsTableItem
                    key={item.eth_address || item.address}
                    id={item.id}
                    image={item.profile_image_url || item.avatar}
                    username={item.username || item.name}
                    order={item.daosCount}
                    votes={item.votesCount || item.votes_count}
                    proposals={item.proposalsCount || item.proposals_count}
                    eth_address={item.eth_address || item.address}
                    tags={item.tags}
                    bio={item.bio}
                    handleClick={handleClick}
                    isChecked={selectedItems.map(item => item.id).includes(item.id)}
                  />
                )
              })
            }
          </table>

        </div>
      </div>
    </div>
  );
}

export default SearchResultsTable;
