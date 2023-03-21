import React from 'react'
import { useState,useEffect } from "react";

export default function TemplatePage({pagetitle}) {
    const [content, setContent] = useState([]);

    {async function fetchPagesAPI(pages) {
      const page = await fetch(`/api/pages/${pages}`);
      const response = await page.json();
      setContent(response);
      
    }
    useEffect(() => {
       fetchPagesAPI();
    }, []);

    console.log(content);
  return (
    <div>
      <h1>Hello{pagetitle}</h1>
    </div>
  )
}}
