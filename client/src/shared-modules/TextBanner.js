import "../shared-modules/TextBanner.css";

const leftText = "Climate change threatens every part of the planet. It’s a global problem that requires global cooperation.";
const rightText =
	"Our mission is to create international consensus around the climate emergency, as well a shared plan for saving the planet’s most exceptional wild places";

 const TextBanner = () => {
		return (
			<>
				<div className="text-banner-container">
					<p className="left-text">{leftText}</p>
					<p className="right-text">{rightText}</p>

				</div>
			</>
		);
 };


export default TextBanner;
