import React from "react";

const Rating = props => {
  return (
    <form>
        <input type="text" name="userId" placeholder="UserId"/>
        <input type="text" name="firstName" placeholder="First name"/>
        <input type="text" name="lastName" placeholder="Last name"/>
        <input type="number" name="age" placeholder="Age"/>
        <button id="addBtn">Add</button>
        <button id="updateBtn">Update</button>
        <button id="removeBtn">Remove</button>
    </form>
  )
}

export default Rating