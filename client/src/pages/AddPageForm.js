import React, { useState } from "react";


function AddPageForm({ selectedPage }) {
	const [pageTitle, SetPageTitle] = useState("");

	const handleSubmit = async (event) => {
		event.preventDefault();
		if (pageTitle.trim() === "") {
			setErrorMessage("Please fill  the fields");
		}
		console.log({ pageTitle });
		try {
			const pagesResponse = await fetch(`/api/pages/${selectedPage}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					pageTitle,
				}),
			});
			const pageData = await pagesResponse.json();
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<form className="msform" onSubmit={handleSubmit}>
			<label htmlFor="selectedPage">
				Page:{selectedPage}
				<input type="text" name="selectedPage" value={selectedPage} disabled />
			</label>
			<label htmlFor="bodlText">
				Bold Text:
				<input
					type="text"
					name="bodlText"
					value={pageTitle}
					required
					onChange={(event) => SetPageTitle(event.target.value)}
				/>
            </label>
			<button onClick={handleSubmit} type="submit">
				Submit
			</button>
			{errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
		</form>
	);
}

export default AddPageForm;