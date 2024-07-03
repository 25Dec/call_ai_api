import { Client, logger } from 'camunda-external-task-client-js';

// configuration for the Client:
//  - 'baseUrl': url to the Process Engine
//  - 'logger': utility to automatically log important events
const config = {
	baseUrl: 'http://45.76.153.161:8080/engine-rest',
	use: logger,
};

// create a Client instance with custom configuration
const client = new Client(config);

client.subscribe('GenerateConTent', async function ({ task, taskService }) {
	await gemini('Tạo danh sách từ khóa theo chủ đề thú cưng');
	// complete the task
	try {
		await taskService.complete(task);
		console.log('I completed my task successfully!!');
	} catch (e) {
		console.error(`Failed completing my task, ${e}`);
	}
});
