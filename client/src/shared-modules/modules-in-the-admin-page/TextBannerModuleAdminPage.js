import React from "react";

const TextBannerModuleAdminPage = ({ type, textbold, textnormal }) => {
	return (
		<div className="card">
			<p>Module Type: {type}</p>
			<div className="card-content">
				<p>{textbold}</p>
				<p>{textnormal}</p>
			</div>
		</div>
	);
};

export default TextBannerModuleAdminPage;
