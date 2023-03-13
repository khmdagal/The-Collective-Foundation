/* eslint-disable jsx-a11y/label-has-associated-control */
import React from "react";
import { useState,useEffect } from "react";

function AdminPage() {
  const [pages, setPages] = useState([]);

  async function fetchPagesAPI() {
    const page = await fetch("/api/pages");
    const response = await page.json();
    setPages(response);
	
  }
 
  useEffect(() => {
     fetchPagesAPI();
  }, []);
  
	return (
		<div>
            
            {pages.map((item)=>{return<div key={item.page_id}> <h1>{item.page_title}</h1>
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
       </select></div>})}
 


<button>Add page</button>
		</div>
	);
}

export default AdminPage;
