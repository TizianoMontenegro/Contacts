import { FormEvent } from "react";
import "./ContactForm.css"
import { createOrUpdateFromDB } from "../../funcs/back-petitions";
import useInputForm from "../../hooks/useInputForm";

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

        const valueConditions = {
            valuesDoesNotExists: !firstNameValue || 
                !lastNameValue || 
                !emailValue,
            valuesContainsSpaces: firstNameValue.includes(" ") || 
                lastNameValue.includes(" ") || 
                emailValue.includes(" "),
            valuesMinLength: firstNameValue.length < 3 ||
                lastNameValue.length < 3 ||
                emailValue.length < 10,
            valuesMaxLength: firstNameValue.length > 30 ||
                lastNameValue.length > 30 ||
                emailValue.length > 80,
        }
        const valueConditions2 = {
            valuesDoesNotExists: {
                forFirstName: !firstNameValue, 
                forLastName: !lastNameValue,
                forEmail: !emailValue,
            },
            valuesContainsSpaces: {
                forFirstName: firstNameValue.includes(" "),
                forLastName: lastNameValue.includes(" "),
                forEmail: emailValue.includes(" "),
            },
            valuesMinLength: {
                forFirstName: firstNameValue.length < 3,
                forLastName: lastNameValue.length < 3,
                forEmail: emailValue.length < 10,
            },
            valuesMaxLength: {
                forFirstName: firstNameValue.length > 30,
                forLastName: lastNameValue.length > 30,
                forEmail: emailValue.length > 80,
            }
        }
        // function getValueResponse(action: string) {}
        const valueResponses = {
            valuesDoesNotExists: {
                forFirstName: "The First Name field can't be empty",
                forLastName: "The Last Name field can't be empty",
                forEmail: "The Email field can't be empty",
            },
            valuesContainsSpaces: {
                forFirstName: "The First Name field can't has white spaces",
                forLastName: "The Last Name field can't has white spaces",
                forEmail: "The Email field can't has white spaces",
            },
            valuesMinLength: {
                forFirstName: "First Name field does not reach the min length (3 characters)",
                forLastName: "Last Name field does not reach the min length (3 characters)",
                forEmail: "Email field does not reach the min length (10 characters)",
            },
            valuesMaxLength: {
                forFirstName: "First Name field exceeds the max length (30 characters)",
                forLastName: "Last Name field exceeds the max length (30 characters)",
                forEmail: "Email field exceeds the max length (80 characters)",
            },
        }
        if (valueConditions.valuesDoesNotExists) return alert(valueResponses.valuesDoesNotExists)
        if (valueConditions.valuesContainsSpaces) return alert(valueResponses.valuesContainsSpaces)
        if (valueConditions.valuesMinLength) return alert(valueResponses.valuesMinLength)
        if (valueConditions.valuesMaxLength) return alert(valueResponses.valuesMaxLength)

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