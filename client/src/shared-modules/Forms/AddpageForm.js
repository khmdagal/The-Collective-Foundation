import React, { useState } from "react";

function AddNewPageForm({ fectPagesData, handlePageAddition }) {
	const [pageTitle, setPageTitle] = useState("");
	const [pagePath, setPagePath] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const [successMessage, setSuccessMessage] = useState("");

	const handleSubmit = async (event) => {
		event.preventDefault();
		if (pageTitle.trim() === "" || pagePath.trim() === "") {
			setErrorMessage("Please fill all the fields");
		}
		try {
			const addNewPage = await fetch(`/api/pages/newpage`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					pageTitle,
					pagePath,
				}),
			});
			const New_Page = await addNewPage.json();

			// Calling the function to refetch the pages data after adding new page
			fectPagesData(pageTitle);

			// Calling the the function the we want to refetch the pages data after adding new page
			handlePageAddition(pageTitle);

			// Clearing the input fields after the submission
			setPageTitle("");
			setPagePath("");

			setSuccessMessage(`Your new page is successfully created`);
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<form className="msform" onSubmit={handleSubmit}>
			<fieldset>
				<legend htmlFor="pageToAddModules">Creating new page</legend>
				<hr className="double-line"></hr>
				<label htmlFor="pageTitle">
					Page Title:
					<input
						type="text"
						name="pageTitle"
						value={pageTitle}
						required
						onChange={(event) => setPageTitle(event.target.value)}
					/>
				</label>
				<label htmlFor="pagePath">
					Page Path:
					<input
						type="heroText"
						name="pagePath"
						value={pagePath}
						required
						onChange={(event) => setPagePath(event.target.value)}
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

export default AddNewPageForm;
