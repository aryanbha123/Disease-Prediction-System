import React from 'react'
import darkModeColors from '../layout/COLORS'

export default function ChatBox () {
  return (
     <div className='flex items-center z-20  bottom-16 fixed w-[calc(100vw)] gap-3 justify-center outline-0 border-0' >
      <input
        type='text'
        style={{
          background: darkModeColors.border,
          color: darkModeColors.primaryText
        }}
        className='p-4 text-sm w-[500px] rounded-2xl '
        placeholder='Enter your message here'
      />
      <span className='' >
        <svg
          width='24'
          height='24'
          fill='none'
          viewBox='0 0 24 24'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='m12.815 12.197-7.532 1.256a.5.5 0 0 0-.386.318L2.3 20.728c-.248.64.421 1.25 1.035.943l18-9a.75.75 0 0 0 0-1.342l-18-9c-.614-.307-1.283.304-1.035.943l2.598 6.957a.5.5 0 0 0 .386.319l7.532 1.255a.2.2 0 0 1 0 .394Z'
            fill='#ffffff'
          />
        </svg>
      </span>
    </div>
  )
}
