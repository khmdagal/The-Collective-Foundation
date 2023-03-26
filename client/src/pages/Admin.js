/* eslint-disable quotes */
/* eslint-disable curly */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-trailing-spaces */
/* eslint-disable linebreak-style */
/* eslint-disable react/jsx-key */
import React from "react";
import { useState, useEffect } from "react";
import ImageAndTextsBannerForm from "../shared-modules/Forms/ImageAndTextsBannerForm";
import TextBannerForm from "../shared-modules/Forms/TextBannerForm";

function AdminPage() {

  const [pagesData, setPagesData] = useState([]);
  const [modules, setModules] = useState([]);
  const [selectedModuleType, setSelectedModuleType] = useState("");


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
					alert(`This Data ${deletingModule} has been deleted successfully.`);
					
				} catch (error) {
					console.error(error);
					alert("Failed to delete data.");
				}
			}
		}

async function getAvailableModules(){
  try {
    const availableModule = await fetch("/api/listOfmodules");
    const modulesData = await availableModule.json();
    return modulesData;
  } catch (error) {
    console.error(error);
    return "No Module is not avaialbe";
  }
}

async function handleModuleChanges(e) {
  const seletedModule = e.target.value;
  setSelectedModuleType(seletedModule);
}

async function fetchModuleChanges() {
  try {
      const availableModule = await fetch(`/api/module/${selectedModuleType}`);
      const modulesData = await availableModule.json();
      console.log(modulesData);
      return modulesData;


  } catch (error) {
      console.log(error);
  }
}


useEffect(()=>{
getAvailableModules()
.then(modulesResult=> setModules(modulesResult));
},[]);



  useEffect(() => {

    fectPageTitles()
      .then((pagesTitleResults) => {
        const pageDetails = Promise.all(pagesTitleResults.map((page) => fectPagesData(page.page_title)));
        return pageDetails;
      })
      .then((pagesData) => setPagesData(pagesData));
  }, []);


  useEffect(() => {
    fetchModuleChanges();
},[selectedModuleType]);

let formComponent;
switch (selectedModuleType) {

	case "textBanner":
		formComponent = <TextBannerForm />;
		break;
	case "imageAndTexts":
		formComponent = <ImageAndTextsBannerForm />;
		break;
	default:
		formComponent = null;
}
  
  if (!pagesData || !modules) <p>Loading..</p>;
  return (
		<>
			{pagesData.map((eachPage) => (
				<div>
					<h1>{eachPage.title}</h1>
					<div>
						{eachPage.modules.map((module) => (
							<div>
								<h3>{module.type}</h3>
								<button
									onClick={() =>
										handleModuleDelete(eachPage.title, module.details.record_id)
									}
								>
									Delete this module
								</button>
							</div>
						))}
						<div>
							<label>Add a module:</label>
							<select onChange={handleModuleChanges}>
								<option>none</option>
								{modules.map((moduleType) => (
									<option value={moduleType.module_type}>
										{moduleType.module_type}
									</option>
								))}
							</select>
						</div>
					</div>
				</div>
			))}
			{formComponent}
			<button>Add page</button>
		</>
	);
}

export default AdminPage;
