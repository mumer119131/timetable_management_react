import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import {AiOutlineCheck } from 'react-icons/ai'
import {GrFormClose} from 'react-icons/gr'
import DeletePopup from "../HeadlessUi/DeletePopup";
import AddRoomPopup from "./AddRoomPopup";
import EditRoomPopup from "./EditRoomPopup";
import { LoadingContext } from "../../App";
const Rooms = () => {
  const setIsLoading = useContext(LoadingContext)
  const [rooms, setRooms] = useState({});
  const [isDeletePopOpen, setIsDeletePopOpen] = useState(false)
  const [isAddPopOpen, setIsAddPopOpen] = useState(false)
  const [isEditPopOpen, setIsEditPopOpen] = useState(false)
  const [roomToDelete, setRoomToDelete] = useState([])
  const [roomToEdit, setRoomToEdit] = useState('')
  const tableTitles = ["Name", "Floor", "Projector", "Size", "Type"];
  
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
      await axios.post("https://timetable-management-api.vercel.app/deleteRoom",{
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
        setIsLoading(true)
        const roomsData = await axios.get("https://vercel.com/mumer119131/timetable-management-api/getAllRooms");
        setIsLoading(false)
        setRooms(roomsData.data);
      } catch (error) {
        console.log(error);
      }
    }
    getRooms();
  }, [isAddPopOpen, isEditPopOpen, isDeletePopOpen, setIsLoading]);
  return (
    <>
      <DeletePopup isDeletePopOpen={isDeletePopOpen} closeDeleteModal={closeDeleteModal} deleteFunc={deleteRoom}/>
      <AddRoomPopup isAddPopOpen={isAddPopOpen} closeAddModal={closeAddModal}/>
      {roomToEdit ? <EditRoomPopup isEditPopOpen={isEditPopOpen} closeEditModal={closeEditModal} room={rooms[roomToEdit[1]]} room_name={roomToEdit} /> : null}
      <div className="text-right px-8 mt-4">
      <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
                      onClick={()=> setIsAddPopOpen(true)}
                    >
                      Add Room
                    </button>
      </div>
      {Object.keys(rooms).map((floors, ind)=>{
        const floor_rooms = rooms[floors]
        return (

        <div key={ind}>
          <h2 className="text-2xl text-cyan-600 text-center">{floors} Floor</h2>
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
                  {Object.keys(floor_rooms).map((room, index)=>{
                    const {floor, projector, size, type} = floor_rooms[room]
                    return <tr className={(index % 2===0 ? "bg-slate-200 " : "")+"border-b hover:bg-slate-300 group ease-in duration-300"} key={index}s>
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
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-green-700 font-thin cursor-pointer hover:underline hidden group-hover:table-cell w-10" onClick={()=> {setIsEditPopOpen(true); setRoomToEdit([room, floors])}}>
                        <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-green-100 px-6 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
                          >
                      Edit
                    </button>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-thin text-red-600 hover:underline cursor-pointer hidden group-hover:table-cell w-10" onClick={()=> {setIsDeletePopOpen(true); setRoomToDelete(room)}} >
                        <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-6 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
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
        </div>
        )
      })}
    </>
  );
};

export default Rooms;
