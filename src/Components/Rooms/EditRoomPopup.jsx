import React,{Fragment, useEffect, useState} from 'react'
import { Dialog, Transition } from '@headlessui/react'
import OptionsList from '../HeadlessUi/OptionsList'
import SwitchToggle from '../HeadlessUi/SwitchToggle'
import axios from 'axios'
import { toast } from 'react-toastify'
const EditRoomPopup = (props) => {
    const floorsList = ['Ground', '1st', '2nd', '3rd', '4th']
    const roomTypes = ['Room', 'Lab']
    const RoomSizes = ['Large', 'Small', 'Medium']
    const {isEditPopOpen, closeEditModal, room_name, room} = props
    const [roomName, setRoomName] = useState(room_name[0])
    const [oldFloorName, setOldFloorName] = useState(room_name[1])
    const [selectedFloor, setSelectedFloor] = useState(room[room_name[0]]['floor'])
    const [selectedType, setSelectedType] = useState(room[room_name[0]]['type'])
    const [isProjector, setProjecter] = useState(room[room_name[0]]['projector'])
    const [selectedSize, setSelectedSize] = useState(room[room_name[0]]['size'])
    
    useEffect(()=>{
        setSelectedFloor(room[room_name[0]]['floor'])
        setSelectedType(room[room_name[0]]['type'])
        setSelectedSize(room[room_name[0]]['size'])
        setProjecter(room[room_name[0]]['projector'])
        setRoomName(room_name[0])
        setOldFloorName([room_name[1]])
    },[room_name, room])
    async function editRoom(){
        try{
           if(!roomName){
            toast.error("Enter Room Name")
            return
           }
            const response = await axios.post('https://vercel.com/mumer119131/timetable-management-api/editRoom',{
                'old_room_name' : room_name[0],
                'room_name' : roomName,
                'type' : selectedType,
                'size' : selectedSize,
                'projector' : isProjector,
                'floor' : selectedFloor,
                'old_floor' : oldFloorName[0]
            })
            toast.info(response.data.message)
            closeEditModal()
        }catch(error){
            console.log(error)
        }
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
                    Edit Room
                  </Dialog.Title>
                  <form className="mt-2 flex flex-col gap-4">
                    <input type="text" className='mt-2 border-2 rounded p-2 border-gray-500 w-full' placeholder='Room Name' onChange={(e) => setRoomName(e.target.value)} value={roomName}/>
                    <OptionsList selectedItem={selectedFloor} setSelectedItem={setSelectedFloor} itemsList={floorsList}/>
                    <OptionsList selectedItem={selectedType} setSelectedItem={setSelectedType} itemsList={roomTypes}/>
                    <OptionsList selectedItem={selectedSize} setSelectedItem={setSelectedSize} itemsList={RoomSizes}/>
                    <div className='flex items-center gap-2 flex-wrap'>
                      <p>Is Projector Available?</p>
                      <SwitchToggle enabled={isProjector} setEnabled={setProjecter}/>
                    </div>
                  </form>

                  <div className="mt-4 flex flex-wrap gap-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
                      onClick={() => {editRoom(); }}
                    >
                      Edit Room
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

export default EditRoomPopup