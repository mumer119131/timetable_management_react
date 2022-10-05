import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { ToastContainer , toast} from 'react-toastify'
import AddSchedule from './AddSchedule'
import ScheduleTable from './ScheduleTable'

const Schedules = () => {
  const [schedules, setSchedules] = useState({})
  const [isAddPopOpen, setIsAddPopOpen] = useState(false)
  function closeAddModal(){
    setIsAddPopOpen(false)
  }
  useEffect(()=>{
    async function getSchedules(){
      try {
        const response = await axios.get('http://127.0.0.1:5000/allSchedules')
        setSchedules(response.data)
      } catch (error) {
        console.log(error)
      }
    }

    getSchedules()
  },[isAddPopOpen])
  return (
    <div className='mt-10'>
      <ToastContainer />
      <AddSchedule isAddPopOpen={isAddPopOpen} closeAddModal={closeAddModal}/>
      <div className="text-right px-8 mt-4">
      <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
                      onClick={()=> setIsAddPopOpen(true)}
                    >
                      Add Schedule
                    </button>
      </div>
      {Object.keys(schedules).map((room, index) => {
        return <div key={index}>
          <h2 className='text-center text-3xl font-bold text-cyan-600'>{room}</h2>
          <ScheduleTable schedule={schedules[room]} roomName={room}/>
        </div>;
      })}
    </div>
  )
}

export default Schedules