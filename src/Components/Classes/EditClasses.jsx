import React,{Fragment, useEffect, useState} from 'react'
import { Dialog, Transition } from '@headlessui/react'
import axios from 'axios'

const EditClasses = (props) => {
    const {isEditPopOpen, closeEditModal, class_name, class_} = props
    const [className, setClassName] = useState(class_name)
    const [classCrName, setClassCrName] = useState(class_["cr_name"])
    const [strength , setStrength] = useState('')
    
    useEffect(()=> {
        setClassName(class_name)
        setClassCrName(class_["cr_name"])
        setStrength(class_["strength"])
    },[class_name, class_])
    async function editClass(){
        try{
            await axios.post('http://127.0.0.1:5000/editClass',{
                'class_name' : className,
                'old_class_name' : class_name,
                'strength' : strength,
                'cr_name' : classCrName
            })
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
                    Edit Class
                  </Dialog.Title>
                  <form className="mt-2 flex flex-col gap-4">
                    <input type="text" className='mt-2 border rounded p-2 border-gray-300 w-full' placeholder='Class Name' onChange={(e) => setClassName(e.target.value)} value={className}/>
                    <input type="text" className='mt-2 border rounded p-2 border-gray-300 w-full' placeholder='Cr Name' onChange={(e) => setClassCrName(e.target.value)} value={classCrName}/>
                    <input type="text" className='mt-2 border rounded p-2 border-gray-300 w-full' placeholder='Strength' onChange={(e) => setStrength(e.target.value)} value={strength}/>
                    
                  </form>

                  <div className="mt-4 flex flex-wrap gap-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
                      onClick={() => {editClass(); closeEditModal()}}
                    >
                      Edit Class
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

export default EditClasses