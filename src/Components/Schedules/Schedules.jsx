import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import AddSchedule from './AddSchedule'
import SingleFloorSchedule from './SingleFloorSchedule'

const Schedules = () => {
  const [schedules, setSchedules] = useState({})
  const [isAddPopOpen, setIsAddPopOpen] = useState(false)
  const [isDeletePopOpen, setIsDeletePopOpen] = useState(false)
  const [scheduleToDelete, setScheduleToDelete] = useState([])
  const [isEditPopOpen, setIsEditPopOpen] = useState(false)
  const [scheduleToEdit, setScheduleToEdit] = useState([])

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
      {Object.keys(schedules).map((floor, index) => {
        return <div key={index}>
          <h2 className='text-center text-3xl font-bold text-cyan-600'>{floor}</h2>
          <SingleFloorSchedule schedule={schedules[floor]} floorName={floor}/>
        </div>;
      })}
    </div>
  )
}

export default Schedules