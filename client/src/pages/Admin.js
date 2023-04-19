import React from "react";
import { useState, useEffect } from "react";
import ImageAndTextsBannerForm from "../shared-modules/Forms/ImageAndTextsBannerForm";
import TextBannerForm from "../shared-modules/Forms/TextBannerForm";
import HeroBannerForm from "../shared-modules/Forms/HeroBannerForm";


import AddPageForm from "../shared-modules/Forms/AddpageForm";

import "../pages/Admin.css";
import Footer from "../shared-modules/Footer";
import ImageAndTextModuleAdminPage from "../shared-modules/modules-in-the-admin-page/ImageAndTextModuleAdminPage";
import HeroBannerModuleAdminPage from "../shared-modules/modules-in-the-admin-page/HeroBannerModuleAdminPage";
import TextBannerModuleAdminPage from "../shared-modules/modules-in-the-admin-page/TextBannerModuleAdminPage";

import {
	DeleteOutlined,
	HomeOutlined,
	UnorderedListOutlined,
	PlusOutlined,
	PoweroffOutlined,
} from "@ant-design/icons";
import { Menu, Button, Card, Select, Form } from "antd";

import "antd/dist/reset.css";

function AdminPage() {
	const [pagesData, setPagesData] = useState([]);
	const [modules, setModules] = useState([]);
	const [selectedModuleType, setSelectedModuleType] = useState("");
	const [pageToAddModules, setPageToAddModules] = useState("");
	const [selectedTitle, setSelectedTitle] = useState("Home");

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

	async function handleModuleAdd(pageTitle) {
		// refetch the pages data
		const updatedPagesData = await fectPagesData(pageTitle);
		// update the state with the new data
		setPagesData((prevPagesData) =>
			prevPagesData.map((pageData) =>
				pageData.title === pageTitle ? updatedPagesData : pageData
			)
		);
	}

	// handle page addition
	async function handlePageAddition(pageTitle) {
		// refetch the pages data
		const updatedPagesData = await fectPagesData(pageTitle);
		// update the state with the new data
		setPagesData((prevPagesData) =>
			prevPagesData.map((pageData) =>
				pageData.title === pageTitle ? updatedPagesData : pageData
			)
		);
	}

	// handle page deletion
	async function handlePageDelete(pageTitle) {
		
		const confirmed = confirm(
			"Are you sure you want to delete this page and all of its content?"
		);

		if (confirmed) {
			try {
				const response = await fetch(`api/pages/deletepages/${pageTitle}`, {
					method: "Delete",
				});
				const deletingpage = await response.json();

				// This is to update the pages data and reset the state after each deleting
				const updatedPagesData = await fectPagesData(pageTitle);

				setPagesData((prevPagesData) =>
					prevPagesData.map((pageData) =>
						pageData.title === pageTitle ? updatedPagesData : pageData
					)
				);

				alert("ATTENTION!! if page has modules it can not be deleted");
			} catch (error) {
				console.error(error);
				alert("Failed delete delete modules.");
			}
		}
	}

	async function handleModuleDelete(pageTitle, moduleTpe, recordId) {
		
		const confirmed = confirm(
			"Are you sure you want to delete this module and all of its content?"
		);

		if (confirmed) {
			try {
				const response = await fetch(
					`api/pages/${pageTitle}/${moduleTpe}/${recordId}`,
					{
						method: "Delete",
					}
				);
				const deletingModule = await response.json();

				// This is to update the pages data and reset the state after each deleting
				const updatedPagesData = await fectPagesData(pageTitle);

				setPagesData((prevPagesData) =>
					prevPagesData.map((pageData) =>
						pageData.title === pageTitle ? updatedPagesData : pageData
					)
				);

				alert("The module has been successfully deleted.");
			} catch (error) {
				console.error(error);
				alert("Failed to delete data.");
			}
		}
	}

	async function getAvailableModules() {
		try {
			const availableModule = await fetch("/api/listOfmodules");
			const modulesData = await availableModule.json();
			return modulesData;
		} catch (error) {
			console.error(error);
			return "No Module is not avaialbe";
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

		// This is to get the available modules
		getAvailableModules().then((modulesResult) => setModules(modulesResult));
	}, [pagesData]);

	let formComponent;
	switch (selectedModuleType) {
		case "heroBanner":
			formComponent = (
				<HeroBannerForm
					handleModuleAdd={handleModuleAdd}
					pageToAddModules={pageToAddModules}
				/>
			);
			break;
		case "textBanner":
			formComponent = (
				<TextBannerForm
					handleModuleAdd={handleModuleAdd}
					pageToAddModules={pageToAddModules}
				/>
			);
			break;

		case "imageAndTexts":
			formComponent = (
				<ImageAndTextsBannerForm
					handleModuleAdd={handleModuleAdd}
					pageToAddModules={pageToAddModules}
				/>
			);
			break;
			case "Addpage":
				formComponent = (
					<AddPageForm
						handlePageAddition={handlePageAddition}
						pageToAddModules={pageToAddModules}
					/>
				);
				break;
		default:
			formComponent = null;
	}


if (!pagesData || !modules) {
		return <p>Loading..</p>;
	}

	function displayModule(module) {
		switch (module.type) {
			case "imageAndTexts":
				return (
					<div
						className="each-card"
						key={`${module.type}-${module.details.record_id}`}
					>
						<ImageAndTextModuleAdminPage
							type={module.type}
							textheader={module.details.text_header}
							textbody={module.details.text_body}
							img={module.details.image}
							direction={module.details.imagetext_direction}
							// hasButton={module.details.hasbutton}
							button={module.details.button}
							// onClick={() => setShowPageOfModules(!showPageOfModules)}
						/>
						<Button
							className="delete-button"
							onClick={() =>
								handleModuleDelete(
									selectedTitle,
									module.type,
									module.details.record_id
								)
							}
							danger
							size="small"
							icon={<DeleteOutlined />}
						>
							Delete
						</Button>
						
					</div>
				);

			case "heroBanner":
				return (
					<div
						className="each-card"
						key={`${module.type}-${module.details.record_id}`}
					>
						<HeroBannerModuleAdminPage
							type={module.type}
							hero_image={module.details.hero_image}
							hero_text={module.details.hero_text}
						/>
						<Button
							className="delete-button"
							onClick={() =>
								handleModuleDelete(
									selectedTitle,
									module.type,
									module.details.record_id
								)
							}
							danger
							size="small"
							icon={<DeleteOutlined />}
						>
							Delete
						</Button>
					</div>
				);
			case "textBanner":
				return (

					<>
						<div className="modules-container">
							<div
								className="each-card"
								key={`${module.type}-${module.details.record_id}`}
							>
								<TextBannerModuleAdminPage
									type={module.type}
									textbold={module.details.textbold}
									textnormal={module.details.textnormal}
								/>
								<Button
									className="delete-button"
									onClick={() =>
										handleModuleDelete(
											selectedTitle,
											module.type,
											module.details.record_id
										)
									}
									danger
									size="small"
									icon={<DeleteOutlined />}
								>
									Delete
								</Button>
							</div>
						</div>
					</>

				);
			default:
				return null;
		}
	}

	const selectedPage = pagesData.find((page) => page.title === selectedTitle);

	const allModules = selectedPage?.modules?.map((module) =>
		displayModule(module)
	);

	return (
		<div className="admin-page-container">
			<header className="header">
				<h1>Admin Panel</h1>
			</header>

			<div className="menu">
				<Menu
					onClick={(key) => {
						setSelectedTitle(key.key);
					}}
				>
					{pagesData.map((page) => (
						<Menu.Item key={page.title} className="custom-menu-item">
							{page.title === "Home" && <HomeOutlined icon={page.title} />}
							{page.title !== "Home" && (
								<UnorderedListOutlined icon={page.title} />
							)}
							{page.title}
						</Menu.Item>
					))}
					<Menu.Item></Menu.Item>
					<Menu.Item>
						<Button type="primary" danger ghost>
							<PoweroffOutlined /> Logout
						</Button>
					</Menu.Item>
					<Button
						className="Add-page-button"

						onClick={() => {
							setSelectedModuleType("Addpage")
						}}
						size="small"
						icon={<PlusOutlined />}
						type="primary"
						style={{ background: "green", borderColor: "green" }}
					>
						Add page
					</Button>{" "}
				</Menu>
			</div>

			<div>
				<h2 className="each-page-title">{selectedTitle} Page</h2>
				<Card className="cards">
					{allModules && allModules}
					<label htmlFor="Select-menu">Select Module </label>
					<Select
						className="Select-menu"
						style={{ width: 200 }}
						placeholder="---Select Module ---"
						onChange={(e) => {
							setSelectedModuleType(e);
							setPageToAddModules(selectedTitle);
						}}
					>
						<Select.Option value=""> -- none -- </Select.Option>
						{modules.map((moduleType) => (
							<Select.Option
								key={moduleType.module_type}
								value={moduleType.module_type}
							>
								{moduleType.module_type}
							</Select.Option>
						))}
					</Select>
					<Button
						className="delete-button"
						onClick={() => handlePageDelete(selectedTitle)}
						danger={true}
						size="small"
						icon={<DeleteOutlined />}
					>
						Delete Page
					</Button>
					{formComponent}

				</Card>

			</div>؛

			<footer className="footer">
				<Footer />
			</footer>
		</div>
	);
}

export default AdminPage;