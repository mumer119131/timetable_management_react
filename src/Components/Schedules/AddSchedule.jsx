import React, {useState, Fragment, useContext, useEffect} from 'react'
import {SlotsContext} from '../../App'
import { Dialog, Transition } from '@headlessui/react'
import OptionsList from '../HeadlessUi/OptionsList'
import axios from 'axios'
import { toast } from 'react-toastify'

const AddSchedule = (props) => {
    const slots = useContext(SlotsContext)
    const {isAddPopOpen, closeAddModal} = props
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday","Friday","Saturday"]
    const [classesList, setClassesList] = useState([])
    const [floorsList, setFloorsList] = useState([])
    const [roomsList, setRoomsList] = useState([])
    const [courseCode, setCourseCode] = useState('')
    const [teacherName, setTeacherName] = useState('')
    const [selectedClassName, setSelectedClassName] = useState('Class')
    const [selectedFloor, setSelectedFloor] = useState('Floor')
    const [selectedRoom, setSelectedRoom] = useState('Room')
    const [selectedDay, setSelectedDay] = useState(days[new Date().getDay()])
    const [selectedSlot, setSelectedSlot] = useState(slots[0])

    const [floors, setFloors] = useState({})
    function setRooms(){
        try{
            if (selectedFloor == 'Floor'){
                return
            }else{
                setRoomsList(Object.keys(floors[selectedFloor]))
            }
        }catch(error){
            console.log(error);
        }
    }
    useEffect(()=>{
        
        async function getAllFloors(){
            try{
                const response = await axios.get("http://127.0.0.1:5000/getAllRooms")
                setFloors(response.data)
                setFloorsList(Object.keys(response.data))
            }catch(error){
                console.log(error)
            }
        }
        async function getClasses(){
            try {
                const response = await axios.get("http://127.0.0.1:5000/allClasses")
                setClassesList(Object.keys(response.data))
            } catch (error) {
                console.log(error)
            }
        }
        setRooms()
        getAllFloors()
        getClasses()
    },[])
    useEffect(()=>{
        setRooms()
    },[selectedFloor])
    async function addSchedule(){
        try{
            if(!courseCode || !teacherName || selectedClassName=='Class' || selectedFloor=='Floor' || selectedRoom == 'Room'){
                toast.error("Enter required fields")
                return
            }
            const response = await axios.post("http://127.0.0.1:5000/addSchedule",{
                "class_name" : selectedClassName,
                "room_name" : selectedRoom,
                "day" : selectedDay,
                "time" : selectedSlot,
                "course_code" : courseCode,
                "floor" : selectedFloor,
                "teacher_name" : teacherName
            })
            toast.info(response.data.message)
        }catch(error){
            console.log(error);
        }
        closeAddModal()
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
                    <input type="text" className='mt-2 border-2 rounded p-2 border-gray-500 w-full' placeholder='Course Code' onChange={(e) => setCourseCode(e.target.value)} value={courseCode}/>
                    <input type="text" className='mt-2 border-2 rounded p-2 border-gray-500 w-full' placeholder='Teacher Name' onChange={(e) => setTeacherName(e.target.value)} value={teacherName}/>
                    <OptionsList selectedItem={selectedFloor} setSelectedItem={setSelectedFloor} itemsList={floorsList}/>
                    <OptionsList selectedItem={selectedClassName} setSelectedItem={setSelectedClassName} itemsList={classesList}/>
                    <OptionsList selectedItem={selectedRoom} setSelectedItem={setSelectedRoom} itemsList={roomsList}/>
                    <OptionsList selectedItem={selectedDay} setSelectedItem={setSelectedDay} itemsList={days}/>
                    <OptionsList selectedItem={selectedSlot} setSelectedItem={setSelectedSlot} itemsList={slots}/>
                  </form>

                  <div className="mt-4 flex flex-wrap gap-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
                      onClick={() => {addSchedule(); }}
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