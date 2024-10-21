export function validateContactForm(
  fieldName: string,
  field: string,
  min: number = 3,
  max: number = 20
) {
  const valueConditions = {
    valuesDoesNotExists: !field,
    valuesContainsSpaces: field.includes(" "),
    valuesMinLength: field.length < min,
    valuesMaxLength: field.length > max,
  };
  
  const valueResponses = {
    valuesDoesNotExists: `The ${fieldName} field can't be empty`,
    valuesContainsSpaces: `The ${fieldName} field can't has white spaces`,
    valuesMinLength: `${fieldName} field does not reach the min length (${min} characters)`,
    valuesMaxLength: `${fieldName} field exceeds the max length (${max} characters)`,
  };

  if (valueConditions.valuesDoesNotExists)
    return valueResponses.valuesDoesNotExists;
  else if (valueConditions.valuesContainsSpaces)
    return valueResponses.valuesContainsSpaces;
  else if (valueConditions.valuesMinLength)
    return valueResponses.valuesMinLength;
  else if (valueConditions.valuesMaxLength)
    return valueResponses.valuesMaxLength;
}






// const valueConditions = {
//   valuesDoesNotExists: {
//       forFirstName: !firstNameValue, 
//       forLastName: !lastNameValue,
//       forEmail: !emailValue,
//   },
//   valuesContainsSpaces: {
//       forFirstName: firstNameValue.includes(" "),
//       forLastName: lastNameValue.includes(" "),
//       forEmail: emailValue.includes(" "),
//   },
//   valuesMinLength: {
//       forFirstName: firstNameValue.length < 3,
//       forLastName: lastNameValue.length < 3,
//       forEmail: emailValue.length < 10,
//   },
//   valuesMaxLength: {
//       forFirstName: firstNameValue.length > 30,
//       forLastName: lastNameValue.length > 30,
//       forEmail: emailValue.length > 80,
//   }
// }
// // function getValueResponse(action: string) {}
// const valueResponses = {
//   valuesDoesNotExists: {
//       forFirstName: "The First Name field can't be empty",
//       forLastName: "The Last Name field can't be empty",
//       forEmail: "The Email field can't be empty",
//   },
//   valuesContainsSpaces: {
//       forFirstName: "The First Name field can't has white spaces",
//       forLastName: "The Last Name field can't has white spaces",
//       forEmail: "The Email field can't has white spaces",
//   },
//   valuesMinLength: {
//       forFirstName: "First Name field does not reach the min length (3 characters)",
//       forLastName: "Last Name field does not reach the min length (3 characters)",
//       forEmail: "Email field does not reach the min length (10 characters)",
//   },
//   valuesMaxLength: {
//       forFirstName: "First Name field exceeds the max length (30 characters)",
//       forLastName: "Last Name field exceeds the max length (30 characters)",
//       forEmail: "Email field exceeds the max length (80 characters)",
//   },
// }
// // if (valueConditions.valuesDoesNotExists) return alert(valueResponses.valuesDoesNotExists)
// // if (valueConditions.valuesContainsSpaces) return alert(valueResponses.valuesContainsSpaces)
// // if (valueConditions.valuesMinLength) return alert(valueResponses.valuesMinLength)
// // if (valueConditions.valuesMaxLength) return alert(valueResponses.valuesMaxLength)

// if (valueConditions.valuesDoesNotExists.forFirstName) return alert(valueResponses.valuesDoesNotExists.forFirstName)
// else if (valueConditions.valuesDoesNotExists.forLastName) return alert(valueResponses.valuesDoesNotExists.forLastName)
// else if (valueConditions.valuesDoesNotExists.forEmail) return alert(valueResponses.valuesDoesNotExists.forEmail)

// if (valueConditions.valuesContainsSpaces.forFirstName) return alert(valueResponses.valuesContainsSpaces.forFirstName)
// else if (valueConditions.valuesContainsSpaces.forLastName) return alert(valueResponses.valuesContainsSpaces.forLastName)
// else if (valueConditions.valuesContainsSpaces.forEmail) return alert(valueResponses.valuesContainsSpaces.forEmail)

// if (valueConditions.valuesMinLength.forFirstName) return alert(valueResponses.valuesMinLength.forFirstName)
// else if (valueConditions.valuesMinLength.forLastName) return alert(valueResponses.valuesMinLength.forLastName)
// else if (valueConditions.valuesMinLength.forEmail) return alert(valueResponses.valuesMinLength.forEmail)

// if (valueConditions.valuesMaxLength.forFirstName) return alert(valueResponses.valuesMaxLength.forFirstName)
// else if (valueConditions.valuesMaxLength.forLastName) return alert(valueResponses.valuesMaxLength.forLastName)
// else if (valueConditions.valuesMaxLength.forEmail) return alert(valueResponses.valuesMaxLength.forEmail)
