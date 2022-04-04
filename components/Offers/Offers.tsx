import React, { useState, useEffect } from "react";
import Link from "next/link";
import OfferCard from "./Offer/OfferCard";
import { offerData } from '../../utils/offerData'
import { supabase } from '../../utils/supabaseClient'

const Offers = () => {
  const [newInvites, setNewInvites] = useState([])
  const [acceptedInvites, setAcceptedInvites] = useState([])

  const listOffer = async () => {
    const user_id = localStorage.getItem('user')
    const { data, error } = await supabase
      .from('offers_invitelist')
      .select(`*, offer!inner(*)`)
      .eq('invited_user', `${user_id}`)
      .eq('offer.status', `active`)

    const new_offers = data.filter(item => item.status == 'pending')
    const accepted_offers = data.filter(item => item.status == 'accepted')
    
    setNewInvites(new_offers)
    setAcceptedInvites(accepted_offers)
    console.log(new_offers)
  }

  useEffect(() => {
    listOffer()
  }, [])

  return(
    <section>
      <div className="p-3">
        <div className="mt-3">
          <h1 className="font-medium text-xl">Offers</h1>
        </div>
        <label>
        <p className="mt-5">
          DAO &amp; Crypto projects will send you offers based on your <Link href="/profile" passHref ><span className="text-primary">interests</span></Link>.
        </p>
        </label>
        <label>
          <h3 className="font-medium mt-6">New</h3>
        </label>
        {newInvites.map((invite, index) => {
          return (
            <OfferCard invite={invite} key={index}/>
          );
        })}
        <label>
          <h3 className="font-medium mt-6">Accepted</h3>
        </label>
        {acceptedInvites.map((invite, index) => {
          return (
            <OfferCard invite={invite} key={index}/>
          );
        })}
      </div>
    </section>
  )

}

export default Offers; 

