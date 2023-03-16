import "../shared-modules/TextBanner.css";

const TextBanner = (prop) => {
	return (
		<div className="text-banner-container">
			<p className="left-text">{prop.leftText}</p>
			<p className="right-text">{prop.rightText}</p>
		</div>
	);
};

export default TextBanner;
