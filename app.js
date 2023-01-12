const config = require('config');
const { exec } = require('node:child_process');
const readline = require('readline');
const winston = require('winston');

const logger = winston.createLogger({
	level: 'info',
	format: winston.format.json(),
	transports: [
		new winston.transports.Console(),
		new winston.transports.File({ filename: '/run/shm/tps.log' }),
	],
  });

readline.emitKeypressEvents(process.stdin); 
process.stdin.on('keypress', function (ch, key) {

	// logger.info('ch', ch);
	// logger.info('key', key);

	if (key && key.ctrl && key.name == 'c') {
		process.exit();
	}

	let char = '';

	if (!key || key.name === undefined) {
		char = ch;
	} else {

		if (key.name >= 'a' && key.name <= 'z' && key.shift) {
			char = key.sequence;
		} else {
			char = key.name;
		}

	}

	if (config.aliases[char]) {
		char = config.aliases[char];
	}

	if (config.mapping[char]) {
		logger.info(config.mapping[char]);

		let cmd = '';

		if (process.platform === 'darwin') {
			cmd = 'afplay';
		} else {
			cmd = 'aplay';
		}

		const target = `data/${config.mapping[char]}.wav`;
		exec(`${cmd} ${target}`);

	} else {
		logger.info(`${char} is not mapped`);
	}

});
 
if (process.stdin.isTTY) {
	process.stdin.setRawMode(true);
}
process.stdin.resume();

logger.info('totalpartysolutions started');