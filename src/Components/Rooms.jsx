import React, { useEffect, useState, Fragment } from "react";
import axios from "axios";
import {AiOutlineCheck } from 'react-icons/ai'
import {GrFormClose} from 'react-icons/gr'
import { Dialog, Transition } from '@headlessui/react'
const Rooms = () => {
  const [rooms, setRooms] = useState({});
  let [isDeletePopOpen, setIsDeletePopOpen] = useState(false)
  const [roomToDelete, setRoomToDelete] = useState('')
  const tableTitles = ["Name", "Floor", "Projector", "Size", "Type", "Edit", "Delete"];
  function closeModal() {
    setIsDeletePopOpen(false)
  }
  async function deleteRoom(){
    closeModal()
    try{
      const response = await axios.post("http://127.0.0.1:5000/deleteRoom",{
        'room_name' : roomToDelete
      })
      delete rooms.roomToDelete
    }catch(error){
      console.log(error);
    }
  }
  useEffect(() => {
    async function getRooms() {
      try {
        const roomsData = await axios.get("http://127.0.0.1:5000/getAllRooms");
        setRooms(roomsData.data);
      } catch (error) {
        console.log(error);
      }
    }
    getRooms();
  }, [rooms]);
  return (
    <>
      <Transition appear show={isDeletePopOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Delete
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Are you sure to delete?
                    </p>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-red-400 px-6 py-2 text-sm font-medium text-red-900 hover:bg-red-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={deleteRoom}
                    >
                      Yes
                    </button>
                    <button
                      type="button"
                      className="inline-flex ml-4 justify-center rounded-md border border-transparent bg-blue-100 px-6 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      No
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      <div className="text-right px-8 mt-4">
        <button className="bg-cyan-600 px-4 text-white py-2 rounded shadow-lg hover:shadow-xl">Add Room</button>
      </div>
      <div className="flex flex-col p-8">
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
                  {Object.keys(rooms).map((room, index)=>{
                    const {floor, projector, size, type} = rooms[room]
                    return <tr className="border-b" key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-thin">
                          {room}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-thin">
                          {floor}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-thin">
                          {projector ? <AiOutlineCheck /> : <GrFormClose />}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-thin">
                          {size}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-thin">
                          {type}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-green-700 font-thin cursor-pointer hover:underline">
                          Edit
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-thin text-red-600 hover:underline cursor-pointer" onClick={(e)=> {setIsDeletePopOpen(true); setRoomToDelete(room)}} >
                          Delete
                        </td>
                  </tr>
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Rooms;
