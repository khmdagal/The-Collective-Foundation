import React from "react";


function Contact({contact}) {
  if (!contact){
  return <div>
    Loading...  </div>
}
  return (
    <div>
       <h1>{contact.page_title}</h1>   
       <p>{contact.page_content}</p>
    </div>
  );
}

export default Contact;
