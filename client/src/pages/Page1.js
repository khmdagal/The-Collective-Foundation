
import React from "react";
import Header from "../shared-modules/Header";
import Footer from "../shared-modules/Footer";
import ImageAndText from "../shared-modules/ImageAndText";
import HeroBanner from "../shared-modules/HeroBanner";
import TextBanner from "../shared-modules/TextBanner";


export default function Page1() {
  return (
		<div>
			<Header />
			<HeroBanner />
			<TextBanner />
			<ImageAndText />

			<Footer />
		</div>
	);
}

