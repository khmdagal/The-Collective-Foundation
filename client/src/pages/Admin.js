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
import { DeleteOutlined } from "@ant-design/icons";
import { Button, Select, Form } from "antd";

import "antd/dist/reset.css";

function AdminPage() {
	const [pagesData, setPagesData] = useState([]);
	const [modules, setModules] = useState([]);
	const [selectedModuleType, setSelectedModuleType] = useState("");
	const [loading, setloading] = useState(false);

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

	return (
		<>
			<img
				className="logo"
				src={clientIcon}
				alt="Logo of Collective Foundation"
			/>
			{pagesData.map((eachPage) => (
				<div>
					<h1 className="each-page-title">{eachPage.title}</h1>
					<div>
						{eachPage.modules.map((module) => (
							<div>
								<h3>{module.type}</h3>
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
						))}
						<div>
							<label>Add a Module:</label>
							<Select
								onChange={handleModuleChanges}
								placeholder={"Select a Module"}
								mode="multiple"
								className="Select-menu"
								allowClear
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
			<Button type="dashed">Add page</Button>
			<Form onFinish={onFinish}>
				<Form.Item
					input="username"
					placeholder="Enter your name"
					label="Username"
					name="username"
					rules={[
						{
							required: true,
							message: "Please input your username!",
						},
					]}
				></Form.Item>
				<Form.Item
					input="password"
					placeholder="Enter your password"
					label="password"
					name="password"
					rules={[
						{
							required: true,
							message: "Please input your password!",
						},
					]}
				></Form.Item>
				<Form.Item>
					<Button  type="primary" htmlType="submit">
						Login
					</Button>
				</Form.Item>
			</Form>
		</>
	);
}

export default AdminPage;
