import React from "react";

const HeroBannerModuleAdminPage = ({ type, hero_image, hero_text }) => {
	return (
		<div className="card">
			<p>
				<span>Type: </span>
				{type}
			</p>
			<span>Image: </span>
			<img
				src={`/Images/${hero_image}`}
				alt="heroimage"
				className="card-image"
			/>
			<div className="card-content">
				<div className="card-header">
					<span>Text: </span>
					{hero_text}
				</div>
			</div>
		</div>
	);
};

export default HeroBannerModuleAdminPage;
