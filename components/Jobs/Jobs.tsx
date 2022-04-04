import React, { useState, useEffect } from "react";
import Link from "next/link";
import { BiPlusCircle } from "react-icons/bi";
import { FaComment } from "react-icons/fa";
import { offerData } from "../../utils/offerData";
import OfferCard from "../Offers/Offer/OfferCard";
import { supabase } from '../../utils/supabaseClient'

const Jobs = () => {
  const [offers, setOffers] = useState([])

  const listOffer = async () => {
    const user_id = localStorage.getItem('user')
    const { data, error } = await supabase
      .from('offers_invitelist')
      .select(`*, offer!inner(*)`)
      .eq('invited_user', `${user_id}`)
      .eq('status', `accepted`)
      .eq('offer.status', `active`)

    setOffers(data)
  }

  useEffect(() => {
    listOffer()
  }, [])

  return (
    <section>
      <div className="p-3">
        <div className="mt-3">
          <h1 className="font-medium text-xl">Promote yourself</h1>
        </div>


        <label className="flex flex-col mb-5 mt-10">
          <div className="tipBlue p-3 rounded-sm text-darky">
            <h3 className="font-bold mb-2">
              ✨ What is your #1 skill?
            </h3>
            <p>
              Create a job for it
              <br />
              Get working for DAOs today{' '}
            </p>
            <div className="">
              <FaComment className="comment-offset" />
            </div>
          </div>

        </label>

        <div className="flex justify-between mt-4 items-center gap-1">
          <Link href="/create-gig">
            <a className="bg-primary rounded-sm text-white px-3 py-1 flex gap-1 items-center">
              Add your gig
              <span className="text-xl">
                <BiPlusCircle />
              </span>
            </a>
          </Link>
        </div>

        <label>
          <h3 className="font-medium mt-6">Example</h3>
        </label>
        <div>
          {offers && offers.length > 0 && <OfferCard invite={offers[0]} />}
        </div>
        <label>
          <h3 className="font-medium mt-10">Work P2P with anyone</h3>
        </label>
        <label>
          <p className="mt-5">
            Get peace of mind. Funds will be held in escrow until the work is complete.
          </p>
        </label>
        <Link href="/create-quote" passHref >
          <div className="mt-3 flex justify-left">
            <a className="pl-4 outline outline-2 rounded-2 outline-blue-500 py-1 text-primary  w-1/2 flex gap-1 items-center">
              Create a Quote
              <span className="text-xl">
                <BiPlusCircle />
              </span>
            </a>
          </div>
        </Link>


      </div>
    </section>
  )

}

export default Jobs;

