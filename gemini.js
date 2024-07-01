import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const dotenv = require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

const gemini = async () => {
	const prompt = 'Con mèo có mấy chân?';
	const result = await model.generateContent(prompt);
	const response = await result.response;
	const text = response.text();

	console.log(text);
};

gemini();
