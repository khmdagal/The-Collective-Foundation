import React from "react";
import homePageImage1 from "../Images/home-page-image1.jpg";
import   "../shared-modules/ImageAndText.css";



function ImageAndText() {
  return (
	
		<div className="container">
			<div className="image-container">
				<img src={homePageImage1} alt='img'></img>
			</div>
			<div className="content-container">
				<div className="content">
					<h1>Changing the word is possible. we've done it before </h1>
					<p >
						Our Leadership team bring years of experince to bear on the greatest
						challenge of our time. we're results driven with a proven record of
						previous successes
					</p>
					<button className="button">LEARN MORE</button>
				</div>
			</div>
		</div>
	);
}

export default ImageAndText;
 