import Book from './book';
import num from 'numeral';
import {isString} from 'lodash';
import {format} from './util';

let book = new WeakMap(),
	chapter = new WeakMap(),
	verse = new WeakMap(),
	tokens = new WeakMap();

export default class Verse {
	get book() {
		return book.get(this);
	}

	get chapter() {
		return chapter.get(this);
	}

	get verse() {
		return verse.get(this);
	}

	constructor(b, ch = 1, v = 1) {
		if (isString(b)) {
			b = Book[b];
		}

		if (b instanceof Book) {
			book.set(this, b);
		} else {
			throw new Error('invalid book');
		}

		ch = parseInt(ch);
		chapter.set(this, ch);

		v = parseInt(v);
		verse.set(this, v);

		tokens.set(this, {
			c: ch,
			n: v
		});
	}

	format(str = '{B} {c}:{n}') {
		return format(book.get(this).format(str), tokens.get(this));
	}
}
