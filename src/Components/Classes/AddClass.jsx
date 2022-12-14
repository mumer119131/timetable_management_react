import React, {useState, Fragment} from 'react'
import { Dialog, Transition } from '@headlessui/react'
import axios from 'axios'
import { toast } from 'react-toastify'


const AddClass = (props) => {
    const {isAddPopOpen, closeAddModal} = props
    const [className, setClassName] = useState('')
    const [classCrName, setClassCrName] = useState('')
    const [strength , setStrength] = useState('')
    async function addClass(){
        try{
            if(!className || !classCrName || !strength){
              toast.error('Enter required fields')
              return
            }
            let response = await axios.post('https://timetable-management-api.vercel.app/addClass',{
              "class_name" : className,
              "cr_name" : classCrName,
              "strength" : strength,
            })
            toast.info(response.data.message)
            closeAddModal()
          }catch(error){
            console.log(error);
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
                    Add Class
                  </Dialog.Title>
                  <form className="mt-2 flex flex-col gap-4">
                    <input type="text" className='mt-1 border rounded p-2 border-gray-300 w-full' placeholder='Class Name' onChange={(e) => setClassName(e.target.value)} value={className}/>
                    <input type="text" className='mt-1 border rounded p-2 border-gray-300 w-full' placeholder='CR Name' onChange={(e) => setClassCrName(e.target.value)} value={classCrName}/>
                    <input type="number" className='mt-1 border rounded p-2 border-gray-300 w-full' placeholder='Strength' onChange={(e) => setStrength(e.target.value)} value={strength}/>
                    
                  </form>

                  <div className="mt-4 flex flex-wrap gap-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
                      onClick={() => {addClass();}}
                    >
                      Add Class
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

export default AddClass