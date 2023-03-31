import { Form, Input, Button } from "antd";
import "../pages/AddPageForm.css";

const PageTitleForm = () => {
	const onFinish = (values) => {
		console.log("Page Title:", values.title);
	};

	return (
		<Form onFinish={onFinish}>
			<Form.Item
				label="ADD PAGE"
				name="title"
				rules={[
					{
						required: true,
						message: "Please input your page title!",
					},
				]}
			>
				<Input placeholder="Enter page title" />
			</Form.Item>
			<Form.Item>
				<Button type="primary" htmlType="submit">
					Submit
				</Button>
			</Form.Item>
		</Form>
	);
};

export default PageTitleForm;