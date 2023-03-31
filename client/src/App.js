import {  Routes, Route, BrowserRouter } from "react-router-dom";
import { useState,useEffect } from "react";
import Admin from "./pages/Admin";
import TemplatePage from "./pages/TemplatePage";
import HeroBanner from "./shared-modules/HeroBanner";
import TextBanner from "./shared-modules/TextBanner"


const App = () => {
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
  
    <Routes>
	
      <Route path="/admin" element={<Admin />} />
      <Route path="/heroBannerShowcase" element={<HeroBanner />} />
      <Route path="/textBannerShowcase" element={<TextBanner />} />
      {pages.map((item) => {
        return <Route key={item.page_id} path={item.page_path}
          element={<TemplatePage pagetitle={item.page_title} />} />
      })}
    </Routes>)
}

export default App;