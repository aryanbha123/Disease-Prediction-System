import { useState } from 'react'
import axios from 'axios'
import { Button, IconButton, TextField, MenuItem, Grid } from '@mui/material'
import { Close, HealthAndSafety, ChevronLeft, ChevronRight } from '@mui/icons-material'
import { motion, AnimatePresence } from 'framer-motion'

const featureNames = [
  'Age', 'Gender', 'Height (cm)', 'Weight (kg)', 'BMI', 'Daily Steps', 
  'Calories Intake', 'Hours of Sleep', 'Heart Rate', 'Exercise Hours/Week', 
  'Smoker (0 or 1)', 'Alcohol Consumption/Week', 'Diabetic (0 or 1)', 
  'Heart Disease (0 or 1)', 'Systolic BP', 'Diastolic BP'
]

const defaultValues = [56, 0, 164, 81, 30.72, 5134, 1796, 8.6, 102, 8.1, 0, 7, 0, 0, 137, 72]

export default function Lifestyle({ setLifestyle, setMenu }) {
  const [features, setFeatures] = useState(defaultValues)
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState(0)

  const itemsPerStep = 4
  const totalSteps = Math.ceil(featureNames.length / itemsPerStep)

  const closeAll = () => {
    setMenu(false)
    setLifestyle(false)
  }

  const handleChange = (index, value) => {
    const updated = [...features]
    updated[index] = value
    setFeatures(updated)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const response = await axios.post('http://127.0.0.1:5001/predict', {
        features: features.map(Number)
      })
      const { prediction } = response.data
      const risks = ['Low Risk', 'Moderate Risk', 'High Risk']
      setResult(risks[prediction] || 'Unknown Risk Level')
    } catch (err) {
      setResult('Check if Lifestyle API (Port 5001) is running.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 backdrop-blur-xl bg-black/60'>
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className='glass-card w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden border-white/10'
      >
        {/* Header */}
        <div className='p-6 border-b border-white/5 flex items-center justify-between bg-white/5'>
          <div className='flex items-center gap-3 font-bold text-xl md:text-2xl text-white'>
            <HealthAndSafety className='text-blue-500' />
            <span>Lifestyle Risk Analysis</span>
          </div>
          <IconButton onClick={closeAll} sx={{ color: 'white' }}><Close /></IconButton>
        </div>

        {/* Content */}
        <div className='flex-1 overflow-y-auto p-6 md:p-10'>
          <div className='mb-8'>
            <div className='flex justify-between items-end mb-2'>
              <span className='text-sm text-gray-500 font-bold uppercase tracking-wider'>Section {step + 1} of {totalSteps}</span>
              <span className='text-xs text-blue-400 font-mono'>{Math.round(((step + 1) / totalSteps) * 100)}% Complete</span>
            </div>
            <div className='h-1.5 w-full bg-white/5 rounded-full overflow-hidden'>
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${((step + 1) / totalSteps) * 100}%` }}
                className='h-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]'
              />
            </div>
          </div>

          <form onSubmit={handleSubmit} className='space-y-8'>
            <AnimatePresence mode='wait'>
              <motion.div
                key={step}
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -20, opacity: 0 }}
                className='grid grid-cols-1 md:grid-cols-2 gap-6'
              >
                {featureNames.slice(step * itemsPerStep, (step + 1) * itemsPerStep).map((name, i) => {
                  const actualIndex = step * itemsPerStep + i
                  const isSelect = [1, 10, 12, 13].includes(actualIndex)
                  
                  return (
                    <div key={actualIndex} className='space-y-2'>
                      <label className='text-sm font-bold text-gray-400'>{name}</label>
                      {isSelect ? (
                        <TextField
                          select
                          fullWidth
                          value={features[actualIndex]}
                          onChange={(e) => handleChange(actualIndex, e.target.value)}
                          sx={inputSx}
                        >
                          {actualIndex === 1 ? [
                            <MenuItem key='m' value={0}>Male</MenuItem>,
                            <MenuItem key='f' value={1}>Female</MenuItem>
                          ] : [
                            <MenuItem key='n' value={0}>No</MenuItem>,
                            <MenuItem key='y' value={1}>Yes</MenuItem>
                          ]}
                        </TextField>
                      ) : (
                        <TextField
                          fullWidth
                          type='number'
                          value={features[actualIndex]}
                          onChange={(e) => handleChange(actualIndex, e.target.value)}
                          sx={inputSx}
                        />
                      )}
                    </div>
                  )
                })}
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className='flex justify-between items-center pt-8 border-t border-white/5'>
              <Button
                disabled={step === 0}
                onClick={() => setStep(s => s - 1)}
                startIcon={<ChevronLeft />}
                sx={{ color: 'white', '&.Mui-disabled': { color: 'rgba(255,255,255,0.1)' } }}
              >
                Back
              </Button>

              {step < totalSteps - 1 ? (
                <Button
                  variant='contained'
                  onClick={() => setStep(s => s + 1)}
                  endIcon={<ChevronRight />}
                  sx={{ bgcolor: '#3b82f6', borderRadius: '12px', px: 4, textTransform: 'none', fontWeight: 'bold' }}
                >
                  Next
                </Button>
              ) : (
                <Button
                  type='submit'
                  variant='contained'
                  disabled={loading}
                  sx={{ bgcolor: '#10b981', '&:hover': { bgcolor: '#059669' }, borderRadius: '12px', px: 6, textTransform: 'none', fontWeight: 'bold' }}
                >
                  {loading ? 'Analyzing...' : 'Generate Prediction'}
                </Button>
              )}
            </div>
          </form>
        </div>

        {/* Result Overlay */}
        <AnimatePresence>
          {result && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className='absolute inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-md p-6'
            >
              <motion.div 
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className='glass-card p-10 max-w-sm w-full text-center space-y-6 border-blue-500/30'
              >
                <div className='w-20 h-20 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto'>
                  <HealthAndSafety className='text-blue-500' sx={{ fontSize: 40 }} />
                </div>
                <div>
                  <h3 className='text-gray-400 font-bold uppercase tracking-widest text-xs mb-1'>Result Analysis</h3>
                  <div className={`text-3xl font-black ${
                    result.includes('High') ? 'text-red-500' : 
                    result.includes('Moderate') ? 'text-amber-500' : 'text-emerald-500'
                  }`}>
                    {result}
                  </div>
                </div>
                <Button 
                  fullWidth 
                  variant='outlined' 
                  onClick={() => setResult('')}
                  sx={{ color: 'white', borderColor: 'rgba(255,255,255,0.2)', borderRadius: '10px' }}
                >
                  Done
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

const inputSx = {
  '& .MuiOutlinedInput-root': {
    color: 'white',
    bgcolor: 'rgba(255,255,255,0.03)',
    borderRadius: '12px',
    '& fieldset': { borderColor: 'rgba(255,255,255,0.1)' },
    '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.3)' },
    '&.Mui-focused fieldset': { borderColor: '#3b82f6' },
  },
  '& .MuiSvgIcon-root': { color: 'white' }
}
