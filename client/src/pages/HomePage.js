import React from "react";
import About from "./About";
//import Header from "../shared-modules/Header";
//import Footer from "../shared-modules/Footer";
//import Module1 from "../shared-modules/Module1";


function HomePage({home}) {

if (!home){
  return <div>
    Loading...  </div>
}



  return (
    <div>
          <h1>
            {home.page_title}
          </h1>
          <p>
           {home.page_content}
          </p>
    </div>
  );
}

export default HomePage;
