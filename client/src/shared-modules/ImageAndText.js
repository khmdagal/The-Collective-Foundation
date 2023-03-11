import React from "react";
import homePageImage1 from "../Images/home-page-image-1.jpg"; // omport imges from local files for now
import homePageImage2 from "../Images/home-page-image-2.jpg";
import   "../shared-modules/ImageAndText.css"; // import styling from css file



function ImageAndText() {
  return (

    // first image and text container
		<div>
			<div className="container1">
				<div className="image-container">
					<img src={homePageImage1} alt="img"></img>
				</div>
				<div className="content-container">
					<div className="content">
						<h1>Changing the word is possible. we've done it before </h1>
						<p>
							Our Leadership team bring years of experince to bear on the
							greatest challenge of our time. we're results driven with a proven
							record of previous successes
						</p>
						<button className="button">Learn more</button>
					</div>
				</div>
			</div>

			{/* // second image and text container */}
			<div className="container2">
				<div className="image-container">
					<img src={homePageImage2} alt="img"></img>
				</div>
				<div className="content-container">
					<div className="content">
						<h1>Ready to take the next step?</h1>
						<p>
							This is a movement of billions. Whether you’re most comfortable
							contributing time to help achieve our advocacy goals, money to
							help us grow, or energy to put political pressure on our
							governments to change, we need you on our team.
						</p>
						<button className="button">Take Action</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ImageAndText;
