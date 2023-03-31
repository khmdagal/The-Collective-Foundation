import React, { useState } from "react";
import "../Forms/Forms.css";

function HeroBannerForm({ pageToAddModules, handleModuleAdd }) {
	const [heroImage, setHeroImage] = useState("");
	const [heroText, setHeroText] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const [successMessage, setSuccessMessage] = useState("");

	const handleSubmit = async (event) => {
		event.preventDefault();
		if (heroImage.trim() === "" || heroText.trim() === "") {
			setErrorMessage("Please fill all the fields");
		}
		try {
			const heroBannerResponse = await fetch(
				`/api/modules/heroBanner/${pageToAddModules}`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						heroImage,
						heroText,
					}),
				}
			);
			const heroBannerData = await heroBannerResponse.json();
// Calling the the function the we want to refetch the pages data after adding new module
			handleModuleAdd(pageToAddModules);


			// Clearing the input fields after the submission
			setHeroImage("");
			setHeroText("");

			setSuccessMessage(`Your new module is successfully added`);

			
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<form className="msform" onSubmit={handleSubmit}>
			<fieldset>
				<legend htmlFor="pageToAddModules">
					Adding to {pageToAddModules} Page
				</legend>
				<hr className="double-line"></hr>
				<label htmlFor="heroImage">
					Hero Image:
					<input
						type="text"
						name="heroImage"
						value={heroImage}
						required
						onChange={(event) => setHeroImage(event.target.value)}
					/>
				</label>
				<label htmlFor="heroText">
					Hero Text:
					<input
						type="heroText"
						name="heroText"
						value={heroText}
						required
						onChange={(event) => setHeroText(event.target.value)}
					/>
				</label>
				<button  type="submit">
					Submit
				</button>
				{errorMessage && <div className="error-message">{errorMessage}</div>}
				{successMessage && (
					<div className="success-message">{successMessage}</div>
				)}
			</fieldset>
		</form>
	);
}

export default HeroBannerForm;
