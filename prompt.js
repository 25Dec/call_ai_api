import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const readline = require('readline');

const requireInputFromUser = (prefixText) => {
	let inputFromUser = '';
	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout,
	});
	inputFromUser = rl.question(`${prefixText}: `, (input) => {
		rl.close();
		return input;
	});

	return inputFromUser;
};

console.log(requireInputFromUser('Lập danh sách từ khóa'));
