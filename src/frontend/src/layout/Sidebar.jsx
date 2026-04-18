import React from 'react'
import darkModeColors from './COLORS'

export default function Sidebar () {
  const Chats = [1, 2, 3, 4, 4, 5, 5, 6]
  return (
    <section className='relative w-[280px] h-screen'>
      <section
        style={{
          background: darkModeColors.background,
          color: darkModeColors.secondaryText
        }}
        className={`h-screen fixed left-0 top-0 w-[280px]`}
      >
        <div className='py-3 px-4'>
          <img className='h-[49px] rounded-md' src='/image.png' alt='' />
        </div>
        <hr
          className='h-[12px] text-lg'
          style={{ color: darkModeColors.border }}
        />
        <div className='flex  px-4 flex-col mt-10'>
          {Chats.map(i => (
            <div className={`flex text-sm rounded-2xl px-3 cursor-pointer py-2 w-full hover:bg-[#1E1E1E]`}>
              Chat {i}
            </div>
          ))}
        </div>
        <div className='fixed bottom-4 px-5' >
          &copy; 2025 copyright reserved
        </div>
      </section>
    </section>
  )
}
