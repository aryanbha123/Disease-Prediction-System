import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ArrowUpward, 
  MapsUgc, 
  Stop, 
  SmartToy, 
  HealthAndSafety, 
  Medication, 
  VerifiedUser,
  LocalHospital,
  Info
} from '@mui/icons-material'
import { IconButton, Tooltip } from '@mui/material'
import { dehradunHospitals, diseaseDetails } from './data'

export default function ChatArea({ currUser }) {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)

  const symptomList = [
    'itching', 'skin_rash', 'joint_pain', 'vomiting', 'fatigue', 'cough', 
    'high_fever', 'headache', 'yellowish_skin', 'nausea', 'loss_of_appetite', 
    'abdominal_pain', 'diarrhoea', 'chest_pain', 'dizziness', 'excessive_hunger', 
    'loss_of_balance', 'irritability'
  ]

  const quickMessages = [
    'high_fever,headache,fatigue',
    'chest_pain,fatigue,dizziness',
    'cough,high_fever,fatigue',
    'abdominal_pain,vomiting,nausea'
  ]

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping])

  const handleSend = async (msgOverride) => {
    const messageText = msgOverride || input
    if (!messageText.trim()) return
    
    const newUserMessage = { text: messageText, sender: 'user', timestamp: new Date() }
    setMessages(prev => [...prev, newUserMessage])
    setInput('')
    setIsTyping(true)

    try {
      const res = await axios.post('http://localhost:5000/predict', { symptoms: messageText })
      
      if (res.data.error) {
        setMessages(prev => [...prev, {
          text: `I couldn't find manual data for: "${res.data.error.split(": ")[1]}". Please select from the suggestions or check your spelling.`,
          sender: 'bot',
          isError: true
        }])
        setIsTyping(false)
        return
      }

      const diseaseName = res.data.final_prediction
      
      let aiReply = `Based on your symptoms, our analysis suggests you may have ${diseaseName}.`;
      
      try {
        const msg = await axios.post('http://localhost:3000/get-res', { disease: diseaseName })
        aiReply = msg.data.response
      } catch (geminiErr) {
        console.warn("Gemini API failed, using fallback message.", geminiErr)
      }

      setTimeout(() => {
        setMessages(prev => [...prev, {
          text: aiReply,
          sender: 'bot',
          disease: diseaseName,
          info: getDiseaseInfo({ disease: diseaseName })[0],
          timestamp: new Date()
        }])
        setIsTyping(false)
      }, 800)
    } catch (err) {
      console.error(err)
      const errorMsg = err.response ? 
        `Backend Error (${err.config.url}): ${err.response.status} ${err.response.statusText}` : 
        `Connection Refused: Ensure the backend script for ${err.config?.url || 'the API'} is running on the correct port.`;
        
      setMessages(prev => [...prev, {
        text: errorMsg,
        sender: 'bot',
        isError: true
      }])
      setIsTyping(false)
    }
  }

  const filteredSuggestions = symptomList.filter(symptom => 
    symptom.toLowerCase().includes(input.toLowerCase()) && input.trim() !== ''
  )

  return (
    <div className="flex-1 flex flex-col h-screen bg-mesh pt-20 px-4 md:px-8 lg:px-12 relative overflow-hidden">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto pb-64 custom-scrollbar">
        <div className="max-w-4xl mx-auto space-y-8 pt-10">
          <AnimatePresence>
            {messages.length === 0 && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-20"
              >
                <div className="w-20 h-20 bg-blue-600/20 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl glow-blue">
                  <SmartToy className="text-blue-500" sx={{ fontSize: 40 }} />
                </div>
                <h2 className="text-4xl font-bold text-white mb-4">How can I help you today?</h2>
                <p className="text-gray-400 text-lg">Describe your symptoms or select a common condition below.</p>
              </motion.div>
            )}

            {messages.map((msg, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: msg.sender === 'user' ? 20 : -20 }}
                animate={{ opacity: 1, x: 0 }}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[85%] md:max-w-[75%] ${msg.sender === 'user' ? 'order-1' : 'order-1'}`}>
                  {/* Message Bubble */}
                  <div className={`p-4 md:p-6 rounded-3xl shadow-xl ${
                    msg.sender === 'user' 
                      ? 'bg-blue-600 text-white rounded-tr-none' 
                      : 'glass-card border-white/10 rounded-tl-none'
                  }`}>
                    <p className="text-base md:text-lg leading-relaxed font-medium">{msg.text}</p>
                  </div>

                  {/* Enhanced Bot Response Info */}
                  {msg.sender === 'bot' && msg.info && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-6 space-y-4"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <section className="glass-card p-5 border-emerald-500/20">
                          <div className="flex items-center gap-2 text-emerald-400 font-bold mb-3">
                            <Medication fontSize="small" /> <span>Recommended Medicines</span>
                          </div>
                          <ul className="space-y-1">
                            {msg.info.medicines.map((m, i) => (
                              <li key={i} className="text-gray-300 text-sm flex items-center gap-2">
                                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" /> {m}
                              </li>
                            ))}
                          </ul>
                        </section>

                        <section className="glass-card p-5 border-amber-500/20">
                          <div className="flex items-center gap-2 text-amber-500 font-bold mb-3">
                            <VerifiedUser fontSize="small" /> <span>Precautions</span>
                          </div>
                          <ul className="space-y-1">
                            {msg.info.precautions.map((p, i) => (
                              <li key={i} className="text-gray-300 text-sm flex items-center gap-2">
                                <div className="w-1.5 h-1.5 bg-amber-500 rounded-full" /> {p}
                              </li>
                            ))}
                          </ul>
                        </section>
                      </div>

                      {/* Hospitals List */}
                      <div className="glass-card p-6 border-blue-500/20">
                        <div className="flex items-center gap-2 text-blue-400 font-bold mb-4">
                          <LocalHospital fontSize="small" /> <span>Nearby Specialized Hospitals</span>
                        </div>
                        <div className="flex flex-wrap gap-3">
                          {dehradunHospitals.map((h, i) => (
                            <a 
                              key={i} 
                              href={h.website} 
                              target="_blank" 
                              rel="noreferrer"
                              className="px-4 py-2 bg-blue-500/5 hover:bg-blue-500/20 border border-blue-500/20 rounded-xl text-sm text-blue-300 transition-all"
                            >
                              {h.name}
                            </a>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))}

            {isTyping && (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                className="flex justify-start"
              >
                <div className="glass-card px-6 py-4 rounded-3xl rounded-tl-none">
                  <div className="flex gap-1.5">
                    {[0, 1, 2].map(i => (
                      <motion.div
                        key={i}
                        animate={{ y: [0, -5, 0] }}
                        transition={{ repeat: Infinity, duration: 0.6, delay: i * 0.1 }}
                        className="w-2 h-2 bg-blue-400 rounded-full"
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Section */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black via-black/90 to-transparent">
        <div className="max-w-4xl mx-auto">
          {/* Quick Suggestions Toggle */}
          <div className="flex gap-2 mb-4 overflow-x-auto pb-2 scrollbar-none">
            {quickMessages.map((q, i) => (
              <motion.button
                key={i}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleSend(q)}
                className="whitespace-nowrap px-4 py-2 glass-card border-white/5 hover:border-blue-500/50 text-xs font-semibold text-gray-400 hover:text-white transition-all"
              >
                {q.replace(/_/g, ' ')}
              </motion.button>
            ))}
          </div>

          {/* Autocomplete Suggestions */}
          <AnimatePresence>
            {filteredSuggestions.length > 0 && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute bottom-32 left-6 right-6 md:left-auto md:right-auto md:w-[60%] glass-card p-2 flex flex-wrap gap-2 z-50 border-blue-500/20"
              >
                {filteredSuggestions.slice(0, 8).map((s, i) => (
                  <button
                    key={i}
                    onClick={() => setInput(s)}
                    className="px-3 py-1.5 bg-blue-600/10 hover:bg-blue-600 text-blue-400 hover:text-white rounded-lg text-xs font-bold transition-all"
                  >
                    {s.replace(/_/g, ' ')}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main Input */}
          <div className="relative flex items-center gap-3">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Ex Describe your symptoms..."
                className="w-full h-16 pl-6 pr-14 glass-card border-white/10 focus:border-blue-500/50 outline-none text-white text-lg transition-all"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSend()}
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 flex gap-1">
                <Tooltip title="Symptom Guide">
                  <IconButton sx={{ color: 'rgba(255,255,255,0.3)' }} onClick={() => setShowSuggestions(!showSuggestions)}>
                    <Info fontSize="small" />
                  </IconButton>
                </Tooltip>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleSend()}
              className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-2xl transition-all ${
                input.trim() ? 'bg-blue-600 text-white shadow-blue-500/30' : 'bg-white/5 text-gray-600 cursor-not-allowed'
              }`}
            >
              {isTyping ? <Stop /> : <ArrowUpward />}
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  )
}

const getDiseaseInfo = ({ disease }) => {
  if (!disease) return []
  return diseaseDetails.filter(i => i.disease.toLowerCase() === disease.toLowerCase())
}
