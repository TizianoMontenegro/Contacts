import { useState, useEffect, ChangeEvent } from "react";

export default function useInputForm(existingObject = {}, existingValue: string, updating: boolean = false) {
    const [value, setValue] = useState(existingValue || "");

    useEffect(() => {
        if (updating) {
            setValue(existingValue);
            return
        };
        setValue("");
    }, [existingObject]);

    function handleValue(event: ChangeEvent<HTMLInputElement>) {
        setValue(event.target.value);
    };

    return {value, onChange: handleValue};
};


// DEFAUL CODE FOR DO THE SAME THING THAT AT THE TOP
// const [firstName, setFirstName] = useState(existingContact.firstName || "")
// const [lastName, setLastName] = useState(existingContact.lastName || "")
// const [email, setEmail] = useState(existingContact.email || "")

// useEffect(() => {
//     setFirstName("")
//     setLastName("")
//     setEmail("")
//     if (updating) {
//         setFirstName(existingContact.firstName)
//         setLastName(existingContact.lastName)
//         setEmail(existingContact.email)
//     }
// }, [existingContact])