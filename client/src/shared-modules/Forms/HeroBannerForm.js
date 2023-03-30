import React, { useState } from "react";
import "../Forms/Forms.css";

function HeroBannerForm({ pageToAddModules, handleModuleAdd }) {
	const [heroImage, setHeroImage] = useState("");
	const [heroText, setHeroText] = useState("");
	const [errorMessage, setErrorMessage] = useState("");

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
			// console.log(heroBannerData);
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<form className="msform" onSubmit={handleSubmit}>
			<label htmlFor="pageToAddModules">
				Page:{pageToAddModules}
				<input
					type="text"
					name="selectedPage"
					value={pageToAddModules}
					disabled
				/>
			</label>
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
			<button onClick={handleSubmit} type="submit">
				Submit
			</button>
			{errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
		</form>
	);
}

export default HeroBannerForm;
