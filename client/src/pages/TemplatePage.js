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

    if (!content.title) {
      return <div>No content available for {pagetitle}.</div>;
    }

  return (

    <div>
      <Header/>
       
       {content.modules.map(module=>
      
        { console.log(module.details.text);
          return (<div key={module.details.record_id}> {module.type==='imageAndTexts' && 
          <ImageAndText img={module.details.image} 
          direction={module.details.imagetext_direction}
          textheader={module.details.text_header} 
          textbody={module.details.text_body}
          button={module.details.button}/>}</div>)})}
       <Footer/>
    </div>
  )
}

