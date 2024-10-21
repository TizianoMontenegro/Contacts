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
      <p>Don't have contacts ;(</p>
    )
  }
  return <div>
    <h2>Contacts</h2>
    <table>
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {contacts.map((contact: any) => (
            <tr key={contact.id}>
              <td>{contact.firstName}</td>
              <td>{contact.lastName}</td>
              <td>{contact.email}</td>
              <td>
                <button onClick={() => updateContact(contact)}>Update</button>
                <button onClick={() => onDelete(contact.id)}>Delete</button>
              </td>
            </tr>
        ))}
      </tbody>
    </table>
  </div>
}

export default ContactTable