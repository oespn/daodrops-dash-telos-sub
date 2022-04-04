import Image from 'next/image'
import React, { useState, useEffect } from 'react';

import { supabase } from '../../utils/supabaseClient'
import Auth from '../../components/Auth'
import Account from '../../components/Account'
import { useRouter } from 'next/router'

const LoggedIn = function () {

  const router = useRouter()


  const [session, setSession] = useState(null)

  useEffect(() => {
    setSession(supabase.auth.session())

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      if (session && session.user && session.user.id) {
        localStorage.setItem('user', session.user.id)
      }
    })
    
  }, [])

  const login = async () => {
    //** sessionState.wallet.requestSignIn(sessionState.abi.contractAddr, "Amadao");
    router.push('/main');
  }
  

  const daoDash = async () => {
    router.push('/dao');
  }

  return (

  <div className="flex flex-col items-center mt-5 gap-4">
    <button
      // onClick={() => router.push('/dashboard')}
      onClick={() => login()}
      className="flex bg-primary hover:bg-primary/90  px-5 py-2 text-white gap-1 items-center rounded-md font-medium"
    >
      Open the App
    </button>
    {/* <p>{address}</p> */}
    <button className="" onClick={() => daoDash()}>Take me to the DAO Dashboard</button>

    {!session ? <Auth /> : <Account key={session.user.id} session={session} />}

  </div>

  )
}

export default LoggedIn;