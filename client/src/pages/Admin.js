/* eslint-disable jsx-a11y/label-has-associated-control */
import React from "react";

function AdminPage() {
	return (
		<div>
            <h1>Page 1</h1>
      <ul>
        <li>Header</li>
        <li>Module 1</li>
        <li>Module 2</li>
        <li>Footer</li>
      </ul>
      <label>Add a module:</label>

<select >
  <option >Module 1</option>
  <option >Module 2</option>
</select>
<h1>Page 2</h1>
<ul>
        <li>Header</li>
        <li>Module 1</li>
        <li>Footer</li>
      </ul>
      <label>Add a module:</label>

<select >
  <option >Module 1</option>
  <option >Module 2</option>
</select>

<button>Add page</button>
		</div>
	);
}

export default AdminPage;
