import { createContext, useEffect, useState } from 'react'
import Select from 'react-select'

import { supabase } from '../../utils/supabaseClient'

const TargetListBuilder = (props) => {
  const {
    selectedItems,
    changeSection
  } = props

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



  const computedTargetLists = targetlists.map(item => ({
    ...item,
    value: item.id,
    label: item.name
  }));

  console.log(computedTargetLists)

  const onSelectTargetList = (item) => {
    setSelectedList(item)
  }

  const createTargetList = async (e) => {
    e.stopPropagation();
    if (selectedList.value) {
      console.log(selectedList)
      console.log(selectedItems)
      const newtargets = [
        ...selectedList.targets.lists,
        ...selectedItems
      ]
      const user_id = localStorage.getItem('user')
      const { data, error } = await supabase
        .from('targetlist')
        .update({
          created_by: user_id,
          name: selectedList && selectedList.name,
          description: selectedList.description,
          targets: {
            lists: newtargets
          }
        })
        .eq('id', selectedList.id)

        console.log(data, error)
    } else {
      changeSection(5)
    }
  }


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

  return (
    <section className="px-3 mt-3 text-darky">
      <h3 className="text-xl font-medium mb-5">To existing list:</h3>
        
        <div className="flex justify-between mb-5">
          <Select
            instanceId="modeSelect"
            options={computedTargetLists}
            className="w-full"
            classNamePrefix="select"
            placeholder="Select Target List"
            formatOptionLabel={i => (
              <div className="flex flex-left">{i.label}</div>
            )}
            onChange={onSelectTargetList}
            value={selectedList}
          />
          <button type="button" onClick={createTargetList} className="whitespace-nowrap ml-3 px-3 rounded-sm py-1 bg-primary text-white font-medium">
            { selectedList && selectedList.value ? 'Add to target list' : 'New target list' }
             {/* TODO: Grey out button.  New target list is a separate panel. */}
          </button>
        </div>


    </section>
  )
}

export default TargetListBuilder;