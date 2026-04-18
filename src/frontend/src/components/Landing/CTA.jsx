import React from 'react'
import { motion } from 'framer-motion'
import { 
  SettingsSuggest, 
  FactCheck, 
  Insights, 
  ArrowForward 
} from '@mui/icons-material'

const steps = [
  {
    title: "Choose Prediction Model",
    description: "Select from our range of high-precision models: Random Forest, Support Vector Machine, or Naive Bayes.",
    icon: <SettingsSuggest className="text-blue-500" sx={{ fontSize: 32 }} />,
    color: "blue"
  },
  {
    title: "Symptom Analysis",
    description: "Input your symptoms through our intuitive interface. Our AI recognizes hundreds of medical conditions.",
    icon: <FactCheck className="text-purple-500" sx={{ fontSize: 32 }} />,
    color: "purple"
  },
  {
    title: "Get Real-time Insights",
    description: "Receive instant predictions validated across all models, complete with medical guidance and nearby care options.",
    icon: <Insights className="text-emerald-500" sx={{ fontSize: 32 }} />,
    color: "emerald"
  }
]

export default function CTA() {
  return (
    <section className="py-24 px-6 md:px-12 bg-mesh">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">How it works</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Our diagnostic pipeline uses a combination of classical machine learning and modern LLMs to provide comprehensive health insights.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              className="relative group"
            >
              <div className="glass-card p-10 h-full flex flex-col items-center text-center hover:bg-white/5 transition-all">
                {/* Step Number */}
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full glass border border-white/10 flex items-center justify-center font-black text-white shadow-xl">
                  {idx + 1}
                </div>

                <div className="mb-6 p-4 bg-white/5 rounded-3xl group-hover:scale-110 transition-transform">
                  {step.icon}
                </div>

                <h3 className="text-2xl font-bold text-white mb-4">{step.title}</h3>
                <p className="text-gray-400 leading-relaxed mb-8">{step.description}</p>
                
                {idx < steps.length - 1 && (
                  <div className="hidden md:block absolute -right-6 top-1/2 -translate-y-1/2 text-gray-700 z-10">
                    <ArrowForward sx={{ fontSize: 40 }} />
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="mt-20 glass-card p-12 bg-gradient-to-r from-blue-600/20 to-purple-600/10 border-blue-500/20 text-center"
        >
          <h3 className="text-3xl font-bold text-white mb-4">Ready to analyze your symptoms?</h3>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">Join thousands of users who trust MediBot for their preliminary health checks.</p>
          <button className="px-10 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl transition-all shadow-xl shadow-blue-500/20">
            Get Started Now
          </button>
        </motion.div>
      </div>
    </section>
  )
}
