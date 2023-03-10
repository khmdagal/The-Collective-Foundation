import {  Routes, Route } from "react-router-dom";
import { useState,useEffect } from "react";

import About from "./pages/About";
import Home from "./pages/Home";
import AdminPage from "./pages/Admin";
import Contact from "./pages/Contact";
import HomePage from "./pages/HomePage";





const App = () =>{
	
	const [pages, setPages] = useState([]);

  async function fetchPagesAPI() {
    const page = await fetch("http://localhost:3000/api/home");
    const response = await page.json();
    setPages(response);
	
  }
 
  useEffect(() => {
     fetchPagesAPI();
  }, []);
  
	return (
	
	<Routes>
        <Route path="/" element={<HomePage home={pages[0]}/>} />
        <Route path="/home" element={<HomePage  home={pages[0]}/>} />
		<Route path="/about" element={<About about={pages[1]}/>}  />
		<Route path="/contact" element={<Contact contact={pages[2]} />}  />
		
    </Routes>
	
)};

export default App;
