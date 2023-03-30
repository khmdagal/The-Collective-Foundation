/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/alt-text */
import React from "react";

const TextBannerModuleAdminPage = ({ textbold, textnormal }) => {
	return (
		<div className="card">
			<div className="card-content">
				<p>----Start textBaaner----</p>
				<p>{textbold}</p>
				<p>{textnormal}</p>
				<p>----End textBaaner-----</p>
			</div>
		</div>
	);
};

export default TextBannerModuleAdminPage;
