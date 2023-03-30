import React from "react";

const HeroBannerModuleAdminPage = ({ type, hero_image, hero_text }) => {
	return (
		<div className="card">
			<p>Module Type: {type}</p>
			<img src={hero_image} alt="heroimage" className="card-image" />
			<div className="card-content">
				<div className="card-header">{hero_text}</div>
			</div>
		</div>
	);
};

export default HeroBannerModuleAdminPage;
