/* eslint-disable quotes */
/* eslint-disable curly */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-trailing-spaces */
/* eslint-disable linebreak-style */
/* eslint-disable react/jsx-key */
import React from "react";
import { useState, useEffect } from "react";

function AdminPage() {
	const [pagesData, setPagesData] = useState([]);

	async function fectPageTitles() {
		try {
			const getPageTitles = await fetch("/api/pages");
			const allPageTitles = await getPageTitles.json();
			return allPageTitles;
		} catch (error) {
			console.error(error);
			return "Page TITLES  are not coming!! investigate why";
		}
	}

	async function fectPagesData(pageTitle) {
		try {
			const getPagesData = await fetch(`api/pages/${pageTitle}`);
			const pagesData = await getPagesData.json();
			return pagesData;
		} catch (error) {
			console.error(error);
			return "Pages DATA are not  coming!! investigate why";
		}
	}


   async function handleModuleDelete(pageTitle, recordId) {
			const confirmed = confirm("Are you sure you want to delete?");

			if (confirmed) {
				try {
          const response = await fetch(`api/pages/${pageTitle}/${recordId}`, {
            method: "Delete",
          });
					const deletingModule = await response.json();
					console.log(deletingModule);
					alert(`This Data has been deleted successfully.`);
				} catch (error) {
					console.error(error);
					alert("Failed to delete data.");
				}
			}
		}

  useEffect(() => {
		fectPageTitles()
			.then((pagesTitleResults) => {
				const pageDetails = Promise.all(
					pagesTitleResults.map((page) => fectPagesData(page.page_title))
				);
				return pageDetails;
			})
			.then((pagesData) => setPagesData(pagesData));
	}, []);

  if (!pagesData) <p>Loading..</p>;
  console.log(pagesData)
	return (
		<>
			{pagesData.map((eachPage) => (
				<div>
					<h1>{eachPage.title}</h1>
					<div>
						{eachPage.modules.map((module) => (
							<div>
								<h3>{module.type}</h3><button onClick={() =>handleModuleDelete(eachPage.title, module.details.record_id)}>
									Delete this module
								</button>
							</div>
						))}
						<div>
							<label>Add a module:</label>
							<select>
								<option>Module 1</option>
								<option>Module 2</option>
							</select>
						</div>
					</div>
				</div>
			))}
			<button>Add page</button>
		</>
	);
}

export default AdminPage;
