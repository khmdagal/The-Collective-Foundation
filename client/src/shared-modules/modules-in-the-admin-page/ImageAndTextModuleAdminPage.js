import React from "react";
const ImageAndTextModuleAdminPage = ({
	type,
	textheader,
	textbody,
	img,
	direction,
	button,
}) => {


	return (
		<div className="card">
			<p>Module Type: {type}</p>
			<img
				// src={`/Images/textAndImage-${img}`}
				alt="Text_and_Image"
				className={`card-image ${direction}`}
			/>
			<div className="card-content">
				<h2 className="card-header">{textheader}</h2>
				<p className="card-body">{textbody}</p>
				<button>{button}</button>
			</div>
		</div>
	);
};

export default ImageAndTextModuleAdminPage;
