import React, { useState, useEffect } from 'react'
import { AddBox, AccountCircle } from '@mui/icons-material'
import { Button, IconButton, TextField } from '@mui/material'
import { motion, AnimatePresence } from 'framer-motion'

export default function Profiles({ currHandler }) {
  const [profiles, setProfiles] = useState([])
  const [profileImage, setProfileImage] = useState(null)
  const [profileName, setProfileName] = useState('')
  const [loader, setLoader] = useState(false)
  const [isAdding, setIsAdding] = useState(false)

  useEffect(() => {
    const data = localStorage.getItem('profiles')
    if (data) {
      const storedProfiles = JSON.parse(data)
      if (Array.isArray(storedProfiles)) {
        setProfiles(storedProfiles)
      }
    }
  }, [])

  useEffect(() => {
    if (profiles.length > 0) {
      localStorage.setItem('profiles', JSON.stringify(profiles))
      setLoader(false)
    }
  }, [profiles])

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfileImage(reader.result)
        setIsAdding(true)
      }
      reader.readAsDataURL(file)
    }
  }

  const addProfile = () => {
    if (profileImage && profileName.trim() !== '') {
      const newProfile = {
        name: profileName,
        image: profileImage
      }
      setProfiles(prev => [...prev, newProfile])
      setProfileImage(null)
      setProfileName('')
      setIsAdding(false)
    } else {
      alert('Please enter a name.')
    }
  }

  if (loader) {
    return (
      <div className='flex justify-center items-center h-screen w-screen bg-black'>
        <div className='loader'></div>
      </div>
    )
  }

  return (
    <div className='bg-mesh min-h-screen w-screen flex flex-col items-center justify-center p-6 sm:p-12 overflow-hidden'>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className='text-center mb-16'
      >
        <h1 className='text-5xl md:text-7xl font-bold text-gradient mb-4'>Who's consulting?</h1>
        <p className='text-gray-400 text-lg'>Select a profile to start your symptoms analysis</p>
      </motion.div>

      <div className='flex flex-wrap items-center justify-center gap-10 max-w-6xl'>
        <AnimatePresence>
          {profiles.map((profile, index) => (
            <motion.div
              layout
              key={index}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              onClick={() => currHandler(index)}
              className='group flex flex-col items-center cursor-pointer transition-all'
            >
              <div className='relative w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden border-2 border-transparent group-hover:border-blue-500 transition-all shadow-2xl'>
                <img 
                  src={profile.image} 
                  alt={profile.name} 
                  className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-500'
                />
                <div className='absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors' />
              </div>
              <p className='mt-4 text-xl font-medium text-gray-300 group-hover:text-white group-hover:font-semibold transition-all'>
                {profile.name}
              </p>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Add Button */}
        <motion.div
          layout
          whileHover={{ y: -10 }}
          className='flex flex-col items-center'
        >
          <label htmlFor='profile-upload' className='cursor-pointer group'>
            <div className='w-32 h-32 md:w-40 md:h-40 rounded-2xl glass-card flex items-center justify-center group-hover:bg-blue-600/20 group-hover:border-blue-500/50 transition-all'>
              <AddBox className='text-gray-500 group-hover:text-blue-500 transition-colors' sx={{ fontSize: 60 }} />
            </div>
            <p className='mt-4 text-xl font-medium text-gray-500 group-hover:text-blue-500 transition-all text-center'>
              Add Profile
            </p>
          </label>
          <input 
            id='profile-upload' 
            type='file' 
            accept='image/*' 
            className='hidden' 
            onChange={handleImageChange} 
          />
        </motion.div>
      </div>

      {/* Modal / Overlay for adding name */}
      <AnimatePresence>
        {isAdding && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='fixed inset-0 z-50 flex items-center justify-center p-6 backdrop-blur-md bg-black/60'
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className='glass-card p-8 w-full max-w-md flex flex-col items-center gap-6 shadow-2xl'
            >
              <h2 className='text-3xl font-bold text-white'>New Profile</h2>
              <div className='w-24 h-24 rounded-full overflow-hidden border-2 border-blue-500 shadow-lg glow-blue'>
                <img src={profileImage} className='w-full h-full object-cover' alt='Preview' />
              </div>
              
              <TextField
                fullWidth
                label="What's your name?"
                variant="outlined"
                value={profileName}
                onChange={(e) => setProfileName(e.target.value)}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    color: 'white',
                    '& fieldset': { borderColor: 'rgba(255,255,255,0.2)' },
                    '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.5)' },
                    '&.Mui-focused fieldset': { borderColor: '#3b82f6' },
                  },
                  '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.5)' },
                  '& .MuiInputLabel-root.Mui-focused': { color: '#3b82f6' },
                }}
              />

              <div className='flex gap-4 w-full'>
                <Button 
                  fullWidth 
                  variant='contained' 
                  onClick={addProfile}
                  sx={{ 
                    bgcolor: '#3b82f6', 
                    py: 1.5, 
                    fontWeight: 'bold',
                    textTransform: 'none',
                    borderRadius: '12px',
                    fontSize: '1rem',
                    '&:hover': { bgcolor: '#2563eb' } 
                  }}
                >
                  Create
                </Button>
                <Button 
                  fullWidth 
                  variant='outlined' 
                  onClick={() => setIsAdding(false)}
                  sx={{ 
                    color: 'white', 
                    borderColor: 'rgba(255,255,255,0.2)',
                    py: 1.5, 
                    textTransform: 'none',
                    borderRadius: '12px',
                    '&:hover': { borderColor: 'white', bgcolor: 'rgba(255,255,255,0.05)' } 
                  }}
                >
                  Cancel
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
