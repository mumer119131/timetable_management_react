import React, { useEffect, useState } from "react";
import axios from "axios";
import {AiOutlineCheck } from 'react-icons/ai'
import {GrFormClose} from 'react-icons/gr'
import DeletePopup from "../HeadlessUi/DeletePopup";
import AddRoomPopup from "./AddRoomPopup";
import EditRoomPopup from "./EditRoomPopup";
const Rooms = () => {
  const [rooms, setRooms] = useState({});
  const [isDeletePopOpen, setIsDeletePopOpen] = useState(false)
  const [isAddPopOpen, setIsAddPopOpen] = useState(false)
  const [isEditPopOpen, setIsEditPopOpen] = useState(false)
  const [roomToDelete, setRoomToDelete] = useState('')
  const [roomToEdit, setRoomToEdit] = useState('')
  const tableTitles = ["Name", "Floor", "Projector", "Size", "Type", "Edit", "Delete"];
  
  function closeDeleteModal() {
    setIsDeletePopOpen(false)
  }
  function closeAddModal() {
    setIsAddPopOpen(false)
  }
  function closeEditModal() {
    setIsEditPopOpen(false)
  }


  async function deleteRoom(){
    closeDeleteModal()
    try{
      await axios.post("http://127.0.0.1:5000/deleteRoom",{
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
  }, []);
  return (
    <>
      <DeletePopup isDeletePopOpen={isDeletePopOpen} closeDeleteModal={closeDeleteModal} deleteFunc={deleteRoom}/>
      <AddRoomPopup isAddPopOpen={isAddPopOpen} closeAddModal={closeAddModal}/>
      {roomToEdit ? <EditRoomPopup isEditPopOpen={isEditPopOpen} closeEditModal={closeEditModal} room={rooms[roomToEdit]} room_name={roomToEdit} /> : null}
      <div className="text-right px-8 mt-4">
      <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
                      onClick={()=> setIsAddPopOpen(true)}
                    >
                      Add Room
                    </button>
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
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-green-700 font-thin cursor-pointer hover:underline" onClick={()=> {setIsEditPopOpen(true); setRoomToEdit(room)}}>
                          Edit
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-thin text-red-600 hover:underline cursor-pointer" onClick={()=> {setIsDeletePopOpen(true); setRoomToDelete(room)}} >
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
