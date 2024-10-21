// this functions makes an http request with method DELETE
// deletes a record of the table Contact by parameter id
// this returns an object like this {message: [a message], status: [status]}
export async function deleteRecordFromDBById(id: number) {
  const url = `http://127.0.0.1:5000/delete_contact/${id}`;
  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  };
  // making http request
  const response = await fetch(url, options);
  const status = await response.status
  // verifying request is ok
  // and returning a message and the status code
  if (status !== 201 && status !== 200) {
    const data = await response.json();
    return {message: data.message, status};
  } else {
    return {message: "Contack deleted successfully", status};
  }
}

export async function createOrUpdateFromDB(
    data = {}, 
    updating: boolean = false, 
    existingContactId: number = 0
  ) {
  const url = "http://127.0.0.1:5000/" + (updating ? `update_contact/${existingContactId}` : "create_contact")
  const options = {
      method: updating ? "PATCH" : "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
  }
  const response = await fetch(url, options)
  const status = await response.status
  if (response.status !== 201 && response.status !== 200) {
      const data = await response.json()
      return {message: data.message, status};
  }
  if (updating) {
    return {message: "Contack updated successfully", status};
  } else {
    return {message: "Contack created successfully", status};
  }
}