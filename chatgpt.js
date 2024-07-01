import OpenAI from 'openai';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const dotenv = require('dotenv').config();
const openai = new OpenAI();

const chatgpt = async () => {
	const completion = await openai.chat.completions.create({
		messages: [{ role: 'system', content: 'Con mèo có mấy chân?' }],
		model: 'gpt-3.5-turbo-1106',
	});

	console.log(completion.choices[0]);
};

chatgpt();
