import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { supabase } from '../../../../utils/supabaseClient'

const NewTargetList = (props) => {
  const {
    selectedItems,
    selectSection,
    removeSelection,
    removeSelectionAfterSave = false
  } = props
  const [message, setMessage] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      "name": '',
      "description": '',
    }
  });

  const onSubmit = async (data) => {
    const user_id = localStorage.getItem('user')
    const res = await supabase
      .from('targetlist')
      .insert([
        {
          created_by: user_id,
          name: data.name,
          description: data.description,
          targets: {
            lists: selectedItems
          }
        }
      ])

    if (res.error) {
      setMessage({
        message: res.error,
        type: 'error'
      });
    } else {
      setMessage({
        message: `Successfully created`,
        type: 'success'
      });
    }
    reset();
    if (removeSelectionAfterSave) {
      removeSelection()
    }
    selectSection(2)
  }

  return (
    <section className="px-3 mt-3 text-darky">
      <div>
        <div>
          <h3 className="text-xl font-medium mb-5">New target list</h3>
          <p className="mb-5">Campaigns can use pre-created lists. <br />
            You can build lists from existing lists or reuse to retarget.</p>

          <label className="flex flex-col mb-5">
            <span className="font-medium mb-2">Name</span>
            <input
              {...register('name', { required: true })}
              type="text"
              className="shadow-sm shadow-gray-300 border-gray-100 px-4 py-2 rounded-sm"
            />
          </label>

          <label className="flex flex-col mb-5">
            <span className="font-medium mb-2">Description</span>
            <input
              {...register('description', { required: true })}
              type="text"
              className="shadow-sm shadow-gray-300 border-gray-100 px-4 py-2 rounded-sm"
            />
          </label>

          <div className="mt-3 flex justify-end">
            <button type="button" onClick={handleSubmit(onSubmit)} className="px-3 rounded-sm py-1 bg-primary text-white font-medium">
              Save
            </button>
          </div>
          {
            message && <div className={(message.type === 'success' ? 'bg-green-200' : 'bg-red-300') + ' p-3 mt-3 rounded-md'}>{message.message}</div>
          }
        </div>
      </div>
    </section>
  )
}

export default NewTargetList;
