import { useState } from 'react'
import { useForm } from "react-hook-form"
import YesNo from './QAPanel/YesNo'


const LearnQnA = function ({qnaData}) 
{


  const { register, handleSubmit, watch, formState: { errors } } = useForm()
  const onSubmit = data => console.log(data)
  
  const [allAnswered, setAllAnswered] = useState(true);

  const handleClickQuestion = function (qa) {
    //qa.answered=true;
    //console.log(qa, "clicked"); 
    setAllAnswered(true);
    // let allChecked = true;
    // for (let i = 0; i < qnaData.length; i++) {
    //   allChecked = !qnaData[i].answered; 
    //   if (!allChecked) continue;
    // }
    // console.log(allChecked, "allChecked");
    // setAllAnswered(allChecked);
  }

  return (

    <div className='p-5'>
      <h1 className="text-3xl font-medium">Learn to earn</h1>
      <h2 className="text-xl font-medium mt-5">Quick Quiz</h2>

      <form onSubmit={handleSubmit(onSubmit)}>

        {qnaData.map((qa, index) => {
          return (
            <div key={index} className="mt-10"> 
              <p className="mb-3">Question: {index+1}</p>
              <YesNo qa={qa} key={index} handleClick={() => handleClickQuestion(qa)} />
              {/* <p>ans: {qa.answered ? "true" : "false"} </p> */}
              <hr/>
            </div>
          );
        })}

       

        {/* <h3 className='mt-7 mb-7 font-medium '>What type of Smart Contract can run on Telos</h3>
        <div className="option-item mb-4">
          <input
            type="checkbox"
            id={`custom-checkbox-protocol`}
            {...register('protocol')}
          />
          <label htmlFor={`custom-checkbox-protocol`} className="ml-3">{`It's own protocol call Telos`}</label>
        </div>
        <div className="option-item mb-4">
          <input
            type="checkbox"
            id={`custom-checkbox-ethereum`}
            {...register('ethereum')}
          />
          <label htmlFor={`custom-checkbox-ethereum`} className="ml-3">Ethereum (EVM)</label>
        </div> */}

        <div className="w-full text-center mt-7">
          <button type="submit" 
            disabled={!allAnswered} 
            className="px-3 rounded-sm py-1 bg-primary text-white font-medium w-80">
            <div className="flex justify-center px-5 py-1 ">
              <span>&nbsp;Complete</span>
            </div>
          </button>
        </div>
      </form>
    </div>

  )
}

export default LearnQnA;