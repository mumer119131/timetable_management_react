import React, {useState, useContext, Fragment} from 'react'
import { Dialog, Transition } from '@headlessui/react'
import OptionsList from '../HeadlessUi/OptionsList'
import { SlotsContext } from '../../App'
import axios from 'axios'

const EditSchedule = (props) => {

  const {isEditPopOpen, closeEditModal, scheduleToEdit} = props
  const [classes, setClasses] = useState(['- Select Class -'])
  const [rooms, setRooms] = useState(['- Select Room -'])
  const daysList = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  const slots = useContext(SlotsContext)
  const [selectedClass, setSelectedClass] = useState(scheduleToEdit['class_name'])
  const [selectedRoom, setSeletedRoom] = useState(scheduleToEdit['room_name'])
  const [selectedDay, setSelectedDay] = useState(scheduleToEdit['day'])
  const [selectedSlot, setSelectedSlot] = useState(scheduleToEdit['slot'])
  const [courseCode, setCourseCode] = useState(scheduleToEdit['course_code'])

  useState(()=>{
    console.log(scheduleToEdit)
    async function getRoomsAndClasses(){
        console.log('called')
        try {
            const response = await axios.get('https://timetable-management-api.vercel.app/getAllRooms')
            setRooms(Object.keys(response.data))
            const classesResponse = await axios.get('https://timetable-management-api.vercel.app/allClasses')
            setClasses(Object.keys(classesResponse.data))
        } catch (error) {
            console.log(error)
        }
    }
    setSelectedClass(scheduleToEdit['class_name'])
    setSeletedRoom(scheduleToEdit['room_name'])
    setSelectedDay(scheduleToEdit['day'])
    setSelectedSlot(scheduleToEdit['slot'])
    setCourseCode(scheduleToEdit['course_code'])
    getRoomsAndClasses()
  }, [isEditPopOpen])
  function editSchedule(){
    console.log(scheduleToEdit)
  }
  return (
    <Transition appear show={isEditPopOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeEditModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Edit Schedule
                  </Dialog.Title>
                  <form className="mt-2 flex flex-col gap-4">
                  <input type="text" className='mt-1 border rounded p-2 border-gray-300 w-full' placeholder='Course Code' onChange={(e) => setCourseCode(e.target.value)} value={courseCode}/>
                    <OptionsList selectedItem={selectedClass} setSelectedItem={setSelectedClass} itemsList={classes}/>
                    <OptionsList selectedItem={selectedRoom} setSelectedItem={setSeletedRoom} itemsList={rooms}/>
                    <OptionsList selectedItem={selectedDay} setSelectedItem={setSelectedDay} itemsList={daysList}/>
                    <OptionsList selectedItem={selectedSlot} setSelectedItem={setSelectedSlot} itemsList={slots}/>
                  </form>

                  <div className="mt-4 flex flex-wrap gap-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
                      onClick={() => {editSchedule(); closeEditModal()}}
                    >
                      Edit Schedule
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeEditModal}
                    >
                      Cancel
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
  )
}

export default EditSchedule