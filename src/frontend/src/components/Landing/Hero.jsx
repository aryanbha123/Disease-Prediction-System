import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowForward, MedicalServices, Psychology, Biotech } from '@mui/icons-material'

export default function Hero() {
  return (
    <div className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden pt-20">
      {/* Background Orbs */}
      <div className="absolute top-1/4 -left-20 w-72 h-72 bg-blue-600/20 rounded-full blur-[120px] -z-10 animate-pulse" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-purple-600/10 rounded-full blur-[140px] -z-10 animate-pulse" style={{ animationDelay: '2s' }} />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-blue-500/20 text-blue-400 text-sm font-medium mb-8"
        >
          <Biotech sx={{ fontSize: 18 }} />
          <span>Next-Generation Disease Prediction</span>
        </motion.div>

        <h1 className="text-6xl md:text-8xl font-extrabold mb-8 tracking-tight">
          <span className="text-white">Your Health,</span> <br />
          <span className="text-gradient-primary">Understood by AI.</span>
        </h1>

        <p className="text-gray-400 text-xl md:text-2xl mb-12 max-w-2xl mx-auto leading-relaxed">
          The most advanced AI-powered symptom analyzer. Predict diseases with medical precision using our triple-model architecture.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <Link to="/chat">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-bold flex items-center gap-2 shadow-lg shadow-blue-500/25 transition-all"
            >
              Start Analysis <ArrowForward />
            </motion.button>
          </Link>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 glass border border-white/10 hover:border-white/20 text-white rounded-2xl font-bold transition-all"
          >
            Learn More
          </motion.button>
        </div>
      </motion.div>

      {/* Feature Pills */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-24 w-full max-w-4xl"
      >
        <div className="glass-card p-6 flex flex-col items-center gap-3">
          <div className="p-3 bg-blue-500/10 rounded-xl text-blue-500">
            <MedicalServices />
          </div>
          <h3 className="font-bold text-lg">95% Accuracy</h3>
          <p className="text-gray-500 text-sm">Triple-model verification</p>
        </div>
        <div className="glass-card p-6 flex flex-col items-center gap-3">
          <div className="p-3 bg-purple-500/10 rounded-xl text-purple-500">
            <Psychology />
          </div>
          <h3 className="font-bold text-lg">Smart Insights</h3>
          <p className="text-gray-500 text-sm">Powered by Gemini AI</p>
        </div>
        <div className="glass-card p-6 flex flex-col items-center gap-3 col-span-2 md:col-span-1">
          <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-500">
            <Biotech />
          </div>
          <h3 className="font-bold text-lg">Real-time Data</h3>
          <p className="text-gray-500 text-sm">Up-to-date medical knowledge</p>
        </div>
      </motion.div>
    </div>
  )
}
