import { HiOutlineSelector, HiOutlineXCircle } from 'react-icons/hi'
import { useForm } from 'react-hook-form'

import { createContext, useEffect, useState } from 'react'
import { supabase } from '../../utils/supabaseClient'

const SendOfferCampaign = (props) => {
  const {
    selectedItems,
    changeSection
  } = props
  const [message, setMessage] = useState(null);
  const [images, setImages] = useState([]);
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
    register,
    trigger,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      "title": '',
      "type": '',
      "to_do": '',
      "how_paid": '',
      "currency": '',
      "amount": 0.00
    },
  });

  const onSubmit = async (data) => {
    const user_id = localStorage.getItem('user')
    const payload = {
      detail: data.title,
      type: data.type,
      what_to_do: data.to_do,
      pay_method: data.how_paid,
      token: data.currency,
      amount: data.amount,
      invited: {
        list: selectedItems
      },
      created_by: user_id,
      status: 'active'
    }

    const res = await supabase
      .from('campaign')
      .insert([
        {
          ...payload
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
      reset();
      setTimeout(() => {
        changeSection(undefined)
      }, 1000)
    }
  }

  return (
    <section className="px-3 mt-3 text-darky">
      <div>
        <div>

          <h3 className="text-xl font-medium mb-5 hidden">Offer</h3>

          <label className="flex flex-col mb-5">
            <span className="font-medium mb-2">Offer details</span>
            <input
              {...register('title', { required: true })}
              type="text"
              className="shadow-sm shadow-gray-300 border-gray-100 px-4 py-2 rounded-sm"
            />
          </label>

          <label className="flex flex-col mb-5 mt-5">
            <span className="font-medium mb-2">Type</span>
            <div className="relative w-full">
              <select
                {...register('type', { required: true })}
                className="shadow-sm shadow-gray-300 border-gray-100 px-4 py-2 rounded-sm bg-white w-full"
              >
                <option value="whitelist">Whitelist</option>
                <option value="promote">Promote</option>
                <option value="general">General</option>
              </select>
              <HiOutlineSelector className="absolute right-2 bottom-2 text-2xl hidden" />
            </div>
          </label>

          <label className="flex flex-col mb-5">
            <span className="font-medium mb-2">What to do</span>
            <textarea
              {...register('to_do', { required: true })}
              rows={3}
              className="shadow-sm shadow-gray-300 border-gray-100 px-4 py-2 rounded-sm"
            ></textarea>
          </label>

          <label className="flex flex-col mb-5">
            <span className="font-medium mb-2">How you&apos;ll be rewarded</span>
            <textarea
              {...register('how_paid', { required: true })}
              rows={3}
              className="shadow-sm shadow-gray-300 border-gray-100 px-4 py-2 rounded-sm"
            ></textarea>
          </label>

          <label className="flex items-center justify-between mb-5 gap-2 mt-3">
            <span className="font-medium mb-2 whitespace-pre">$Token</span>
            <div className="relative w-5/12">
              <input
                className="shadow-sm shadow-gray-300 border-gray-100 px-4 py-2 rounded-sm bg-white w-full text-right"
                placeholder="$TOKEN"
                {...register('currency', { required: true })}
                type="text"
              />
            </div>
          </label>

          <label className="flex items-center justify-between mb-5 gap-2 mt-3">
            <span className="font-medium mb-2 whitespace-pre">Amount</span>
            <div className="relative w-5/12">
              <input
                className="shadow-sm shadow-gray-300 border-gray-100 px-4 py-2 rounded-sm bg-white w-full text-right"
                placeholder="2,500"
                {...register('amount', { required: true })}
                type="text"
              />
            </div>
          </label>

          <div className="mt-3 flex justify-end">
            <button type="button" onClick={handleSubmit(onSubmit)} className="px-3 rounded-sm py-1 bg-primary text-white font-medium">
              Submit for review
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

export default SendOfferCampaign;
