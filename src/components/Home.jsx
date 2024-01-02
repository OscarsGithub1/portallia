import React from 'react'
import { Navbar } from 'react-bootstrap'
import OngoingTasks from './Cards/OngoingTasks'

function Home() {
  return (


    <div>

        <Navbar/>

        <h1>HomePage</h1>

        <OngoingTasks/>
    </div>
  )
}

export default Home