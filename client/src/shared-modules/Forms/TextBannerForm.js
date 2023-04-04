import React, { useState } from "react";
import { SketchPicker } from "react-color";
import "../Forms/Forms.css";

function TextBannerForm({ pageToAddModules, handleModuleAdd }) {
	const [boldText, setBoldText] = useState("");
	const [normalText, setNormalText] = useState("");
	const [background, setBackground] = useState("#ff6");
	const [errorMessage, setErrorMessage] = useState("");
	const [successMessage, setSuccessMessage] = useState("");

	const handleSubmit = async (event) => {
		event.preventDefault();
		if (
			boldText.trim() === "" ||
			normalText.trim() === "" ||
			background.trim() === ""
		) {
			setErrorMessage("Please fill all the fields");
		}

		try {
			const textBannerResponse = await fetch(
				`/api/modules/textBanner/${pageToAddModules}`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						boldText,
						normalText,
						background,
					}),
				}
			);
			const textBannerData = await textBannerResponse.json();

			// Calling the the function the we want to refetch the pages data after adding new module
			handleModuleAdd(pageToAddModules);

			// Clearing the input fields after the submission
			setBoldText("");
			setNormalText("");
			setBackground("");

			setSuccessMessage("Your new module is successfully added");

			// Calling the the function the we want to refetch the pages data after adding new module

		} catch (err) {
			console.error(err);
		}
	};
console.log(background)
	return (
		<form className="msform" onSubmit={handleSubmit}>
			<fieldset>
				<legend htmlFor="pageToAddModules">
					Adding to {pageToAddModules} Page
				</legend>
				<hr className="double-line"></hr>
				<label htmlFor="bodlText">
					Bold Text:
					<input
						type="text"
						name="bodlText"
						value={boldText}
						required
						onChange={(event) => setBoldText(event.target.value)}
					/>
				</label>
				<label htmlFor="normalText">
					Normal Text:
					<input
						type="text"
						name="normalText"
						value={normalText}
						required
						onChange={(event) => setNormalText(event.target.value)}
					/>
				</label>
				<label htmlFor="background">
					Background:
					<SketchPicker 
						color={background}
						onChangeComplete={(event) => setBackground(event.hex)}
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

export default TextBannerForm;
