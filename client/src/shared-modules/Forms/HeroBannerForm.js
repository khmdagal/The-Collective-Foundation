/* eslint-disable quotes */
/* eslint-disable no-unused-vars */
/* eslint-disable linebreak-style */
import React, { useState } from "react";
import "../Forms/Forms.css";

function HeroBannerForm({ pageToAddModules, handleModuleAdd }) {
	const [heroImage, setHeroImage] = useState(null);
	const [heroText, setHeroText] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const [successMessage, setSuccessMessage] = useState("");

	const handleSubmit = async (event) => {
		event.preventDefault();
		if (!heroImage || heroText.trim() === "") {
			setErrorMessage("Please fill all the fields");
		} else {
			try {
				const formData = new FormData();
				formData.append("heroImage", heroImage);
				formData.append("heroText", heroText);

				const heroBannerResponse = await fetch(`/api/modules/heroBanner/${pageToAddModules}`,
					{
						method: "POST",
						body: formData,
					}
				);
				const heroBannerData = await heroBannerResponse.json();
				// Calling the function to refetch the page's data after adding new module
				handleModuleAdd(pageToAddModules);

				// Clearing the input fields after the submission
				setHeroImage(null);
				setHeroText("");
				setSuccessMessage(`Your new module has been successfully added`);
			} catch (err) {
				console.error(err);
			}
		}
	};

	return (
		<form className="msform" onSubmit={handleSubmit}>
			<fieldset>
				<legend htmlFor="pageToAddModules">
					Adding to {pageToAddModules} Page
				</legend>
				<hr className="double-line" />
				<label htmlFor="heroImage">
					Hero Image:
					<input
						type="file"
						name="heroImage"
						accept="image/*"
						required
						onChange={(event) => setHeroImage(event.target.files[0])}
					/>
				</label>
				<label htmlFor="heroText">
					Hero Text:
					<input
						type="text"
						name="heroText"
						value={heroText}
						required
						onChange={(event) => setHeroText(event.target.value)}
					/>
				</label>
				<button type="submit">Submit</button>
				{errorMessage && <div className="error-message">{errorMessage}</div>}
				{successMessage && (
					<div className="success-message">{successMessage}</div>
				)}
			</fieldset>
		</form>
	);
}

export default HeroBannerForm;
