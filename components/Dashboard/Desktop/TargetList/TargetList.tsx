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


import Pagination from '../../../ui/Pagination'
import TargetListTable from './TargetListTable'
import ActionButton from '../ActionButton'
import FilterButton from '../FilterButton'

import RightPanel from '../../../ui/RightPanel'


import { daoList, daoListDD, pageUsers, getTopActiveMembers } from '../../../../api';
import { searchUserByName } from '../../../../api';
import CampaignSelect from '../../../Campaign/CampaignSelect'
import { supabase } from '../../../../utils/supabaseClient'
import RightPanelSelect from './RightPanelSelect'

const TargetList = (props) => {
  const {
    searchKeyword = "",
    selectSkills = ""
  } = props

  const router = useRouter();

  //const [rows, setRows] = useState([]);
  // DB source

  const isUseDB = false;

  const [selectedItems, setSelectedItems] = useState([]);
  const [orgId, setOrgId] = useState(null);

  const handleSelectedItems = (selectedItems) => {
    setSelectedItems([...selectedItems]);
  };
  const [targetlists, setTargetlists] = useState([])
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

  const getTargetList = async () => {
    const user_id = localStorage.getItem('user')
    const res = await supabase
      .from('targetlist')
      .select('*')
      .eq('created_by', user_id)
    
    console.log(res)

    setTargetlists(res.data)
  }

  useEffect(() => {
    getTargetList()
  }, [])

  const from = currentPage * 10;
  const to = (currentPage + 1) * 10 - 1;

  let rows = [];
  let rowCount = 0;

  if (targetlists.length > 10) {
    rows = targetlists.slice(from, to)
    rowCount = targetlists.length;
  } else {
    rows = Object.assign([], targetlists)
    rowCount = targetlists.length;
  }

  const nextPage = () => {
    setCurrentPage(currentPage + 1)
  }

  const prevPage = () => {
    setCurrentPage(currentPage - 1)
  }

  const onSelectDao = async (item) => {
    setOrgId(item.value);
  };

  const viewDetails = () => {
    //
  }

  console.log(rows)

  const comp = <RightPanelSelect selectedItems={() => {}} />

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
      <div className="sm:flex sm:justify-between sm:items-center mb-4">
        <div className="mb-4 sm:mb-0">
          <h1 className="text-2xl md:text-3xl text-gray-800 font-bold">Target Lists</h1>
          <div className={`${selectedItems.length < 1 && 'hidden'}`}>
            <div className="hidden xl:block text-sm italic mr-2 whitespace-nowrap"><span>{selectedItems.length}</span> selected</div>
          </div>
        </div>

        <button
          onClick={() => setShow(!show)}
          className="text-white bg-blue-700 btn ml-5"
        >
          Add a list 
        </button>

      </div>
      <RightPanel title={'Campaigns'}
        comp={comp}
        body=""
        show={show} setShow={setShow}
      />

      {/* Table */}
      <TargetListTable total={rowCount} data={rows} selectedItems={handleSelectedItems} />

      {/* Pagination */}
      <div className="mt-8">
        {<Pagination total={rowCount} currentPage={currentPage} nextPage={nextPage} prevPage={prevPage} />}
      </div>
    </div>

  )
}

export default TargetList