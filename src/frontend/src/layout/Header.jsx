import React, { useEffect, useState } from 'react'
import darkModeColors from './COLORS'
import { Avatar, Link } from '@mui/material'
import AccountMenu from '../components/AccountMenu'
import colors from './COLORS'
import { useDispatch, useSelector } from 'react-redux'
import { setModel } from '../redux/global'
export default function Header () {
  const { model } = useSelector(state => state.global)
  // alert(model)
  const dispatch = useDispatch()

  // useEffect(() => {
  //   alert(model)
  // } , [model])

  return (
    <header className='fixed w-full flex justify-between py-1 px-4'>
      <div className='flex items-center'>
        <a href="/" className='text-sm text-gray-50' > Home </a>
        <div className='p-5  '>
          <select
            value={model}
            style={{
              background: colors.accent,
              color: colors.primaryText
            }}
            onChange={e => {
              dispatch(setModel(e.target.value))
            }}
            className='p-3 py-2 rounded-md border-gray-500 border-[.4px] text-xs'
            name=''
            id=''
          >
            <option value='0'>Grid search</option>
            <option value='1'>Random Forest</option>
            <option value='2'>SVM</option>
            <option value='3'>Naive bayes</option>
          </select>
        </div>
      </div>
    </header>
  )
}
