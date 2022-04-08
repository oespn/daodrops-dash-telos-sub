import { HiOutlineSelector, HiOutlineXCircle } from 'react-icons/hi'
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react';
import { downloadContract } from '../../api';
import useSWR from 'swr';


const amadao_ops_email = process.env.AMADAO_OPS_EMAIL;

const AirdropCampaign = ({ option }) => {
  const [message, setMessage] = useState(null);
  const [listId, setListId] = useState(0)

  const [downloadable, setDownloadable] = useState({
    mime: 'text/plain',
    filename: 'myexportedfile.txt',
    contents: '',
  });

  console.log(option, "Data");

  const [airDropContract, setAirDropContract] = useState(option);

  const {
    register,
    trigger,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      listId: 0,
      "title": '',
      "type": '',
      "currency": "",
      "amount": 0.00
    },
  });



  const onSubmit = () => {
    //const response = downloadContract(0);

    // const { data, error } = useSWR(`/api/list/contract?listId=${listId}`, fetch)

    setAirDropContract(option);


    const datestamp = new Date().toISOString();
    //const filename = req.query.name+"_"+datestamp+".txt";

    // res.setHeader('Content-Type', 'application/text');
    // res.setHeader('Content-Disposition', `attachment; filename=${filename}`);

    //   let tidy = airDropContract.replace("\r\n", String.fromCharCode(13));

    // res.status(200).send( { tidy } );

    setDownloadable(
      {
        mime: 'text/plain',
        filename: `${datestamp}.sol`,
        contents: airDropContract,
      }
    );

    setMessage({
      message: `Successfully created:`,
      type: 'success'
    });

  }

  const onSubmitAsync = async (data) => {

    let html = `<div>
        <p><b>Title</b>: ${data.title}</p>
        <p><b>Type</b>: ${data.type}</p>
        <p><b>How paid</b>: ${data.how_paid}</p>
        <p><b>Currency</b>: ${data.currency}</p>
        <p><b>Amount</b>: ${data.amount}</p>
        `;
    html += `/div>`;

    //api/list/contract?type=erc20&listId=0

    const response = downloadContract(0);

    // const response = await fetch('/api/launch-token', {
    //   method: 'POST',
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({
    //     to: amadao_ops_email,
    //     from: 'daodrops-demo0@gmail.com',
    //     title: 'Airdrop created',
    //     text: '',
    //     html: html
    //   })
    // });
    if (response) {
      setMessage({
        message: `Successfully created`,
        type: 'success'
      });
      console.log(response.data);
    } else {
      setMessage({
        message: `Error in creation`,
        type: 'error'
      });
    }
  }

  const downloadFile = async () => {

    fetch('/api/list/contract?listId=0')
      .then(response => response.blob())
      .then(blob => {
        let url = window.URL.createObjectURL(blob);
        let a = document.createElement('a');
        a.href = url;
        a.download = downloadable.filename;
        document.body.appendChild(a); // we need to append the element to the dom -> otherwise it will not work in firefox
        a.click();    
        a.remove();  //afterwards we remove the element again       
      });
  }

  return (
    <section className="px-3 mt-3 text-darky">
      <div>
        <div>
          <h3 className="text-xl font-medium mb-5 hidden">Offer</h3>

          <label className="flex flex-col mb-5">
            <span className="font-medium mb-2">Title</span>
            <input
              {...register('title', { required: true })}
              type="text"
              className="shadow-sm shadow-gray-300 border-gray-100 px-4 py-2 rounded-sm"
            />
          </label>

          <label className="flex flex-col mb-5 mt-5">
            <span className="font-medium mb-2">Smart Contract Type</span>
            <div className="relative w-full">
              <select
                {...register('type', { required: true })}
                className="shadow-sm shadow-gray-300 border-gray-100 px-4 py-2 rounded-sm bg-white w-full"
              >
                <option value="ERC20">ERC-20 Token</option>
                <option value="ERC721">ERC-721 NFT</option>
                <option value="ERC1151">ERC-1155 Multi </option>
              </select>
              <HiOutlineSelector className="absolute right-2 bottom-2 text-2xl hidden" />
            </div>
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
                placeholder="1"
                {...register('amount', { required: true })}
                type="text"
              />
            </div>
          </label>

          <div className="mt-3 flex justify-end">
            <button type="button" onClick={() => onSubmit()} className="px-3 rounded-sm py-1 bg-primary text-white font-medium">
              Generate contract
            </button>
          </div>
          {
            message && <div className={(message.type === 'success' ? 'bg-green-200' : 'bg-red-300') + ' p-3 mt-3 rounded-md'}>{message.message}</div>
          }
          {!airDropContract ? <p></p> : <button className="px-3 rounded-sm py-1 bg-primary text-white font-medium" onClick={() => downloadFile()} formTarget="_blank" formAction="download" color="transparent"> Download {downloadable.filename}</button>}
          <pre>
            {airDropContract}
          </pre>
        </div>
      </div>
    </section>
  )
}

export default AirdropCampaign;
