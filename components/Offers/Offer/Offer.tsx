import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'

import { useState } from 'react'
import OfferCard from './OfferCard'

const Offer = ({ invite }) => {
  const router = useRouter()
  const [message, setMessage] = useState('');
  const {
    register,
    trigger,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      updateType: '',
      updateMessage: '',
      updateAssetUrl: '',
    },
  });

  const onSubmit = async (data) => {
    router.push(`/learn-to-earn`)

    setMessage(`Logging Checkin ...`);
  }

  return (
    <section className="px-3 mt-3 text-darky">
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h3 className="text-xl font-medium mb-5">Offer</h3>

          <label className="flex flex-col mb-5">
            <p>{invite.offer.created_by || '@workDao'} has invited you to earn {invite.offer.description}.  Here&apos;s the offer:</p>
          </label>

          <div>
            <OfferCard invite={invite} />
          </div>

          <label className="flex flex-col mt-10 mb-5">
            <h3 className="font-medium mb-2">What you need to do</h3>
            <p>{invite.offer.what_to_do}</p>
          </label>

          <label className="flex flex-col mt-10 mb-5">
            <h3 className="font-medium mb-2">How you&apos;ll get paid</h3>
            <p>{invite.offer.pay_method}</p>
          </label>

          <div className="mt-3 flex justify-center">
            <button type="submit" className="px-3 rounded-sm py-1 bg-primary text-white font-medium w-1/2">
              I&apos;m in
            </button>
          </div>
          <div>{message}</div>
        </form>
      </div>
    </section>
  )
}

export default Offer;
