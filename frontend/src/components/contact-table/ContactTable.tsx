// import React from 'react'
import { deleteRecordFromDBById } from "../../funcs/back-petitions"
import "./ContactTable.css"

const ContactTable = ({ contacts, updateContact, updateCallback }: any) => {
  async function onDelete(id: number) {
    const response = await deleteRecordFromDBById(id)
    // alert(`message: ${response.message}\nstatus code: ${response.status}`)
    if (response.status == 200) {
      updateCallback()
    }else {
      alert(response.message)
    }
  }
  
  if (contacts.length == 0) {
    return (
      <p className="fallback-text">Don't have contacts ;(</p>
    )
  }
  return <table className="table">
    <thead>
      <tr>
        <th className="table__header">First Name</th>
        <th className="table__header">Last Name</th>
        <th className="table__header">Email</th>
        <th className="table__header">Actions</th>
      </tr>
    </thead>
    <tbody>
      {contacts.map((contact: any) => (
          <tr key={contact.id}>
            <td className="table__data">{contact.firstName}</td>
            <td className="table__data">{contact.lastName}</td>
            <td className="table__data">{contact.email}</td>
            <td className="table__data table__data--actions">
              <button 
                className="table__actions" 
                onClick={() => updateContact(contact)}
              >
                Update
              </button>
              <button 
                className="table__actions" 
                onClick={() => onDelete(contact.id)}
              >
                Delete
              </button>
            </td>
          </tr>
      ))}
    </tbody>
  </table>
}

export default ContactTable