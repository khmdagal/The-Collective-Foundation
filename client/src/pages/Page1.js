
import React from "react";
import Header from "../shared-modules/Header";
import Footer from "../shared-modules/Footer";
import Module1 from "../shared-modules/Module1";
import Module2 from "../shared-modules/Module2";
import ImageAndText from "../shared-modules/ImageAndText";
import HeroBanner from "../shared-modules/HeroBanner";



export default function Page1() {
  return (
		<div>
			<Header />
			<HeroBanner />
			<ImageAndText />
			<Module1 />
			<Module2 />

			<Footer />
		</div>
	);
}

