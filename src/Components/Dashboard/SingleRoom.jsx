import React, {useEffect, useState} from 'react'
import {AiFillCheckCircle, AiFillCloseCircle } from 'react-icons/ai'
const SingleRoom = (props) => {
  const {room, room_name, selectedSlot, selectedDay} = props
  const [currentClassName, setCurrentClassName] = useState([])
  const [isRoomFree, setIsRoomFree] = useState(true)
  useEffect(()=>{
    function currentClass(){
       setIsRoomFree(true)
        const date = new Date()

        var search_time = date.getTime()
        if(!selectedSlot.match(/Current/g)){
          search_time = timeParser(selectedSlot)
        }
        try {
            let schedule = room['schedule'][selectedDay]
            Object.keys(schedule).forEach((time)=>{
                let {start_time, end_time} = timeParser(time)
                if(selectedSlot === "Current"){
                  if ( search_time >= start_time && search_time <= end_time){
                    setIsRoomFree(false)
                    setCurrentClassName([schedule[time]["class_name"], schedule[time]["course_code"]])
                  }
                }else{
                  if ( search_time["start_time"] >= start_time && search_time["end_time"] <= end_time){
                    setIsRoomFree(false)
                    setCurrentClassName([schedule[time]["class_name"], schedule[time]["course_code"]])
                  }
                }
              })
        } catch (error) {
            console.log("no class")
        }
        
    }
    function timeParser(timeString){
      let start_end_time = timeString.split('-')
      let start = start_end_time[0].split(':')
      let end = start_end_time[1].split(':')
      let start_time = new Date().setHours(start[0],start[1])
      let end_time = new Date().setHours(end[0], end[1])
      return {"start_time":start_time,"end_time" : end_time}
    }
    currentClass()
  },[selectedSlot, selectedDay, room])
  
  return (
    <div className={(!isRoomFree ? "bg-gradient-to-r from-cyan-500 to-blue-500 " : "bg-gray-700 ") + "flex flex-col w-max justify-center rounded py-8 px-20 text-white drop-shadow-md hover:drop-shadow-2xl cursor-pointer"}>
        <p className='absolute left-2 top-2 text-cyan-100 text-xs bg-cyan-600 rounded-lg px-4'>{room.size}</p>
        <p className='font-bold text-sm'>{!isRoomFree ? currentClassName[0] : ''}</p>
        <p className='font-thin text-xs'>{!isRoomFree ? '('+currentClassName[1]+')' : ''}</p>
        <p className='text-4xl'>{room_name}</p>
        <p className='text-sm font-thin'>Projector {room.projector ? <AiFillCheckCircle className='inline' /> : <AiFillCloseCircle className='inline' /> }</p>
        <p>- {room.type} -</p>
    </div>
  )
}

export default SingleRoom