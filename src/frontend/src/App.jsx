import React, { Suspense, useEffect, useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

// Lazy-loaded components
const Chat = React.lazy(() => import('./pages/Chat'))
const Home = React.lazy(() => import('./pages/Home'))
const Profiles = React.lazy(() => import('./shared/Profiles'))
const Lifestyle = React.lazy(() => import('./pages/LifeStyle'));
export default function App() {
  const [profiles, setProfiles] = useState([])
  const [currUser, setCurrUser] = useState(null)

  useEffect(() => {
    // Get and parse profiles correctly
    const storedProfiles = JSON.parse(localStorage.getItem('profiles') || '[]')
    setProfiles(storedProfiles)

    // Get current user directly
    const storedCurrUser = localStorage.getItem('current')
    setCurrUser(storedCurrUser)
  }, []);

  const currHandler = (id) => {
    const selectedUser = JSON.parse(localStorage.getItem('profiles'))[id];
    console.log("h")
    if (selectedUser) {
      localStorage.setItem('current',JSON.stringify(selectedUser))
      setCurrUser(selectedUser)
    }
  }
  
  const showProfile = () => {
    localStorage.removeItem('current');
    window.location.reload()
  }

  if (!currUser) {
    return <Suspense fallback={<div className='flex justify-center h-screen w-screen items-center bg-black'><div className="loader"></div></div>}><Profiles profiles={profiles} currHandler={currHandler} /></Suspense>
  }

  return (
    <BrowserRouter>
      <Suspense fallback={<div className=' h-screen w-screen flex bg-black justify-center items-center'><div className='loader'></div></div>}>
        <Routes>
          <Route path="/" element={<Home showProfile={showProfile} currUser={currUser} />} />
          <Route path="/chat" element={<Chat currUser={currUser} />} />
          {/* <Route path='/lifestyle' element={<Lifestyle/>}/> */}
          {/* Redirect to home if no match */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
