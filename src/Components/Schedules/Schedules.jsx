import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import { LoadingContext } from '../../App'
import DeletePopup from '../HeadlessUi/DeletePopup'
import AddSchedule from './AddSchedule'
import SingleFloorSchedule from './SingleFloorSchedule'

const Schedules = () => {
  const [schedules, setSchedules] = useState({})
  const [isAddPopOpen, setIsAddPopOpen] = useState(false)
  const [isDeletePopOpen, setIsDeletePopOpen] = useState(false)
  const [scheduleToDelete, setScheduleToDelete] = useState([])
  const setIsLoading = useContext(LoadingContext)
  // const [isEditPopOpen, setIsEditPopOpen] = useState(false)
  // const [scheduleToEdit, setScheduleToEdit] = useState([])

  function closeAddModal(){
    setIsAddPopOpen(false)
  }
  function closeDeleteModal(){
    setIsDeletePopOpen(false)
  }
  useEffect(()=>{
    async function getSchedules(){
      try {
        setIsLoading(true)
        const response = await axios.get('https://timetable-management-api.vercel.app/allSchedules')
        setSchedules(response.data)
        setIsLoading(false)
      } catch (error) {
        console.log(error)
      }
    }

    getSchedules()
  },[isAddPopOpen, isDeletePopOpen, setIsLoading])
  async function deleteSchedule(){
    closeDeleteModal()
    try{
      const {floor, room_name, day, slot} = scheduleToDelete
      const response = await axios.post("https://timetable-management-api.vercel.app/deleteSchedule",{
        "floor" : floor,
        "room_name" : room_name,
        "day" : day,
        "slot" : slot
      })
      toast.info(response)      
    }catch(error){
      console.log(error);
    }

  }
  return (
    <div className='mt-10'>
      <ToastContainer />
      <AddSchedule isAddPopOpen={isAddPopOpen} closeAddModal={closeAddModal}/>
      <DeletePopup isDeletePopOpen={isDeletePopOpen} closeDeleteModal={closeDeleteModal} deleteFunc={deleteSchedule}/>
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
          <h2 className='text-center text-3xl font-bold text-cyan-600'>{floor} Floor</h2>
          <SingleFloorSchedule schedule={schedules[floor]} floorName={floor} setIsDeletePopOpen={setIsDeletePopOpen} setScheduleToDelete={setScheduleToDelete} />
        </div>;
      })}
    </div>
  )
}

export default Schedules