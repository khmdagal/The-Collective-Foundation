import heroimg from "../Images/Hero-banner-image1.jpg";
import "../shared-modules/HeroBanner.css";

const HeroBanner = () => {
  return (
		<>
			<div className="image-container">
				<img src={heroimg} alt="img"></img>
				<p>Protecting natural habitats from extinction.</p>
				<button>Learn More</button>
			</div>
		</>
	);
};

export default HeroBanner;