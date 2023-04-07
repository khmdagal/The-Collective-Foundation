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
			<p>
				<span>Type: </span> {type}
			</p>
			<span>Image: </span>
			<img
				src={`/Images/${img}`}
				alt="Text_and_Image"
				className="card-image"
			/>
			<div className="card-content">
				<h2 className="card-header">
					<span>Text Header: </span>
					{textheader}
				</h2>
				<p className="card-body">
					<span>Text Body: </span>
					{textbody}
				</p>
				<p>
					<span>Button: </span>
					{button}
				</p>
			</div>
		</div>
	);
};

export default ImageAndTextModuleAdminPage;
