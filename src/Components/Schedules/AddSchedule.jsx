import React, { Fragment, useContext, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import OptionsList from '../HeadlessUi/OptionsList'
import { SlotsContext } from '../../App'
import axios from 'axios'
import { toast } from 'react-toastify'

const AddSchedule = (props) => {

  const {isAddPopOpen, closeAddModal} = props
  const [classes, setClasses] = useState(['- Select Class -'])
  const [rooms, setRooms] = useState(['- Select Room -'])
  const daysList = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  const slots = useContext(SlotsContext)
  const [selectedClass, setSelectedClass] = useState(classes[0])
  const [selectedRoom, setSeletedRoom] = useState(rooms[0])
  const [selectedDay, setSelectedDay] = useState(daysList[0])
  const [selectedSlot, setSelectedSlot] = useState(slots[0])
  const [courseCode, setCourseCode] = useState('')
  useState(()=>{
    async function getRoomsAndClasses(){
        console.log('called')
        try {
            const response = await axios.get('http://127.0.0.1:5000/getAllRooms')
            setRooms(Object.keys(response.data))
            console.log(classes);
            const classesResponse = await axios.get('http://127.0.0.1:5000/allClasses')
            setClasses(Object.keys(classesResponse.data))
        } catch (error) {
            console.log(error)
        }
    }
    getRoomsAndClasses()
  })
  async function addSchedule(){
    
      try{
          if(!courseCode || selectedClass.match(/- Class -/g) || selectedRoom.match(/- Room-/g)){
            toast.error("Enter required fields")
            return
          }
          const response = await axios.post("http://127.0.0.1:5000/addSchedule", {
              "class_name" : selectedClass,
              "room_name" : selectedRoom,
              "day" : selectedDay,
              "time" : selectedSlot,
              "course_code" : courseCode
            })
            toast.info(response.data.message)
            closeAddModal()
    }catch(error){
        console.log(error)
    }

  }
  return (
    <Transition appear show={isAddPopOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeAddModal}>
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
                    Add a new Schedule
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
                      onClick={() => {addSchedule();}}
                    >
                      Add Schedule
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeAddModal}
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

export default AddSchedule