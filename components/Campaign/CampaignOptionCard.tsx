import Link from "next/link"

const CampaignOptionCard = ({ option: optionData, isSelected, handleClick }) => {
  return (
    <div className="mt-2 mb-1" onClick={handleClick}>
      {/* <Link href="/offer-accept" passHref> */}
      <div className="drop-shadow-md w-100 rounded bg-gradient-to-r from-sky-200 via-purple-200 to-pink-200 h-100">
        <div className="flex">
          <div className="p-3 text-grey-900 ">
            <div>
              <h2 className="font-medium text-lg">{optionData.title}</h2>
            </div>
            <div>
              <p className="text-sm mt-2">
                {optionData.description}
              </p>
            </div>

          </div>
          <div className="flex justify-end m-3 w-80">
            <img src={optionData.image} className="card-img" />
          </div>
        </div>
        <div className={`bg-gray-50 m-3 mb-1 rounded ${!isSelected && 'hidden'}`}>
          <div className="m-2 p-3">
            {optionData.form}
          </div>
        </div>
      </div>
      {/* </Link> */}
    </div>
  )
}

export default CampaignOptionCard
