import heroimg from "../Images/Hero-banner-image1.jpg";
import "../shared-modules/HeroBanner.css";

const HeroBanner = () => {
	return (
		<>
			<div className="image-container">
				<img src={heroimg} alt="img"></img>
				<div className="hero-banner-content-overlay">
					<p>Protecting natural habitats from extinction.</p>
					<button>Learn More</button>
				</div>
			</div>
		</>
	);
};

export default HeroBanner;
