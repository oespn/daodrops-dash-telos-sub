import { HiOutlineMenuAlt1 } from 'react-icons/hi'
import { IoChatbubblesSharp } from 'react-icons/io5'
import { FaSearch } from 'react-icons/fa';

import React, { useState, useEffect } from 'react';
import DashboardDAO from '../../Dashboard/Desktop/DashboardDAO'
import TargetList from '../../Dashboard/Desktop/TargetList/TargetList'
import CampaignList from '../../Dashboard/Desktop/Campaign/CampaignList'


import { supabase } from '../../../utils/supabaseClient'
import Account from '../../../components/Account'


const LayoutDAO = (props,
  { children }: { children: React.ReactNode }
) => {
  const [inputText, setInputText] = useState("");
  const [view, setView] = useState("accounts");
  const [selectedItems, setSelectedItems] = useState([]);

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


  const inputHandler = (e) => {
    //convert input text to lower case
    var lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };

  const inputSearch = (e) => {
    setInputText(inputText);
  };

  const dropBar = props.dropBar;
  const dashboard = props.dashboard;

  return (
    <main className="bg-gray-100 min-h-screen md:border md:border-gray-200 md:shadow-lg w-full">
      <header className="border-b-2 border-gray-300 bg-white text-darky sticky top-0 z-50">
        <div className="flex">
          <div className="flex ">
            <img
              src="/images/a.svg"
              alt="amadao"
              className="mt-1"
              width={40}
              height={40}
            />
            <h1 className="text-2xl ml-2 mt-2 md:text-2xl text-gray-800 font-bold">amaDAO</h1>
          </div>
          <div className="flex justify-between px-5 py-2 ">
            <button>
              <HiOutlineMenuAlt1 className="text-xl" />
             </button>
          </div>
          <div className="flex justify-end w-full px-5 py-2 pr-5">
            <div className="flex justify-end w-80">
              {dropBar}
            </div>
          </div>
        </div>
      </header>
      <div className="w-60 h-full shadow-md bg-white px-1 pt-4 absolute ">
        <div className="h-5/6">
          <ul className="relative">
            <li className="relative">
              <a className={`flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out ${ view == "accounts" ? 'bg-primary text-white' : ''}`} href="#" data-mdb-ripple="true" data-mdb-ripple-color="dark" onClick={() => setView('accounts')}>Accounts</a>
            </li>
            <li className="relative">
              <a className={`flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out ${ view == "targetlists" ? 'bg-primary text-white' : ''}`} href="#" data-mdb-ripple="true" data-mdb-ripple-color="dark" onClick={() => setView('targetlists')}>Target Lists</a>
            </li>
            <li className="relative">
              <a className={`flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out ${ view == "campaigns" ? 'bg-primary text-white' : ''} `} href="#" data-mdb-ripple="true" data-mdb-ripple-color="dark" onClick={() => setView('campaigns')}>Campaigns</a>
            </li>
          </ul>
        </div>
        <div className="text-sm place-content-end h-20 mt-20">
          {session ? <Account key={session.user.id} session={session} /> : <p>no session</p>}
        </div>
      </div>
      <div className="ml-15">
        { view == "accounts" && <DashboardDAO selectItems={setSelectedItems} selectedItems={selectedItems} /> }
        { view == "targetlists" && <TargetList /> }
        { view == "campaigns" && <CampaignList /> }
      </div>
      {children}
    </main>
  )
}

export default LayoutDAO
