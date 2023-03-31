import React from "react";

const TextBannerModuleAdminPage = ({ type, textbold, textnormal }) => {
	return (
		<div className="card">
			<p>
				<span>Type: </span> {type}
			</p>
			<div className="card-content">
				<p>
					<span>Bold Text: </span>{textbold}
				</p>
				<p>
					<span>Normal Text: </span>{textnormal}
				</p>
			</div>
		</div>
	);
};

export default TextBannerModuleAdminPage;
