import React from 'react'
import Hero from '../components/Landing/Hero'
import Header from '../shared/Header'
import  StepperWithContent  from '../components/Landing/CTA'

export default function ({ currUser , showProfile}) {
  return (
    <div>
      <Header  currUser={ currUser} showProfile={showProfile} />
      <Hero />
      <StepperWithContent/>
    </div>
  )
}
