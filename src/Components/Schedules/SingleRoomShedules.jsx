import React from 'react'

const SingleRoomShedules = (props) => {
    const {schedule, floorName, roomName, setIsDeletePopOpen, setScheduleToDelete} = props
    const tableTitles = [ 'Slot', 'Class', 'Teacher Name', 'Course Code']
  return (
    Object.keys(schedule[roomName]).map((day, ind)=>{
            return <div key={ind}>
            <h2 className='ml-6 font-bold'>{day}</h2>
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <table className="min-w-full">
                  <thead className="border-b">
                    <tr>
                      {tableTitles.map((title, index) => {
                        return (
                          <th
                            scope="col"
                            className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                            key={index}
                          >
                            {title}
                          </th>
                        );
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {Object.keys(schedule[roomName][day]).map((slot, index)=>{
                      const {teacher_name, course_code, class_name} = schedule[roomName][day][slot]
                      console.log()
                      return <tr className={(index % 2===0 ? "bg-slate-200 " : "")+"border-b hover:bg-slate-300 group ease-in duration-300"} key={index}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-thin">
                            {slot}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-thin">
                            {class_name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-thin">
                            {teacher_name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-thin">
                            {course_code}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-thin text-red-600 hover:underline cursor-pointer hidden group-hover:inline-block w-10"
                            onClick={()=> { setIsDeletePopOpen(true); setScheduleToDelete({'floor':floorName, 'room_name' : roomName, 'day': day, 'slot' : slot})}}
                          >
                            <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                          >
                      Delete
                    </button>
                          </td>
                    </tr>
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
            </div>
        })
  )
}

export default SingleRoomShedules