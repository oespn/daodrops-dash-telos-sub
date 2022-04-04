import { HiOutlineMenuAlt1 } from 'react-icons/hi'
import { IoChatbubblesSharp } from 'react-icons/io5'
import { useState } from 'react'

const LayoutHeader = (props,
  { children }: { children: React.ReactNode }
) => {
  const [sidebar, setSidebar] = useState(false)
 
  //const isClient = 0;
  const dropBar = props.dropBar;
  const dashboard = props.dashboard;

  const toggleSidebar = () => {
    setSidebar(!sidebar)
  }

  return (
    <main className="relative bg-gray-50 min-h-screen md:min-h-90vh container md:border md:border-gray-200 md:shadow-lg md:max-w-sm md:max-h-150 overflow-y-auto mx-auto md:absolute md:top-1/2 md:left-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/2">
      <header className="border-b-2 border-gray-300 bg-white text-darky sticky top-0 z-50">
        <div className="flex justify-between px-5 py-2 ">
          <button onClick={toggleSidebar}>
            <HiOutlineMenuAlt1 className="text-xl" />
          </button>
          <button className="bg-gray-200 p-2 rounded-full">
            <IoChatbubblesSharp className=" text-xl text-primary/80" />
          </button>
          <div className="flex gap-3 items-center">
            {dropBar}
          </div>
        </div>
      </header>
      <div className='relative'>
        {dashboard}
      </div>
      {children}
      {
        sidebar && (<div className="fixed h-screen w-full rounded top-0 z-50">
          <div className="drawer-side h-screen relative">
            <div className="drawer-overlay h-screen w-full" onClick={toggleSidebar}></div>
            <ul className="menu p-4 overflow-y-auto w-80 bg-gray-100 text-base-content h-screen absolute top-0 left-0">
              <li><a>Sidebar Item 1</a></li>
              <li><a>Sidebar Item 2</a></li>
            </ul>
          </div>
        </div>)
      }
    </main>
  )
}

export default LayoutHeader
