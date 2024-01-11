import React from 'react'
import { Navbar } from 'react-bootstrap'
import OngoingTasks from './Cards/OngoingTasks'
import CustomerList1 from './customers'
import UserWorkTaskStats from './UserWorkTaskStats'
import CompanyList from './CompanyList'


function Home() {
  return (


    <div>

<div>

      <Navbar />
      <UserWorkTaskStats/>
      <h1>HomePage</h1>
      <CustomerList1 />
      <OngoingTasks />
    
    </div>
        
    </div>
  )
}

export default Home