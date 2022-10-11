import React from 'react'
import SingleRoomShedules from './SingleRoomShedules'

const SingleFloorSchedule = (props) => {

    const {schedule, floorName, setIsDeletePopOpen, setScheduleToDelete} = props
  return (
    <div>
        {
            Object.keys(schedule).map((room, index)=>{
                return (
                    <div key={index}>
                        <h2 className='font-bold ml-6 text-2xl text-cyan-800 mb-4'>{room}</h2>
                        <SingleRoomShedules schedule={schedule} floorName={floorName} roomName={room} setIsDeletePopOpen={setIsDeletePopOpen} setScheduleToDelete={setScheduleToDelete}/>
                    </div>
                ) 
            })
        }
    </div>
  )
}

export default SingleFloorSchedule