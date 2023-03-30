import "../shared-modules/TextBanner.css";

const TextBanner = ({righttext,lefttext,backgroundcolor}) => {
	return (
		<div className="text-banner-container">
			<p className="left-text">{righttext}</p>
			<p className="right-text">{lefttext}</p>
		</div>
	);
};

export default TextBanner;
