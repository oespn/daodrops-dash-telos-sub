import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router'

import { supabase } from '../../utils/supabaseClient'
import Auth from '../../components/Auth'
import Account from '../../components/Account'



const LoggedOut = function () {

  const router = useRouter()
  const [session, setSession] = useState(null)

  const onboard = async () => {
    router.push('/dao');
    //DEMO ACCOUNT -> OVERRIDE user to apply demo data 
    localStorage.setItem('user', "19b68d16-7363-4f56-bd24-fe711ea63577");
  }

  useEffect(() => {
    setSession(supabase.auth.session())

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      if (session && session.user && session.user.id) {
        localStorage.setItem('user', session.user.id)
      }
    })

  }, [])


  return (
  <div>
    <div className="flex justify-center mt-5">
      
      <button
        onClick={() => onboard()}
        className="flex bg-primary hover:bg-primary/90  px-5 py-2 text-white gap-1 items-center rounded-md font-medium"
      >
        Login to Demo Account
      </button>
    </div>
    <div className="flex justify-center mt-5">    
      {!session ? <Auth /> : <Account key={session.user.id} session={session} />}
    </div>
  </div>
  )


}


export default LoggedOut;