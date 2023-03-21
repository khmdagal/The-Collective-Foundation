import React from 'react'
import { useState,useEffect } from "react";

export default function TemplatePage({pages}) {
    const [content, setContent] = useState([]);

    {async function fetchPagesAPI() {
      const page = await fetch(`/api/pages/${pages[item].page_title}`);
      const response = await page.json();
      setContent(response);
      
    }
   
    useEffect(() => {
       fetchPagesAPI();
    }, []);

    console.log(content);
  return (
    <div>
      <h1>Hello{pages[0].page_title}</h1>
    </div>
  )
}}
