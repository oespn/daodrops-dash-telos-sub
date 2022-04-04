import React from 'react'
import { useSpring, animated } from 'react-spring'
import { useState, useEffect } from 'react'
import { MdClose } from 'react-icons/md'

export type SpringTypes = {
  title?: string,
  body?: string,
  comp?: any,
  show?: boolean,
  setShow?: Function
}

const panelWidth = -800;

const RightPanel = ({ title = 'Title', body = 'Body', comp, show, setShow }: SpringTypes) => {
  const [styles, setStyles] = useSpring(() => ({
    from: { right: panelWidth + 'px', display: 'none' }
  }))

  const [stylesBackdrop, setStylesBackdrop] = useSpring(() => ({
    from: { display: 'none' }
  }))

  const showModal = () => {
    setStyles({
      right: '0px',
      display: 'block',
    } as any)
    setStylesBackdrop({
      display: 'block',
    } as any)
  };

  const hideModal = () => {
    setStyles({
      display: 'none',
      right: panelWidth + 'px',
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
        <div className="z-overlay" style={{
          backgroundColor: 'rgba(0, 0, 0, 0.44)',
          position: 'fixed',
          width: 'auto !important',
          left: 0, top: 0,
          inset: '0px',

        }} onClick={() => hideModal()} ></div>
      </animated.div>
      <animated.div className="z-overlay" style={{
        width: '50%',
        backgroundColor: '#fff',
        borderRadius: '16px 0 16px 0',
        position: 'absolute',
        right: 0,
        top: '5rem',
        ...styles,
      }}>
        <div className="flex justify-end items-center p-2 space-x-2 rounded-l border-1 border-gray-200 dark:border-gray-600 wd-1/2">
          <button type="button" className="mt-2" onClick={() => hideModal()}>
            <p className="text-right text-black text-3xl">
              <MdClose />
            </p>
          </button>
        </div>
        <div className="p-4">
          <div className="px-4 py-0">
            <div className="font-bold text-xl mb-2">{title}</div>
            <p className="text-gray-700 text-base">
              {body}
            </p>
            {comp}
          </div>
          {/* Modal Side panel */}
        </div>
      </animated.div>
    </div>
  );
}

export default RightPanel;