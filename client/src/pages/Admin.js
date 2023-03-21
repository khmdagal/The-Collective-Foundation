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
  return (
		<>
			{pagesData.map((eachPage) => (
				<div>
					<h1>{eachPage.title}</h1>
					<div>
						{eachPage.modules.map((module) => (
							<div>
								<h3>{module.type}</h3>
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
