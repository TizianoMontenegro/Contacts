import { useEffect, useRef, useState } from 'react'
import './App.css'
import ContactTable from './components/contact-table/ContactTable'
import ContactForm from './components/contact-form/ContactForm'

function App() {
  // const [contacts, setContacts] = useState([{"id": 1, "firstName": "John", "lastName": "Nale", "email": "johnnale@example.com"}])
  const [contacts, setContacts] = useState([])

  const fetchContacts = async () => {
    const response = await fetch("http://127.0.0.1:5000/contacts")
    const data = await response.json()
    setContacts(data.contacts)
    // console.log(data)
  }

  useEffect(() => {
    fetchContacts()
  }, [])

  // const [currentContact, setCurrentContact] = useState({firstName:"Flaudio", lastName:"Reves","email":"flau@sadfjkl.com"})
  const [currentContact, setCurrentContact] = useState({})

  const dialogRef = useRef<HTMLDialogElement | null>(null)
  const openDialog = () => {
    dialogRef.current?.showModal()
  }
  const closeDialog = () => {
    setCurrentContact({})
    dialogRef.current?.close()
  }

  const openUpdateDialog = (contact: any) => {
    if (dialogRef.current?.open) return
    setCurrentContact({})
    setCurrentContact(contact)
    dialogRef.current?.showModal()
    console.log(contact)
  }

  const onUpdating = () => {
    if (dialogRef.current?.open) {
      closeDialog()
    }
    fetchContacts()
  }

  return (
    <>
      <ContactTable contacts={contacts} updateContact={openUpdateDialog} updateCallback={onUpdating} />
      <button onClick={openDialog}>Create Contact</button>
      {/* Dialog Element */}
      <dialog ref={dialogRef} onClose={closeDialog}>
        <form method='dialog'>
          <button>x</button>
        </form>
        <ContactForm existingContact={currentContact} updateCallback={onUpdating} />
      </dialog>
    </>
  )
}

export default App
