import React from 'react'
import { useState,useEffect } from "react";
import ImageAndText from '../shared-modules/ImageAndText';
import Header from '../shared-modules/Header'
import Footer from '../shared-modules/Footer'

export default function TemplatePage({pagetitle}) {
    const [content, setContent] = useState([]);
    async function fetchPagesAPI() {
      const page = await fetch(`/api/pages/${pagetitle}`);
      const response = await page.json();
      setContent(response);
      
    }
    useEffect(() => {
       fetchPagesAPI();
    }, []);
console.log(content);
    console.log(content);
    if (!content.title) {
      return <div>No content available for {pagetitle}.</div>;
    }

  return (

    <div>
      <Header/>
       
       {content.modules.map(module=>{return (<div> {module.type==='imageAndTexts' && <ImageAndText/>}</div>)})}
       <Footer/>
    </div>
  )
}

