import React from 'react'
import { useSpring, animated } from 'react-spring'
import { useState, useEffect } from 'react'

export type SpringBottomTypes = {
  title?: string,
  body?: string,
  show?: boolean,
  setShow?: Function
}

const SpringBottom = ({ title = 'Title', body = 'Body', show, setShow }: SpringBottomTypes) => {
  const [styles, setStyles] = useSpring(() => ({
    from: { bottom: '-500px', display: 'none' }
  }))

  const [stylesBackdrop, setStylesBackdrop] = useSpring(() => ({
    from: { display: 'none' }
  }))

  const showModal = () => {
    setStyles({
      bottom: '0px',
      display: 'block',
    } as any)
    setStylesBackdrop({
      display: 'block'
    } as any)
  };

  const hideModal = () => {
    setStyles({
      display: 'none',
      bottom: '-500px',
    } as any)

    setStylesBackdrop({
      display: 'none',
    } as any)
    setShow()
  };

  useEffect(() => {
    if (show) {
      showModal();
    }
  }, [show])

  return (
    <div>
      <animated.div style={{
        ...stylesBackdrop,
      }}>
        <div style={{
          backgroundColor: 'rgba(0, 0, 0, 0.44)',
          position: 'fixed',
          inset: '0px'
        }} onClick={() => hideModal()} ></div>
      </animated.div>
      <animated.div style={{
        width: '100%',
        minHeight: '200px',
        backgroundColor: '#fff',
        borderRadius: '16px 16px 0 0',
        position: 'absolute',
        left: 0,
        ...styles,
      }}>

        <div className="p-5">
          <div className="px-4 py-4">
            <div className="font-bold text-xl mb-2">{title}</div>
            <p className="text-gray-700 text-base">
              {body}
            </p>
          </div>
          {/* Modal footer */}
          <div className="flex justify-end items-center p-2 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
            <button type="button" className="mt-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={() => hideModal()}>Close
            </button>
          </div>
        </div>
      </animated.div>
    </div>
  );
}

export default SpringBottom;