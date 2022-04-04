import { useState } from 'react'
import { supabase } from '../utils/supabaseClient'

export default function Auth(  newType ) {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')

  const handleLogin = async (email) => {
    try {
      setLoading(true)
      const { error } = await supabase.auth.signIn({ email })
      if (error) throw error
      alert('Check your email for the login link!')
    } catch (error) {
      alert(error.error_description || error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="row flex flex-center">
      <div className="col-6 form-widget">
        
        {/*<p className="description">Sign in with GitHub</p>
        <div>
          <input type='button' onClick={(e) => {
              e.preventDefault()
              signInWithGithub()
            }} value ="GitHub"/>
           
        </div>
          */}

        <p className="description">Sign up via magic link</p>
        <div className="flex">
          <input
            className="inputField"
            type="email"
            placeholder={ newType ? "New account email" : "Existing account email" }  
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            onClick={(e) => {
              e.preventDefault()
              handleLogin(email)
            }}
            className="flex justify-left ml-3 p-1 bg-white border-1 border-blue-200 hover:border-blue-300 text-blue-500 hover:text-blue-600"
            disabled={loading}
          >
          <p className={`flex justify-left ${email.length<3 && 'hidden'}`}>{loading ? 'Loading' : 'Send'}</p>
         
          </button>
        </div>
      </div>
    </div>
  )
}