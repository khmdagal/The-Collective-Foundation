import React from 'react'
import Module2 from '../shared-modules/Module2'
import Header from '../shared-modules/Header'
import Module1 from '../shared-modules/Module1'
import Footer from '../shared-modules/Footer' 

export default function Page1() {
  return (
    <div>
      <Header/>
      <Module1/>
      <Module2/>
      <Footer/>
    </div>
  )
}
