/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/alt-text */

import React from "react";

const HeroBannerModuleAdminPage = ({ hero_image, hero_text }) => {
	return (
		<div className="card">
			<p>----start Heor----</p>
			<img src={hero_image} alt="heroimage" className="card-image" />
			<div className="card-content">
				<div className="card-header">{hero_text}</div>
			</div>
			<p>-----end Heor----</p>
		</div>
	);
};

export default HeroBannerModuleAdminPage;
