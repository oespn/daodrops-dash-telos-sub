
import { supabase } from '../utils/supabaseClient'
import Auth from '../components/Auth'
import Account from '../components/Account'

import React, { useState, useEffect } from 'react';

import { useRouter } from 'next/router'
import MetaHead from '../components/common/Layout/MetaHead'


import LoggedIn from '../components/AuthState/LoggedIn';
import LoggedOut from '../components/AuthState/LoggedOut';
import TourCarousel from '../components/Onboarding/TourCarousel';

export default function Home() {

  const router = useRouter()
  const [session, setSession] = useState(null)
  //const { getProfile } = useSmartContract();

  const saveProfile = async (user_id) => {
    let onboarding = localStorage.getItem('onboarding')
    onboarding = onboarding ? JSON.parse(onboarding) : null
    if (onboarding) {
      const payload = {
        ...(onboarding as any)
      }
      
      const { data, error } = await supabase
        .from('profile')
        .update({ ...payload })
        .eq('id', user_id)

      if (!error) {
        localStorage.removeItem('onboarding')
        router.push('/profile');
      } else {
        console.log(error)
      }
    }
  }

  useEffect(() => {
    setSession(supabase.auth.session())

    supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session)
      if (session && session.user && session.user.id) {
        localStorage.setItem('user', session.user.id)
        saveProfile(session.user.id)
      }
    })

  }, [])


  const login = async () => {
    //** sessionState.wallet.requestSignIn(sessionState.abi.contractAddr, "Amadao");
    router.push('/profile');
  }

  const daoDash = async () => {
    router.push('/dao');
  }

  return (
    <main className="h-screen flex items-center justify-center">
      <MetaHead title="Amadao Login" />
      <section className="flex flex-col pt-30 text-center px-10 text-gray-700">
        <div className="md:max-w-sm">
          <div>
           <TourCarousel/>
          </div>
          <p>Build your web3 CV &amp; start working at a DAO</p>

          {session ? <LoggedIn/> : <LoggedOut/>}

        </div>
       
      </section>
    </main>
  )
}