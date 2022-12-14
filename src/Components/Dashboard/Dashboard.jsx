import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import Rooms from './Rooms'
import { LoadingContext, SlotsContext } from '../../App'
import OptionsList from '../HeadlessUi/OptionsList'

const Dashboard = () => {
  var slots = useContext(SlotsContext)
  const setIsLoading = useContext(LoadingContext)
  slots = ['Current',...slots]
  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  const [selected, setSelected] = useState(slots[0])
  const [selectedDay, setSelectedDay] = useState(dayNames[new Date().getDay()]) 
  const [rooms, setRooms] = useState({})
  useEffect(()=>{
    async function getAllRooms(){
      try {
        setIsLoading(true)
        const rooms_data =  await axios.get("https://timetable-management-api.vercel.app/getRoomsByFloor")
        setRooms(rooms_data.data)
        setIsLoading(false)
      } catch (error) {
        console.log(error)
      }
    }

    getAllRooms();
  },[setIsLoading])
  return (
    <div className='mt-8'>
      <div className='text-center'>
        <p className='text-gray-600 text-xs'>- Keep track of the most valueable thing in your life -</p>
        <h1 className='font-bold text-4xl text-sky-700'>Dept. Timetable Management</h1>
      </div>
      <div className='flex flex-wrap justify-center gap-4 mt-8'>
      <div className='w-40'>
        <OptionsList className="w-full" selectedItem={selectedDay} setSelectedItem={setSelectedDay} itemsList={dayNames} />
      </div>
      <div className='w-40'>
        <OptionsList selectedItem={selected} setSelectedItem={setSelected} itemsList={slots} />
      </div>
      </div>
    <div>
      {
        Object.keys(rooms).map((floor, index) =>{
          return <div key={index} className="text-center mt-8 mb-8">
            <h2 className='text-center'>{floor} Floor</h2>
            <Rooms rooms={rooms[floor]} selectedSlot={selected} selectedDay={selectedDay}/>
          </div>
        })
      }
    </div>

    </div>
  )
}

export default Dashboard