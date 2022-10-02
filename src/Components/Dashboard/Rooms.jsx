import React from 'react'
import SingleRoom from './SingleRoom'

const Rooms = (props) => {
  const {rooms, selectedDay, selectedSlot} = props
  return (
    <div className='flex flex-wrap justify-center gap-4 mt-4'>
        {
            Object.keys(rooms).map((room_name, index) =>{
                return <SingleRoom room={rooms[room_name]} key={index} room_name={room_name} selectedSlot={selectedSlot} selectedDay={selectedDay}/>
            })
        }
    </div>
  )
}

export default Rooms