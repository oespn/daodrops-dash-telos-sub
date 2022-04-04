
import { styled } from '@stitches/react'

import Layout from '../../common/Layout/Layout'

import {MdClose} from 'react-icons/md'
import {useRouter} from 'next/router'
import MetaHead from '../../common/Layout/MetaHead'
import Offer from './Offer'
import { useEffect, useState } from 'react'
import { supabase } from '../../../utils/supabaseClient'

const CloseButton = styled("button",
{
  position: 'fixed',
  right:5,
  height: '30px',
  width: '30px',
  top:5,
});

export default function OfferModal() {
  const [invite, setInvite] = useState(null)
  const router = useRouter()
  const getInviteInformation = async () => {
    const {invite_id} = router.query
    const user_id = localStorage.getItem('user')
    if (invite_id) {
      const { data, error } = await supabase
        .from('offers_invitelist')
        .select(`*, offer!inner(*)`)
        .eq('id', `${invite_id}`)
        .single()
      if (data) {
        setInvite(data)
      }
    }
  }

  useEffect(() => {
    getInviteInformation()
  }, [router.query])

  return (
    <Layout>
      <MetaHead title="Offer" />
      <div className="mb-10 m-5">
        <CloseButton 
          type="button"
          onClick={() => {
              window.history.back(); 
            }}>
          <p className="text-right text-black text-2xl">
            <MdClose/>
          </p>
        </CloseButton>
      </div>
      { invite && <Offer invite={invite} />}
      {/* <Offer option = {value.pid} /> */}
    </Layout>
  )
}