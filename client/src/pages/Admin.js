/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable quotes */
/* eslint-disable curly */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-trailing-spaces */
/* eslint-disable linebreak-style */
/* eslint-disable react/jsx-key */
import React from "react";
import { useState, useEffect } from "react";

import clientIcon from "../icons/client-logo.png";
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
	UserOutlined,
	MenuFoldOutlined,
	MenuUnfoldOutlined,
} from "@ant-design/icons";
import { Menu, Button, Card, Select } from "antd";


import "antd/dist/reset.css";

function AdminPage() {
	const [pagesData, setPagesData] = useState([]);
	const [modules, setModules] = useState([]);
	const [selectedModuleType, setSelectedModuleType] = useState("");
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
	}, [pagesData]);

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
						/>
						<Button
							className="delete-button"
							onClick={() =>
								handleModuleDelete(selectedTitle, module.details.record_id)
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
								handleModuleDelete(selectedTitle, module.details.record_id)
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
								handleModuleDelete(selectedTitle, module.details.record_id)
							}
							danger
							size="small"
							icon={<DeleteOutlined />}
						>
							Delete
						</Button>
					</div>
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
				<h2 className="each-page-title">{selectedTitle} Page</h2>
				<Card className="cards">
					{allModules && allModules}
				</Card>
			</div>

			<footer className="footer">
				<Footer />
			</footer>
		</div>
	);

}

export default AdminPage;

/*

 return (
      <Layout className="layout">
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="logo" />
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
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background">
            Admin Panel
          </Header>
          <Content
              className="site-layout-background"
              style={{
                margin: '24px 16px',
                padding: 24,
              }}
          >
            Content
          </Content>
        </Layout>
      </Layout>
  )
}


*/