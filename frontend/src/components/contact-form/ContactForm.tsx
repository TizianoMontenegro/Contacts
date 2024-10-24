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
    const emailValidation = validateContactForm("Email", emailValue, 10, 40, true)

    if (firstNameValidation || lastNameValidation || emailValidation) {
      return alert(`
        ${firstNameValidation !== undefined ? firstNameValidation : "\n"}
        ${lastNameValidation !== undefined ? lastNameValidation : "\n"}
        ${emailValidation !== undefined ? emailValidation : "\n"}
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
      <h3 className="contact-title">{updating ? "Update Contact" : "Create Contact"}</h3>
      <form className="contact-form" onSubmit={onSubmitHandler}>
        <div className="contact-form__section">
            <label className="contact-form__label" htmlFor="firstName">First Name</label>
            <input 
                className="contact-form__field"
                {...firstName}
                type="text" 
                name="firstName" 
                id="firstName" 
                placeholder={existingContact.firstName ? existingContact.firstName : "Enter first name"}
            />
        </div>
        
        <div className="contact-form__section">
            <label className="contact-form__label" htmlFor="lastName">Last Name</label>
            <input 
                className="contact-form__field"
                {...lastName}
                type="text" 
                name="lastName" 
                id="lastName" 
                placeholder={existingContact.lastName? existingContact.lastName : "Enter last name"}
            />
        </div>
        
        <div className="contact-form__section">
            <label className="contact-form__label" htmlFor="email">Email</label>
            <input 
                className="contact-form__field"
                {...email}
                type="text" 
                name="email" 
                id="email" 
                placeholder={existingContact.email ? existingContact.email : "Enter the email"}
            />
        </div>

        <div className="contact-form__section">
            <button 
                className="contact-form__field contact-form__field--submit" 
                type="submit"
            >
              {updating ? "Update Contact" : "Create Contact"}
            </button>
        </div>
      </form>
    </> 
    
}

export default ContactForm