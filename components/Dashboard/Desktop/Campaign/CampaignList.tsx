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
  import CampaignListTable from './CampaignListTable'
  import ActionButton from '../ActionButton'
  import FilterButton from '../FilterButton'
  
  import RightPanel from '../../../ui/RightPanel'
  import CampaignSelect from '../../../Campaign/CampaignSelect'
  import { supabase } from '../../../../utils/supabaseClient'
  
  const CampaignList = (props) => {
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
    const [campaignList, setCampaignList] = useState([])
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
  
    const getCampaignList = async () => {
      const user_id = localStorage.getItem('user')
      const res = await supabase
        .from('campaign')
        .select('*')
        .eq('created_by', user_id)
      
      console.log(res)
  
      setCampaignList(res.data)
    }
  
    useEffect(() => {
      getCampaignList()
    }, [])
  
    const from = currentPage * 10;
    const to = (currentPage + 1) * 10 - 1;
  
    let rows = [];
    let rowCount = 0;
  
    if (campaignList.length > 10) {
      rows = campaignList.slice(from, to)
      rowCount = campaignList.length;
    } else {
      rows = Object.assign([], campaignList)
      rowCount = campaignList.length;
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
  
    return (
      <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
        <div className="sm:flex sm:justify-between sm:items-center mb-4">
          <div className="mb-4 sm:mb-0">
            <h1 className="text-2xl md:text-3xl text-gray-800 font-bold">Campaign List</h1>
            <div className={`${selectedItems.length < 1 && 'hidden'}`}>
              <div className="hidden xl:block text-sm italic mr-2 whitespace-nowrap"><span>{selectedItems.length}</span> selected</div>
            </div>
          </div>
          {/* <button
            onClick={() => viewDetails()}
            className="text-white bg-blue-700 btn"
          >
            Details
          </button> */}
        </div>
  
        {/* Table */}
        <CampaignListTable total={rowCount} data={rows} selectedItems={handleSelectedItems} />
  
        {/* Pagination */}
        <div className="mt-8">
          {<Pagination total={rowCount} currentPage={currentPage} nextPage={nextPage} prevPage={prevPage} />}
        </div>
      </div>
  
    )
  }
  
  export default CampaignList