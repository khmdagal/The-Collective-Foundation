import React from "react";
import Header from "../shared-modules/Header";
import Footer from "../shared-modules/Footer";
import Module1 from "../shared-modules/Module1";
import Module2 from "../shared-modules/Module2";
import ImageAndText from "../shared-modules/ImageAndText";


function Page1() {
  return (
    <div>
          <Header />
          <Module1 />
          <Module2 />
          <ImageAndText />
          <Footer />
    </div>
  );
}

export default Page1;