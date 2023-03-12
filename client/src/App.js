import {  Routes, Route } from "react-router-dom";
import About from "./pages/About";
import Home from "./pages/Home";
import AdminPage from "./pages/Admin";
import Contact from "./pages/Contact";
import HomePage from "./pages/HomePage";





const App = () =>{
	
	return (
	
	<Routes>
        <Route path="/" element={<HomePage home={pages[0]}/>} />
        <Route path="/admin" element={<Admin/>} />
		<Route path="/page1" element={<page1 />}  />
		<Route path="page2" element={<page2  />}  />
		
    </Routes>
	
)};

export default App;
