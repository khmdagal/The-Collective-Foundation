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
import {
	DeleteOutlined,
	HomeOutlined,
	PoweroffOutlined,
	UserOutlined,
	UnorderedListOutlined,
	PlusOutlined,
} from "@ant-design/icons";
import { Button, Select, Menu } from "antd";

import AddPageForm from "./AddPageForm";


import "antd/dist/reset.css";

function AdminPage() {
	const [pagesData, setPagesData] = useState([]);
	const [modules, setModules] = useState([]);
	const [selectedModuleType, setSelectedModuleType] = useState("");
	const [loading, setloading] = useState(false);

	
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

	return (
		<div className="admin-page-container">
			<header className="header">
				<img
					className="logo"
					src={clientIcon}
					alt="Logo of Collective Foundation"
				/>
				<h1>Admin Panel</h1>
				<p> The Collective Foundation</p>
			</header>

			<div className="menu">
				<Menu
					onClick={({ key }) => {}}
					items={[
						{ label: "Home", key: "/", icon: <HomeOutlined /> },
						{ label: "Pages", key: "Pages", icon: <UnorderedListOutlined /> },
						{ label: "Edit Profile", key: "profile", icon: <UserOutlined /> },
						{
							label: "Logout",
							key: "logout",
							icon: <PoweroffOutlined />,
							danger: true,
						},
					]}
				></Menu>
			</div>
			<div className="cards">
				{pagesData.map((eachPage) => (
					<div>
						<div className="each-card">
							<h1 className="each-page-title">{eachPage.title}</h1>
							{eachPage.modules.map((module) => (
								<div>
									<h3>{module.type}</h3>
								</div>
							))}
							<div>
								<Select
									onChange={handleModuleChanges}
									placeholder={"Select a Module"}
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
							<Button icon={<PlusOutlined />} type="primary">
								Add Module
							</Button>
							<Button
								icon={<DeleteOutlined />}
								className="delete-button"
								loading={loading}
								type="ghost"
								onClick={() =>
									handleModuleDelete(eachPage.title, module.details.record_id)
								}
							>
								Delete Module
							</Button>
						</div>
					</div>
				))}
				<Button 
				onClick={() => {AddPageForm}
				}
				icon={<PlusOutlined />} 
				type="primary">
					Add page
				</Button>
			</div>
			<footer className="footer">
				<p>© 2021 The Collective Foundation</p>
			</footer>
		</div>
	);
}

export default AdminPage;


