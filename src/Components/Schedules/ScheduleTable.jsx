import axios from "axios";
import React,{useState} from "react";
import DeletePopup from "../HeadlessUi/DeletePopup";
import EditSchedule from './EditSchedule'
const ScheduleTable = (props) => {
  const { schedule, roomName } = props;
  const [isDeletePopOpen, setIsDeletePopOpen] = useState(false)
  const [scheduleToDelete, setScheduleToDelete] = useState({})
  const [isEditPopOpen, setIsEditPopOpen] = useState(false)
  const [scheduleToEdit, setScheduleToEdit] = useState({})
  const titles = ["Slot", "Class Name", "Course Code"];

  function closeDeleteModal(){
    setIsDeletePopOpen(false)
  }
  function closeEditModal(){
    setIsEditPopOpen(false)
  }
  async function deleteSchedule(){
    closeDeleteModal()
    try {
      await axios.post("http://127.0.0.1:5000/deleteSchedule",{
        "room_name" : scheduleToDelete['room_name'],
        "day" : scheduleToDelete['day'],
        "time" : scheduleToDelete['slot']
      })
    } catch (error) {
        console.log(error);
    }
  }
  return (
    <>
      {Object.keys(scheduleToEdit).length > 0 ? <EditSchedule isEditPopOpen={isEditPopOpen} closeEditModal={closeEditModal} scheduleToEdit={scheduleToEdit}/> : undefined}
      <DeletePopup isDeletePopOpen={isDeletePopOpen} closeDeleteModal={closeDeleteModal} deleteFunc={deleteSchedule}/>
      {Object.keys(schedule).map((day, index) => {
        var slots = schedule[day]
        return (
          <div key={index}>
            <h2 className="text-xl ml-10">{day}</h2>
            <div className="flex flex-col p-8">
              <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                  <div className="overflow-hidden">
                    <table className="min-w-full">
                      <thead className="border-b">
                        <tr>
                          {titles.map((title, index) => {
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
                        {Object.keys(slots).map((slot, index) => {
                          const { class_name, course_code } = slots[slot];
                          return (
                            <tr className="border-b" key={index}>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-thin">
                                {slot}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-thin">
                                {class_name}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-thin">
                                {course_code}
                              </td>
                              <td
                                className="px-6 py-4 whitespace-nowrap text-sm text-green-700 font-thin cursor-pointer hover:underline"
                                onClick={() => {
                                  setIsEditPopOpen(true);
                                  setScheduleToEdit({ 'room_name' : roomName, "day" : day, "slot" : slot, "class_name" : class_name, "course_code": course_code });
                                }}
                              >
                                Edit
                              </td>
                              <td
                                className="px-6 py-4 whitespace-nowrap text-sm font-thin text-red-600 hover:underline cursor-pointer"
                                onClick={() => {
                                  setIsDeletePopOpen(true);
                                  setScheduleToDelete({'room_name': roomName, 'day' : day, 'slot' : slot});
                                }}
                              >
                                Delete
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default ScheduleTable;
