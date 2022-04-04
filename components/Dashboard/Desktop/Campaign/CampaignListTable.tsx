import React, { useState, useEffect } from 'react';
import CampaignListTableItem from './CampaignListTableItem';

function CampaignListTable({
  selectedItems,
  data = [],
  total
}) {
  const [selectAll, setSelectAll] = useState(false);
  const [isCheck, setIsCheck] = useState([]);
  const [list, setList] = useState([data]);

  const handleSelectAll = (e) => {
    const { checked } = e.target;
    setSelectAll(!selectAll);
    if (!checked) {
      setIsCheck([]);
    } else {
      setIsCheck(data.map(li => li['id']));
    }
  };

  const handleClick = e => {
    const { id, checked } = e.target;
    setSelectAll(false);
    const itemid = parseInt(id)
    if (!checked) {
      setIsCheck(isCheck.filter(item => item !== itemid));
    } else {
      setIsCheck([...isCheck, itemid]);
    }
  };

  useEffect(() => {
    selectedItems(isCheck);
  }, [isCheck]);

  return (
    <div className="bg-white shadow-lg rounded-sm border border-gray-200 relative z-screen">
      <header className="px-5 py-4">
        <h2 className="font-semibold text-gray-800">Campaign List <span className="text-gray-400 font-medium">{total}</span></h2>
      </header>
      <div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full divide-y divide-gray-200">
            {/* Table header */}
            <thead className="text-xs uppercase text-gray-500 bg-gray-50 border-t border-gray-200">
              <tr>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
                  <div className="flex items-center">
                    <label className="inline-flex">
                      <span className="sr-only">Select all</span>
                      <input className="form-checkbox" type="checkbox" checked={selectAll} onChange={handleSelectAll} />
                    </label>
                  </div>
                </th>
                <th className="px-2 first:pl-3 last:pr-3 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Detail</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Type</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Token</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Amount</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold">Created At</div>
                </th>
              </tr>
            </thead>
            {/* Table body */}
            {
              data.map((item) => {
                return (
                  <CampaignListTableItem
                    key={item.id}
                    id={item.id}
                    item={item}
                    handleClick={handleClick}
                    isChecked={isCheck.includes(item.id)}
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

export default CampaignListTable;
