import {
  BsCheck2,
  BsFillChatFill,
  BsFillJournalBookmarkFill,
  BsFillPencilFill,
} from 'react-icons/bs'
import { BiPlusCircle } from 'react-icons/bi'
import { MdShowChart } from 'react-icons/md'
import { AiOutlineEllipsis } from 'react-icons/ai'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { useState, useEffect } from 'react'

import { useDebounce } from 'use-debounce';

import { useForm, Controller } from 'react-hook-form'
import Select from 'react-select';


import Pagination from '../../ui/Pagination'
import SearchResultsTable from './SearchResultsTable'
import ActionButton from './ActionButton'
import FilterButton from './FilterButton'

import RightPanel from '../../ui/RightPanel'


import { daoList, daoListDD, pageUsers, getTopActiveMembers } from '../../../api';
import { searchUserByName } from '../../../api';
import CampaignSelect from '../../Campaign/CampaignSelect'
import { supabase } from '../../../utils/supabaseClient'
import { AirdropContract } from '../../Campaign/AirdropContract'

const DashboardDAO = (props) => {
  const {
    selectSkills = "",
    selectedItems = [],
    selectItems
  } = props
  const router = useRouter();

  const [mode, setMode] = useState('dao')
  const [targetlists, setTargetlists] = useState([]);
  const [selectedList, setSelectedList] = useState(null)

  //const [rows, setRows] = useState([]);
  // DB source

  const isUseDB = false;

  
  const [orgId, setOrgId] = useState(null);

  const handleSelectedItems = (items) => {
    const tmp = [...items];
    const ids = tmp.map(o => o.id)
    const filtered = tmp.filter(({id}, index) => !ids.includes(id, index + 1))
    selectItems([...filtered]);
  };

  const [currentPage, setCurrentPage] = useState(0);
  const [inputText, setInputText] = useState("");
  const [searchString] = useDebounce(inputText, 500);
  const inputHandler = (e) => {
    //convert input text to lower case
    var lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };

  const [show, setShow] = useState(false);

  const { handleSubmit, register, control, getValues, watch, setValue, formState: { errors } } = useForm({
    // default data
    defaultValues: {
      filterSkills: [],
      openToOffers: false
    }
  });

  const skills = [
    { value: 'Development', label: 'Development' },
    { value: 'Community', label: 'Community' },
    { value: 'UX Design', label: 'UX Design' },
  ]

  const modes = [{
    value: 'dao', label: 'Filter (Dao lists)'
  }, {
    value: 'list', label: 'Filter (Target lists)'
  }]

  const daos = [];
  const from = currentPage * 10;
  const to = (currentPage + 1) * 10 - 1;

  let tmp = mode == 'dao' ? orgId : (selectedList ? selectedList : (targetlists.length > 0 ? targetlists[0].id : ''))

  const { data, count } = pageUsers(from, to, searchString, tmp, mode);

  let rows = data || [];
  if (rows.length > 10) {
    rows = rows.slice(from, to)
  }
  let rowCount = count != undefined ? count : (data || []).length;

  if (mode == 'dao') {
    daoListDD().then((dd) => {
      if (dd) {
        dd.data.resources.map(d => {

          const imgUrl = d.logo?.startsWith('http') ? d.logo : undefined;
          daos.push(
            {
              value: d.organizationId,
              label: d.name,
              image: imgUrl
            })
        })
      }
    });
  }

  const getTargetList = async () => {
    const user_id = localStorage.getItem('user')
    const res = await supabase
      .from('targetlist')
      .select('*')
      .eq('created_by', user_id)

    setTargetlists(res.data);

    let contract = AirdropContract(targetlists);
    setAirDropContract(contract);

  }

  useEffect(() => {
    getTargetList()
  }, [])

  const onSelectMode = async (item) => {
    if (item != mode) {
      selectItems([])
    }
    setMode(item);
  };

  const nextPage = () => {
    setCurrentPage(currentPage + 1)
  }

  const prevPage = () => {
    setCurrentPage(currentPage - 1)
  }

  const onSelectDao = async (item) => {
    setOrgId(item.value);
    selectItems([])
  };

  const onSelectTargetList = async (item) => {
    setSelectedList(item.value);
    selectItems([])
  };

  const computedTargetLists = targetlists.map(item => ({
    ...item,
    value: item.id,
    label: item.name
  }));

  const addToTargetList = () => {
    //
    setShow(!show)
  }



  const [airDropContract, setAirDropContract] = useState("");


  const comp = <CampaignSelect selectedItems={selectedItems} rowCount={rowCount} contract={airDropContract} />

  const selectAllEnabled = (mode == 'dao' && orgId) || mode == 'list'

  const selectAll = (all) => {
    console.log(all, data)
    if (all) {
      selectItems(data)
    } else {
      selectItems([])
    }
  }
  return (

    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
      <div className="sm:flex sm:justify-between sm:items-center mb-4">
        <div className="mb-4 sm:mb-0">
          <h1 className="text-2xl md:text-3xl text-gray-800 font-bold">Accounts 🎯</h1>
          <div className={`${selectedItems.length < 1 && 'hidden'}`}>
            <div className="hidden xl:block text-sm italic mr-2 whitespace-nowrap"><span>{selectedItems.length}</span> selected</div>
          </div>
        </div>
      </div>
      <div className="sm:flex sm:justify-between sm:items-center mb-4">
        <div className="flex justify-left w-100">
          <div className="justify justify-left">
            <span className="font-medium mb-2 flex mr-5">Source</span>
          </div>
      
          <div className="form-check justify-left w-20">
            <input className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="flexRadioDefault" id="flexRadioDefault1" defaultChecked={mode == 'dao'}
              onClick={()=>onSelectMode('dao')}/>
            <label className="form-check-label inline-block text-gray-800" htmlFor="flexRadioDefault1">
              DAOs
            </label>
          </div>
          <div className="form-check justify-left w-40">
            <input className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="flexRadioDefault" id="flexRadioDefault2" defaultChecked={mode == 'list'}
              onClick={()=>onSelectMode('list')}/>
            <label className="form-check-label inline-block text-gray-800" htmlFor="flexRadioDefault2">
              Target lists
            </label>
          </div>
        </div>
        {
          mode == 'dao'
          && <div className="mb-3 sm:mb-0 filter-w">
            <span className="font-medium mb-2">By DAO / $Project </span>
            <Select
              instanceId="daoSelect"
              options={daos}
              className="w-full min-w-100"
              classNamePrefix="select"
              placeholder="Dao"
              formatOptionLabel={i => (
                <div className="flex flex-left">{i.image ? <img src={i.image} className="mr-1" height="30px" width="30px" /> : <span></span>} ${i.label}</div>
              )}
              onChange={onSelectDao}
            />
          </div>
        }
        {
          mode == 'list'
          && <div className="mb-3 sm:mb-0 filter-w">
            <span className="font-medium mb-2">Target lists</span>
            <Select
              instanceId="targetSelect"
              options={computedTargetLists}
              className="w-full min-w-100"
              classNamePrefix="select"
              placeholder="Target List"
              formatOptionLabel={i => (
                <div className="flex flex-left">{i.label}</div>
              )}
              onChange={onSelectTargetList}
            />
          </div>
        }
        <div className="mb-3 sm:mb-0">
          <span className="font-medium mb-2">Find account </span>
          <input
            className="px-4 py-2 w-full rounded-full border-b-2"
            placeholder="Search..."
            onChange={inputHandler}
          />
        </div>
        <div className="mb-3 sm:mb-0">
          <span className="font-medium mb-2">Filter skills &amp; interests </span>
          {/* <Controller
            control={control}
            name="filterSkills"
            render={({ field }) => (  */}
          <Select
            instanceId="profileSkills"
            isMulti
            options={skills}
            className="basic-multi-select"
            classNamePrefix="select"
            placeholder="Add"
          // {...field}
          />
          {/* )}
          /> */}
        </div>
        <div className="flex">
          {/* Selected Action button */}
          <ActionButton selectedItems={selectedItems} onClick={() => addToTargetList()} />
          {/* Dropdown */}
          {/* Filter button 
          <FilterButton rows={rows} /> */}

          <button
            onClick={() => setShow(!show)}
            className="text-white bg-blue-700 btn ml-5"
          >
            Campaign options
          </button>

          <RightPanel title={'Campaigns'}
            comp={comp}
            body=""

            show={show} setShow={setShow}
          />
        </div>
      </div>

      {/* Table */}
      <SearchResultsTable
        total={rowCount}
        data={rows}
        selectItems={handleSelectedItems}
        selectedItems={selectedItems}
        selectAllEnabled={selectAllEnabled}
        selectAll={selectAll}
      />

      {/* Pagination */}
      <div className="mt-8">
        {<Pagination total={rowCount} currentPage={currentPage} nextPage={nextPage} prevPage={prevPage} />}
      </div>
    </div>

  )
}

export default DashboardDAO