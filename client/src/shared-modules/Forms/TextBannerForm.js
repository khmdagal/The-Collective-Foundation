import React, { useState } from "react";
import "../Forms/Forms.css";

function TextBannerForm({ pageToAddModules, handleModuleAdd }) {
	const [boldText, setBoldText] = useState("");
	const [normalText, setNormalText] = useState("");
	const [background, setBackground] = useState("");
	const [errorMessage, setErrorMessage] = useState("");

	const handleSubmit = async (event) => {
		event.preventDefault();
		if (
			boldText.trim() === "" ||
			normalText.trim() === "" ||
			background.trim() === ""
		) {
			setErrorMessage("Please fill all the fields");
		}
		console.log({ boldText, normalText, background });
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
					name="pageToAddModules"
					value={pageToAddModules}
					disabled
				/>
			</label>
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
				<input
					type="text"
					name="background"
					value={background}
					required
					onChange={(event) => setBackground(event.target.value)}
				/>
			</label>
			<button onClick={handleSubmit} type="submit">
				Submit
			</button>
			{errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
		</form>
	);
}

export default TextBannerForm;