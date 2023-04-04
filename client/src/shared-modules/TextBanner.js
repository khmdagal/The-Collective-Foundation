/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable quotes */
import "../shared-modules/TextBanner.css";

const TextBanner = ({ righttext, lefttext, backgroundcolor }) => {
	return (
		<div
			style={{ backgroundColor: backgroundcolor }}
			className="text-banner-container"
		>
			<p className="left-text">{righttext}</p>
			<p className="right-text">{lefttext}</p>
		</div>
	);
};

export default TextBanner;
