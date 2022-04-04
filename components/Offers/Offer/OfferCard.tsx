import Link from "next/link"
import IconStretch from "../../ui/IconStretch"

const OfferCard = ({ invite }) => {
  return (
    <div className="mt-2 mb-1">
      <Link href={`/offer-accept?invite_id=${invite.id}`} passHref>
        <div className="drop-shadow-md w-100 rounded bg-gradient-to-r from-sky-200 via-purple-200 to-pink-200 h-100">
          <div className="text-white bg-cover bg-[length:200px_100px] ">
            {/* <IconStretch props={invite.offer} /> */}
          </div>
          <div className="p-3 text-grey-900">
            <h3 className="font-medium">{invite.offer.title}</h3>
            <p className="text-sm mt-2">
              {invite.offer.description}
            </p>
            <div className="flex justify-evenly">
              <span className="text-sm mt-3 text-left font-medium w-1/2">
                {invite.offer.org || '@workDao'}
              </span>
              <span className="text-sm mt-3 text-right w-1/2">
                {invite.offer.token_name}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default OfferCard
