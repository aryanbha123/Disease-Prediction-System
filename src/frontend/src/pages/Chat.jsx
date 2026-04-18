import React, { Suspense, useEffect, useState } from 'react'
import Layout from '../layout/Layout'
import ChatBox from '../components/ChatBox';
import ChatArea from '../components/ChatArea';
import { Close, MenuOpen } from '@mui/icons-material';
import colors from '../layout/COLORS'
import { Link } from 'react-router-dom';
const Chat = ({ currUser}) => {
  const [menu,setMenu] = useState(false);
  const LifeStyleModal = React.lazy(() => import('../pages/LifeStyle'));
  const [lifeStyle ,setLifestyle]= useState();
  useEffect(()=>{

    console.log(currUser)
  },[])
  

  const [showLoader,setShowLoader] = useState(true)
  const [Messages, setMessages] = useState([]);

  useEffect(()=> {
    setTimeout(()=>{
      setShowLoader(false);
    },1000)
  } ,[]);

  if(showLoader){

    return <div className='flex h-screen justify-center items-center  w-screen bg-black'> <div className='loader'></div></div>
  }
  return (
    <section style={{
      background:colors.background
    }} className='flex flex-col h-full w-[100vw]'>
      <header className='fixed flex justify-between top-0 left-0 w-full z-50 p-5'>

        <MenuOpen className={`z-50  transition-all duration-200`} sx={{color:"#fff" ,cursor:"pointer"}} onClick={()=>setMenu(!menu)}/>
        <select
            // value={model}
            style={{
              background: colors.accent,
              color: colors.primaryText
            }}
           
            className='p-3 py-2 rounded-md border-gray-500 border-[.4px] text-xs'
            name=''
            id=''
          >
            <option value='1'>Random Forest</option>
            <option value='2'>SVM</option>
            <option value='3'>Naive bayes</option>
          </select>
      </header>
      <ChatArea menu={menu} currUser={currUser} />
      {/* <ChatBox/> */}

      {
         <>
        
          <div style={{
            
          }} className={`${menu ? 'flex flex-col' : 'hidden'} text-gray-50 justify-center items-center h-screen w-screen backdrop-blur-sm   transition-all duration-200 ease-in-out fixed z-50`}>
            <div className='w-[200px] flex justify-end mb-4' > 
              <Close sx={{fontSize:18,cursor:"pointer"}} onClick={()=>{setMenu(false)}} />
            </div>
            <div className='flex flex-col items-center gap-3 text-md'>
              <Link className='bg-gray-50 text-gray-900 backdrop-blur-2xl px-5 py-2 rounded-2xl' to={"/"}>Home </Link>
              <Link className='bg-gray-50 text-gray-900 backdrop-blur-2xl px-5 py-2 rounded-2xl' onClick={() => {setLifestyle(true)}}>Lifestyle bot </Link>
            </div>
          </div>
        </>
      }
      {
        lifeStyle && 
        <Suspense fallback={<div className='flex justify-center items-center h-screen w-screen'><div className='loader' /></div>}  >
          <LifeStyleModal setMenu={setMenu} setLifestyle={setLifestyle}/>
          </Suspense>
      }
    </section>
    
  )
}

export default Chat;