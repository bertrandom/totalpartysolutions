const config = require('config');
const { exec } = require('node:child_process');
const readline = require('readline');

readline.emitKeypressEvents(process.stdin); 
process.stdin.on('keypress', function (ch, key) {

	if (key && key.ctrl && key.name == 'c') {
		process.exit();
	}

	let char = '';

	if (!key || key.name === undefined) {
		char = ch;
	} else {
		char = key.name;
	}

	if (config.mapping[char]) {
		console.log(config.mapping[char]);

		let cmd = '';

		if (process.platform === 'darwin') {
			cmd = 'afplay';
		} else {
			cmd = 'aplay';
		}

		const target = `data/${config.mapping[char]}.wav`;
		exec(`${cmd} ${target}`);

	} else {
		console.log(`${char} is not mapped`);
	}

});
 
if (process.stdin.isTTY) {
	process.stdin.setRawMode(true);
}
process.stdin.resume();

console.log('totalpartysolutions started');