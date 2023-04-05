
import "../shared-modules/HeroBanner.css";

const HeroBanner = ({ herotext, heroimage }) => {
	return (
		<>
			<div className="hero-image-container">
				<img src={`/Images/${heroimage}`} alt="img"></img>
				<div className="hero-banner-content-overlay">
					<p>{herotext}</p>
					<button>Learn More</button>
				</div>
			</div>
		</>
	);
};

export default HeroBanner;
