import React from "react";


const ImageAndTextModuleAdminPage = ({
	textheader,
	textbody,
	img,
	direction,
	button,
}) => {


	return (
		<div className="card">
			<p>----start Image and text----</p>
			<div>{textheader}</div>
			<div>{textbody}</div>
			<div>{img}</div>
			<div>{direction}</div>
			<div>{button}</div>
			<p>----end Image and text----</p>
			{/* <img
				src={`/Images/textAndImage-${image}`}
				alt={textHeader}
				className={`card-image ${imageTextDirection}`}
			/>
			<div className="card-content">
				<div className="card-header">{textHeader}</div>
				<div className="card-body">{textBody}</div>
				<button
					className="card-button"
					onClick={() =>
						console.log(`Clicked on card with record ID: ${recordId}`)
					}
				>
					{button}
				</button>
			</div> */}
		</div>
	);
};

export default ImageAndTextModuleAdminPage;
