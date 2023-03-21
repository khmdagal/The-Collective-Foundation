import React from 'react'
import { useState,useEffect } from "react";

export default function TemplatePage({pagetitle}) {
    const [content, setContent] = useState([]);
console.log(pagetitle)
    async function fetchPagesAPI() {
      const page = await fetch(`/api/pages/${pagetitle}`);
      const response = await page.json();
      setContent(response);
      
    }
    useEffect(() => {
       fetchPagesAPI();
    }, []);

    console.log(content);
    if (!content.title) {
      return <div>No content available for {pagetitle}.</div>;
    }
  return (

    <div>
       <h1>Hello{content.title}</h1>
    </div>
  )
}

