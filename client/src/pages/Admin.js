/* eslint-disable quotes */
/* eslint-disable curly */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-trailing-spaces */
/* eslint-disable linebreak-style */
/* eslint-disable react/jsx-key */
import React from "react";
import { useState, useEffect } from "react";
// ant design
import clientIcon from "../icons/client-logo.png";
import "../pages/Admin.css";
import Header from "../shared-modules/Header";
import Footer from "../shared-modules/Footer";
import ImageAndText from "../shared-modules/ImageAndText";
import ImageAndTextModuleAdminPage from "../shared-modules/modules-in-the-admin-page/ImageAndTextModuleAdminPage";
import HeroBannerModuleAdminPage from "../shared-modules/modules-in-the-admin-page/HeroBannerModuleAdminPage";
import TextBannerModuleAdminPage from "../shared-modules/modules-in-the-admin-page/TextBannerModuleAdminPage";

import {
	DeleteOutlined,
	HomeOutlined,
	UnorderedListOutlined,
	PlusOutlined,
	PoweroffOutlined,
	UserOutlined,
} from "@ant-design/icons";
import { Button, Select, Menu } from "antd";

import "antd/dist/reset.css";

function AdminPage() {
	const [pagesData, setPagesData] = useState([]);
	const [modules, setModules] = useState([]);
	const [selectedModuleType, setSelectedModuleType] = useState("");
	const [selectedTitle, setSelectedTitle] = useState(pagesData[0]);

	// set finish button

	const onFinish = (values) => {
		console.log("Username:", values.username);
	};

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

	useEffect(() => {
		getAvailableModules().then((modulesResult) => setModules(modulesResult));
	}, []);

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

	useEffect(() => {
		fetchModuleChanges();
	}, [selectedModuleType]);

	if (!pagesData || !modules) <p>Loading..</p>;

	//----------------

	function displayModule(module) {
		switch (module.type) {
			case "imageAndTexts":
				return (
					<ImageAndTextModuleAdminPage
						key={module.details.record_id}
						textheader={module.details.text_header}
						textbody={module.details.text_body}
						img={module.details.image}
						direction={module.details.imagetext_direction}
						// hasButton={module.details.hasbutton}
						button={module.details.button}
					/>
				);
			case "heroBanner":
				return (
					<HeroBannerModuleAdminPage
						key={module.details.record_id}
						hero_image={module.details.hero_image}
						hero_text={module.details.hero_text}
					/>
				);
			case "textBanner":
				return (
					<TextBannerModuleAdminPage
						key={module.details.record_id}
						textbold={module.details.textbold}
						textnormal={module.details.textnormal}
					/>
				);
			default:
				return null;
		}

	}

	//--------------------
	const selectedPage = pagesData.find((page) => page.title === selectedTitle);

	const selectedModules = selectedPage?.modules;

	const allModules = selectedPage?.modules?.map((module) =>
		displayModule(module)
	);

	console.log("selected modules--->>>",selectedModules);
	console.log("selectedPage-->>>", selectedPage);
	console.log("allModules>>>>>>", allModules);
	



	return (
		<div className="admin-page-container">
			<header className="header">{/* <Header /> */}</header>

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
					<Menu.Item>
						{" "}
						<PlusOutlined /> Add New Page{" "}
					</Menu.Item>
					<Menu.Item>
						{" "}
						<PoweroffOutlined /> Logout
					</Menu.Item>
				</Menu>
			</div>
			<div>
				<div>{allModules && allModules}</div>
			</div>

			<footer className="footer">
				<Footer />
			</footer>
		</div>
	);

}

export default AdminPage;

/*

{pagesData.map((eachPage) => (
					<div key={eachPage.title}>
						<div className="each-card">
							<h1 className="each-page-title">{eachPage.title}</h1>
							{eachPage.modules.map((module) => (
								<div>
									<h3>{module.type}</h3>
									{dipalyModule(module)}
									<Button
										icon={<DeleteOutlined />}
										className="delete-button"
										loading={loading}
										type="ghost"
										onClick={() =>
											handleModuleDelete(
												eachPage.title,
												module.details.record_id
											)
										}
									>
										Delete Module
									</Button>
								</div>
							))}
							<div>
								<Select
									onChange={handleModuleChanges}
									className="Select-menu"
									allowClear
									style={{ width: "100%" }}
								>
									{modules.map((moduleType, index) => (
										<Select.Option key={index} value={moduleType.module_type}>
											{moduleType.module_type}
										</Select.Option>
									))}
								</Select>
							</div>
						</div>
					</div>
				))}



=============================================================
<div className="admin-page-container">
			<header className="header">{ <Header />}</header>

			<div className="menu">
				<Menu
					onClick={(key) => {
						console.log(key);
						setSelectedTitle(key.item);
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
					<Menu.Item>
						{" "}
						<PlusOutlined /> Add New Page{" "}
					</Menu.Item>
					<Menu.Item>
						{" "}
						<PoweroffOutlined /> Logout
					</Menu.Item>
				</Menu>
				
			</div>

			<div className="cards">
				{pagesData.map((eachPage) => (
					<div key={eachPage.title}>
						<div className="each-card">
							<h1 className="each-page-title">{eachPage.title}</h1>
							{eachPage.modules.map((module) => (
								<div>
									<h3>{module.type}</h3>
									{dipalyModule(module)}
									<Button
										icon={<DeleteOutlined />}
										className="delete-button"
										loading={loading}
										type="ghost"
										onClick={() =>
											handleModuleDelete(
												eachPage.title,
												module.details.record_id
											)
										}
									>
										Delete Module
									</Button>
								</div>
							))}
							<div>
								<Select
									onChange={handleModuleChanges}
									className="Select-menu"
									allowClear
									style={{ width: "100%" }}
								>
									{modules.map((moduleType, index) => (
										<Select.Option key={index} value={moduleType.module_type}>
											{moduleType.module_type}
										</Select.Option>
									))}
								</Select>
							</div>
						</div>
					</div>
				))}
				<button type="primary">Add page</button>
			</div>

			<footer className="footer">
				<Footer />
			</footer>
		</div>


-----------------------------------------------
{ <Menu
					onClick={({ key }) => {}}
					// onClick={({ key }) => {seSelectedPage(key)}}
					items={[
						{ label: "Home", key: "/", icon:  },
						{ label: "Pages", key: "Pages", icon: <UnorderedListOutlined /> },
						{ label: "Edit Profile", key: "profile", icon: <UserOutlined /> },
						{
							label: "Logout",
							key: "logout",
							icon: <PoweroffOutlined />,
							danger: true,
						},
					]}
				></Menu> }

*/
