// Import các thư viện cần thiết
import { createRequire } from 'module';
import { Client, logger } from 'camunda-external-task-client-js';
//

// Phần này xài chung cho cả ChatGPT lẫn Gemini (ko qtrong nên ko cần qtam)
const require = createRequire(import.meta.url);
const dotenv = require('dotenv').config();
//

// Phần này là yêu cầu người dùng nhập vào từ khóa
const readline = require('readline');

const requireInputFromUser = (prefixText) => {
	const inputFromUser = '';
	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout,
	});
	rl.question(`${prefixText}: `, (input) => {
		inputFromUser = input;
		rl.close();
	});
	return inputFromUser;
};
//

// Phần này của Gemini
const { GoogleGenerativeAI } = require('@google/generative-ai');
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' }); // Sử dụng mô hình Gemini 1.5

const gemini = async (prompt) => {
	const result = await model.generateContent(prompt); // Yêu cầu mô hình tạo câu trả lời cho input mà người dùng nhập vào
	const response = await result.response; // Bóc tách giá trị response từ biến result để lấy câu trả lời của Gemini
	return response.text(); // Trả về câu trả lời của Gemini cho người dùng
};
//

// Phần này của Camunda
const config = {
	baseUrl: 'http://45.76.153.161:8080/engine-rest',
	use: logger,
};

const client = new Client(config);

client.subscribe('BotVietBai', async function ({ task, taskService }) {
	// const keywords = requireInputFromUser();
	const output = await gemini(
		`Viet cho toi bai viet 100 chu ve tu khoa: ${keywords}`
	);

	try {
		await taskService.complete(task);
		console.log('I completed my task successfully!!');
	} catch (e) {
		console.error(`Failed completing my task, ${e}`);
	}
});
//
