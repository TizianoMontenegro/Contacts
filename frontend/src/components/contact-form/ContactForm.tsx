import { FormEvent } from "react";
import "./ContactForm.css"
import { createOrUpdateFromDB } from "../../funcs/back-petitions";
import useInputForm from "../../hooks/useInputForm";
import { validateContactForm } from "../../funcs/form-validations";

const ContactForm = ({existingContact = {}, updateCallback}: any) => {
  const updating = Object.entries(existingContact).length !== 0

  const firstName = useInputForm(existingContact, existingContact.firstName, updating)
  const lastName = useInputForm(existingContact, existingContact.lastName, updating)
  const email = useInputForm(existingContact, existingContact.email, updating)

  // console.log(firstName,lastName,email)
  // console.log(existingContact.firstName, existingContact.lastName, existingContact.email)
  
  const onSubmitHandler = async (e: FormEvent) => {
    e.preventDefault()
    const firstNameValue = firstName.value;
    const lastNameValue = lastName.value;
    const emailValue = email.value;
    
    const firstNameValidation = validateContactForm("First Name", firstNameValue, 3, 10)
    const lastNameValidation = validateContactForm("Last Name", lastNameValue, 3, 10)
    const emailValidation = validateContactForm("Email", emailValue, 10, 40)

    if (firstNameValidation || lastNameValidation || emailValidation) {
      return alert(`
        - ${firstNameValidation !== undefined ? firstNameValidation: "\n"}
        - ${lastNameValidation !== undefined ? lastNameValidation: "\n"}
        - ${emailValidation !== undefined ? emailValidation: "\n"}
      `)
    }

    const data = {
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value
    }
    const response = await createOrUpdateFromDB(data, updating, existingContact.id)
    if (response.status == 201 || response.status == 200) {
      updateCallback()
    } else {
      alert(response.message)
    }
  }

    return <>
        <h2>{updating ? "Update Contact" : "Create Contact"}</h2>
        <form onSubmit={onSubmitHandler} className="contact-form">
            <fieldset>
                <legend>Contact Form</legend>
                <div className="contact-form__section">
                    <label htmlFor="firstName">First Name</label>
                    <input 
                        // onChange={e => setFirstName(e.target.value)} 
                        // value={firstName} 
                        {...firstName}
                        type="text" 
                        name="firstName" 
                        id="firstName" 
                        placeholder={existingContact.firstName}
                    />
                </div>
                
                <div className="contact-form__section">
                    <label htmlFor="lastName">Last Name</label>
                    <input 
                        // onChange={e => setLastName(e.target.value)} 
                        // value={lastName} 
                        {...lastName}
                        type="text" 
                        name="lastName" 
                        id="lastName" 
                        placeholder={existingContact.lastName}
                    />
                </div>
                
                <div className="contact-form__section">
                    <label htmlFor="email">Email</label>
                    <input 
                        // onChange={e => setEmail(e.target.value)} 
                        // value={email} 
                        {...email}
                        type="text" 
                        name="email" 
                        id="email" 
                        placeholder={existingContact.email}
                    />
                </div>

                <div className="contact-form__section">
                    <button type="submit">{updating ? "Update Contact" : "Create Contact"}</button>
                </div>
            </fieldset>
        </form>
    </> 
    
}

export default ContactForm