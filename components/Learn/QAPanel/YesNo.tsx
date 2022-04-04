import { useState } from "react";


const YesNo = ({qa, handleClick}) => {

  //const [qa, setQA ] = useState(qaItem);

  //setQA(qaItem);

  return (
    <div>  
      {qa ? 
      <div>
        <h3 className='mt-3 mb-3 font-medium'>{qa.question}</h3>
        {qa.answer_options?.map((a, index) => {
          const incorrect = (qa.correct_option != -1 && (index != qa.correct_option));
          return (
            <div key={index} className="option-item mb-4">
              <input
                type="checkbox"
                id={`custom-checkbox-${index}`}
                disabled={incorrect}

                onClick={ ()=> qa.answered=true
                  // handleClick(qa)
                }
              />
              <label htmlFor={`custom-checkbox-${index}`} className="ml-3">{a}</label>
            </div>
          )
        } )} 
      </div> 
      :
      <p></p>
      }
    </div>
  )

}

export default YesNo;