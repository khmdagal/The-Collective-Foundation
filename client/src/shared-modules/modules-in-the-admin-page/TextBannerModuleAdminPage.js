import React from "react";

const TextBannerModuleAdminPage = ({
	type,
	textbold,
	textnormal,
	background,
}) => {
	//style={{ backgroundColor: background }}
	return (
		<div className="card">
			<p>
				<span>Type: </span> {type}
			</p>
			<div className="card-content">
				<p>
					<span>Bold Text: </span>
					{textbold}
				</p>
				<p>
					<span>Normal Text: </span>
					{textnormal}
				</p>
				<div >

					<span>Background Colour:</span>
					<p
						className="show-chosen-color"
						style={{ backgroundColor: background }}
					></p>
				</div>
			</div>
		</div>
	);
};

export default TextBannerModuleAdminPage;
