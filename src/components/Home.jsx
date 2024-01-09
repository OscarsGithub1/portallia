import React from 'react'
import { Navbar } from 'react-bootstrap'
import OngoingTasks from './Cards/OngoingTasks'
import CustomerList1 from './customers'


function Home() {
  return (


    <div>

<div>
      <Navbar />
      <h1>HomePage</h1>
      <CustomerList1 />
      <OngoingTasks />
    </div>
        
    </div>
  )
}

export default Home