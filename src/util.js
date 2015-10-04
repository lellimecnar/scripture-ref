import {snakeCase, keys} from 'lodash';
import num from 'numeral';

export var hyphens = '-‐‑‒–—−';

export function constCase(str) {
	return snakeCase(''.replace.call(str, new RegExp('[^\\w\\s'+hyphens+']+', 'g'), '')).toUpperCase();
}

export function format(str, tokens) {
	return str.replace(new RegExp('\\{(' + keys(tokens).join('|') + ')\\|?([^\\}]*)\\}', 'g'), (...m) => {
		let tok = tokens[m[1]];
		if (!!m[2]) {
			tok = (''+tok).replace(/(\d+)/, (...n) => {
				return num(n[1]).format(m[2]);
			})
		}
		return tok;
	});
}
