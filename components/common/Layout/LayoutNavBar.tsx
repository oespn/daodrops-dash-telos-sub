import { HiOutlineMenuAlt1 } from 'react-icons/hi'
import { IoChatbubblesSharp } from 'react-icons/io5'

import { FaBeer, FaBug, FaAnchor, FaCoffee } from 'react-icons/fa';

import React, { useState } from 'react'
import Link from 'next/link'
import cx from "classnames"
import { useRouter } from "next/router"
import { navLinks } from "../../../utils/navLinkData";

import IconRenderer from "../../IconRenderer";
import { IconType } from 'react-icons';
//import { MouseEventHandler } from 'react';


// Next Link is complex, needs to forward 
//const AsButton = React.forwardRef(({ onClick, href }, ref) => {
//   return (
//     <a href={href} onClick={onClick} ref={ref}>
//       Click Me
//     </a>
//   )
// })


const LayoutNavBar = (props,
  { children }: { children: React.ReactNode }
) => {
  const router = useRouter();
  const dropBar = props.dropBar;
  const view = props.view;

  //const [selectedTabId, setSelectedTabId] = useState();

  //console.log('handleSelectedTabChange:'+props.handleSelectedTabChange);
  //const setSelectedTabId = props.handleSelectedTabChange;

  interface IProps_Link {
    index: Number;
    onClick: React.MouseEventHandler<HTMLButtonElement>;
  }


  // const onClickLink = (event: React.MouseEventHandler) => {
  //   // Tell App Main which tab to show
  //   console.log('sel idx:' + event);
  //   //setSelectedTabId(idx);
  //   //props.selectedTabId = idx;
  //   //props.handleSelectedTabChange(idx);
  // }

  return (
    <main className="bg-gray-50 min-h-screen container  md:max-h-150 md:min-h-90vh  md:border md:border-gray-200 md:shadow-lg md:max-w-sm  overflow-y-auto mx-auto md:absolute md:top-1/2 md:left-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/2">
      {/*  min-h-screen md:max-h-150 md:min-h-90vh */}
      <div className='relative min-h-screen h-full'>
        {view}
      </div>
      {children}
      <footer className="bg-white text-darky fixed w-full bottom-0 z-50">
        <div className="flex justify-around">
          {/*<Router>*/}
          {navLinks.map((link, index) => {
            //link.selected = (index == selectedTabId);
            return (
              <button className={cx((router.pathname == link.path ? "text-primary border-b-2 border-primary" : ""), "")} key={index}>
                <Link href={link.path} passHref >
                  {/*onClick = {() => onClickLink(index) }*/}
                  <div className="text-xl p-3 text-center">
                    <IconRenderer props={link} />
                    <span className="tracking-tight text-sm">{link.name}</span>
                  </div>
                </Link>
              </button>
              /*<span className="tracking-tight text-sm justify-center">{link.name}</span>*/
            );
          })}
          {/*</Router>*/}

        </div>

      </footer>

    </main>
  )
}

export default LayoutNavBar
