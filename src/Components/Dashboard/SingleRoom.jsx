import React, {useEffect, useState} from 'react'
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
                    setCurrentClassName([schedule[time]["class_name"], schedule[time]["course_code"], schedule[time]['teacher_name']])
                  }
                }
              })
        } catch (error) {
            
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
    <div className={(!isRoomFree ? "bg-gradient-to-r from-cyan-500 to-blue-500 " : "bg-gray-700 ") + "flex flex-col justify-center w-64 px-4 items-start rounded py-8 text-white drop-shadow-md hover:drop-shadow-2xl cursor-pointer"}>
        
        <p className='font-bold text-sm'>{!isRoomFree ? currentClassName[0] : ''}</p>
        <p className='font-thin text-xs'>{!isRoomFree ? '('+currentClassName[1]+')' : ''}</p>
        <p className='font-thin text-sm'>{!isRoomFree ? currentClassName[2] : ''}</p>
        <p className='text-4xl'>{room_name}</p>
        <div className='flex gap-2 flex-wrap mt-4'>
          <p className='bg-teal-800 text-xs w-max px-2 rounded-lg '>{room.size}</p>
          <p className={(!room.projector ? "bg-rose-800 line-through" : 'bg-teal-800') + ' text-xs w-max px-2 rounded-lg'}>Projector</p>
          <p className='bg-teal-800 text-xs w-max px-2 rounded-lg '>{room.type}</p>
        </div>
        
    </div>
  )
}

export default SingleRoom