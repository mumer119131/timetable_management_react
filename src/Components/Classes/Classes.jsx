import axios from 'axios'
import React, { useEffect, useState } from 'react'
import DeletePopup from '../HeadlessUi/DeletePopup'
import AddClass from './AddClass'
import EditClasses from './EditClasses'

const Classes = () => {

  const [classes, setClasses] = useState({})
  const tableTitles = ['Name', 'Cr Name', 'Strength','Edit', 'Delete']
  const [classToDelete, setClassToDelete] = useState('')
  const [isDeletePopOpen, setIsDeletePopOpen] = useState(false)
  const [classToEdit, setClassToEdit] = useState('')
  const [isEditPopOpen, setIsEditPopOpen] = useState(false)
  const [isAddPopOpen, setIsAddPopOpen] = useState(false)
  function closeDeleteModal() {
    setIsDeletePopOpen(false)
  }
  function closeEditModal(){
    setIsEditPopOpen(false)
  }
  function closeAddModal(){
    setIsAddPopOpen(false)
  }
  async function deleteClass(){
    closeDeleteModal()
    try {
      await axios.post('http://127.0.0.1:5000/deleteClass',{
        "class_name" : classToDelete
      })
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(()=>{

    async function getClasses(){
      try{
        const response = await axios.get('http://127.0.0.1:5000/allClasses')
        setClasses(response.data)
      }catch(error){
        console.log(error);
      }
    }

    getClasses()
  },[isDeletePopOpen, isEditPopOpen, isAddPopOpen])
  return (
    <>
    <DeletePopup isDeletePopOpen={isDeletePopOpen} closeDeleteModal={closeDeleteModal} deleteFunc={deleteClass}/>
    <AddClass isAddPopOpen={isAddPopOpen} closeAddModal={closeAddModal}/>
    {classToEdit ? <EditClasses isEditPopOpen={isEditPopOpen} closeEditModal={closeEditModal} class_={classes[classToEdit]} class_name={classToEdit} />  : null}
      <div className="text-right px-8 mt-4">
      <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
                      onClick={()=> setIsAddPopOpen(true)}
                    >
                      Add Class
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
                  {Object.keys(classes).map((class_, index)=>{
                    const {cr_name ,strength} = classes[class_]
                    return <tr className="border-b" key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-thin">
                          {class_}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-thin">
                          {cr_name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-thin">
                          {strength}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-green-700 font-thin cursor-pointer hover:underline" onClick={()=> {setIsEditPopOpen(true); setClassToEdit(class_)}}>
                          Edit
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-thin text-red-600 hover:underline cursor-pointer" onClick={()=> {setIsDeletePopOpen(true); setClassToDelete(class_)}} >
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
  )
}

export default Classes