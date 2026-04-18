import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChatBubbleOutline, Logout } from '@mui/icons-material'

export default function Header({ currUser, showProfile }) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 p-4">
      <div className="max-w-7xl mx-auto h-16 glass-card px-6 flex items-center justify-between border-white/5">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center group-hover:rotate-12 transition-transform">
            <span className="text-white font-black">M</span>
          </div>
          <span className="text-xl font-bold tracking-tight text-white">
            Medi<span className="text-blue-500">Bot</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Home</Link>
          <Link to="/chat" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Analysis</Link>
          <span className="text-sm font-medium text-gray-400 hover:text-white transition-colors cursor-not-allowed opacity-50">Reports</span>
        </nav>

        <div className="flex items-center gap-4">
          <Link to="/chat">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600/10 hover:bg-blue-600/20 text-blue-400 rounded-xl text-sm font-bold transition-all border border-blue-500/20"
            >
              <ChatBubbleOutline sx={{ fontSize: 18 }} />
              <span className="hidden sm:inline">Start Chat</span>
            </motion.button>
          </Link>

          <div className="h-8 w-[1px] bg-white/10" />

          <div className="flex items-center gap-3 pl-2">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-bold text-white leading-none">{currUser?.name}</p>
              <p className="text-[10px] text-gray-500 font-medium">Patient</p>
            </div>
            <motion.div
              whileHover={{ scale: 1.1 }}
              onClick={showProfile}
              className="relative cursor-pointer group"
            >
              <img 
                className="rounded-full h-10 w-10 border-2 border-transparent group-hover:border-blue-500 transition-all p-0.5" 
                src={currUser?.image} 
                alt="Profile"
              />
              <div className="absolute -bottom-1 -right-1 bg-red-500 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Logout sx={{ fontSize: 10, color: 'white' }} />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </header>
  )
}
