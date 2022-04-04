import { useState, useEffect } from 'react'
import { supabase } from '../utils/supabaseClient'



export default function Account({ session }) {
  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState(null)


  useEffect(() => {
    getProfile();
  }, [session])

  async function getProfile() {
    try {
      setLoading(true)
      const user = supabase.auth.user()

      let { data, error, status } = await supabase
        .from('profile')
        .select(`username, bio, avatar_url`)
        .eq('id', user.id)
        .single()

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setUsername(data.username)
      }
    } catch (error) {
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }


  return (
    <div className="form-widget">
      {/* <div>
        <label htmlFor="username">Hi </label>
        <input
          id="username"
          type="text"
          value={username || ''}
        />
      </div> */}

      <div>
        <button className="button block" onClick={() => supabase.auth.signOut()}>
          {session.user.email} Sign Out
        </button>
      </div>
    </div>
  )
}
