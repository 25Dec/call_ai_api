import { Client, logger } from 'camunda-external-task-client-js';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const dotenv = require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

const gemini = async (prompt) => {
	console.log('hi');
	const result = await model.generateContent(prompt);
	const response = await result.response;
	const text = response.text();

	console.log(text);
};

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
	await gemini();
	// complete the task
	try {
		await taskService.complete(task);
		console.log('I completed my task successfully!!');
	} catch (e) {
		console.error(`Failed completing my task, ${e}`);
	}
});
