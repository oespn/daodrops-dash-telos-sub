
import { useForm } from 'react-hook-form'
import Select from 'react-select'
import { createContext, useEffect, useState } from 'react'


import { supabase } from '../../utils/supabaseClient'
import { downloadRecipients } from '../../api'


const TargetedOption = (props) => {

  const [targetlists, setTargetlists] = useState([]);
  const [selectedList, setSelectedList] = useState({
    id: null,
    name: '',
    description: '',
    targets: {
      lists: []
    },
    value: null,
    label: null
  })


  const {
    selectedItems,
    selectSection
  } = props


  const getTargetList = async () => {
    const user_id = localStorage.getItem('user')
    const res = await supabase
      .from('targetlist')
      .select('*')
      .eq('created_by', user_id)

    setTargetlists(res.data)
  }

  useEffect(() => {
    getTargetList()
  }, [])

  const computedTargetLists = targetlists.map(item => ({
    ...item,
    value: item.id,
    label: item.name
  }));

  const onSelectTargetList = (item) => {
    setSelectedList(item)
  }

  const downloadList = async () => {
    const result = downloadRecipients(selectedList.id);
    console.log(result);
  }


  return (
    <section className="px-0 mt-3 mb-5 text-darky">

          Use the {selectedItems.length} addresses selected

          <div>
          </div>


{/*
          <div>
            <div className="form-check mb-3">
              <input className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
              <label className="form-check-label inline-block text-gray-800" htmlFor="flexRadioDefault1">
                Use the {selectedItems.length} addresses selected
              </label>
            </div>
            <div className="form-check">
              <input className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked />
              <label className="form-check-label inline-block text-gray-800" htmlFor="flexRadioDefault2">
                Target lists
              </label>
            </div>
          </div>
  */}
  {/*
          <div>
            <Select
              instanceId="modeSelect"
              options={computedTargetLists}
              className="w-full mt-3 mb-10"
              classNamePrefix="select"
              placeholder="Select Target List"
              formatOptionLabel={i => (
                <div className="flex flex-left">{i.label}</div>
              )}
              onChange={onSelectTargetList}
              value={selectedList}
            />
          </div>
              */}

    </section>
    )
  }
  
  export default TargetedOption;