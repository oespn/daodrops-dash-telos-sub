import { HiOutlineSelector, HiOutlineXCircle } from 'react-icons/hi'
import { useForm } from 'react-hook-form'

import { createContext, useEffect, useState } from 'react'

import { supabase } from '../../utils/supabaseClient'
import UploadGallery from '../Jobs/Gig/UploadGallery'

const LearnToEarnCampaign = (option) => {

  const amadao_ops_email = process.env.AMADAO_OPS_EMAIL;

  const [message, setMessage] = useState(null);
  const [images, setImages] = useState([]);

  const {
    register,
    trigger,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      "title": '',
      "questions": '',
      "token": option.option,
      "amount": 0.00
    },
  });

  const onSubmit = async (data) => {
    if (images.length > 0) {
      let html = `<div>
        <p><b>Title</b>: ${data.title}</p>
        <p><b>Questions</b>: ${data.questions}</p>
        <p><b>Currency</b>: ${data.currency}</p>
        <p><b>Amount</b>: ${data.amount}</p>
        <p><b>Slides</b></p>
        <ul>`;
      for (let i = 0; i < images.length; i++) {
        html += `<li><a href="${images[i].publicURL}">${images[i].filename}</li>`
      }
      html += `</ul></div>`;
      const response = await fetch('/api/submit-learn', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          to: amadao_ops_email,
          from: 'daodrops-demo0@gmail.com',
          title: 'Learn to Earn requested',
          text: 'Learn to Earn requested',
          html: html
        })
      });
      if (response) {
        setMessage({
          message: `Successfully created`,
          type: 'success'
        });
      } else {
        setMessage({
          message: `Error in creation`,
          type: 'error'
        });
      }
    }
  }

  const setImageUrls = (payload) => {
    let tmp = [...images, ...payload]
    setImages(tmp)
  }

  const removeImage = async (index) => {
    const filename = images[index].filename;
    let tmp = Object.assign([], images)
    tmp.splice(index, 1)
    setImages(tmp)
    const { data, error } = await supabase.storage
      .from('gallery')
      .remove([filename])
  }

  return (
    <section className="px-3 mt-3 text-darky">
      <div>
        <div>
          <h3 className="text-xl font-medium mb-5 hidden">Learn to Earn</h3>

          <label className="flex flex-col mb-5">
            <span className="font-medium mb-2">Project Title</span>
            <input
              {...register('title', { required: true })}
              type="text"
              className="shadow-sm shadow-gray-300 border-gray-100 px-4 py-2 rounded-sm"
            />
          </label>

          <label className="flex flex-col mb-2">
            <span className="font-medium mb-2">5 Slides that explain your project</span>
            <p className="tracking-tight text-sm">Upload draft slides.</p>
          </label>

          <div className="image-preview-blocks flex">    
            {images.map((image, index) => {
              return <div className="relative image-preview-block w-1/6" key={index}>
                <img src={image.publicURL} />
                <HiOutlineXCircle className="absolute right-2 top-0 text-gray-700 text-2xl" onClick={(e) => removeImage(index)} />
              </div>
            })}
          </div>

          <UploadGallery setImages={setImageUrls} />

          <label className="flex flex-col mb-5">
            <span className="font-medium mb-2">Draft Questions</span>
            <textarea
              {...register('questions', { required: true })}
              rows={3}
              className="shadow-sm shadow-gray-300 border-gray-100 px-4 py-2 rounded-sm"
            ></textarea>
          </label>

          <label className="flex items-center justify-between mb-5 gap-2 mt-3">
            <span className="font-medium mb-2 whitespace-pre">Token</span>
            <div className="relative w-5/12">
              <input
                className="shadow-sm shadow-gray-300 border-gray-100 px-4 py-2 rounded-sm bg-white w-full text-right"
                placeholder="2,500"
                {...register('token', { required: true })}
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

export default LearnToEarnCampaign;
