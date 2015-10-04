import leven from 'leven';
import Volume from './volume';
import {each, isString} from 'lodash';
import {constCase, format} from './util';

let index = new WeakMap(),
	id = new WeakMap(),
	vol = new WeakMap(),
	tokens = new WeakMap(),
	numerals = ['first', 'second', 'third', 'fourth'],
	numRegExp = new RegExp('^('+numerals.join('|')+')', 'i'),
	bookNames = {};

function sanitize(str) {
	return ''.trim.call(str || '').toLowerCase().replace(/[^\da-z]+/gi, '');
}

export default class Book {

	static parse(ref) {
		if (!isString(ref)) {
			return [null, '', 0];
		}

		var [,str] = ref.match(/^(\d?[^\d]+)\s*\d*/),
			vs = ref.replace(str, '').trim(),
			dist = 99999999,
			book, val, certainty;

		str = sanitize(str).replace(numRegExp, (key) => {
			return numerals.indexOf(sanitize(key)) + 1;
		});

		each(bookNames, (b, name) => {
			val = leven(str, name);

			if (val < dist) {
				dist = val;
				book = Book[b];
			}
		});

		certainty = Math.round(((str.length - dist) / str.length) * 100, 2);

		return [book, vs, certainty];
	}

	get id() {
		return id.get(this);
	}

	get index() {
		return index.get(this);
	}

	get Volume() {
		return vol.get(this);
	}

	constructor(book) {
		let key = constCase(book.b);

		bookNames[sanitize(book.B)] = key;
		bookNames[sanitize(book.b)] = key;

		index.set(this, book._index);

		delete book._index;

		id.set(this, key);

		vol.set(this, Volume[book._vol]);

		delete book._vol;

		tokens.set(this, book);

		Book[key] = this;
	}

	format(str = '{B}') {
		return format(vol.get(this).format(str), tokens.get(this));
	}
}

each([
	{
		BB: 'Genesis',
		B: 'Genesis',
		b: 'Gen.',

		_vol: 'OT'
	},
	{
		BB: 'Exodus',
		B: 'Exodus',
		b: 'Ex.',

		_vol: 'OT'
	},
	{
		BB: 'Leviticus',
		B: 'Leviticus',
		b: 'Lev.',

		_vol: 'OT'
	},
	{
		BB: 'Numbers',
		B: 'Numbers',
		b: 'Num.',

		_vol: 'OT'
	},
	{
		BB: 'Deuteronomy',
		B: 'Deuteronomy',
		b: 'Deut.',

		_vol: 'OT'
	},
	{
		BB: 'Joshua',
		B: 'Joshua',
		b: 'Josh.',

		_vol: 'OT'
	},
	{
		BB: 'Judges',
		B: 'Judges',
		b: 'Judg.',

		_vol: 'OT'
	},
	{
		BB: 'Ruth',
		B: 'Ruth',
		b: 'Ruth',

		_vol: 'OT'
	},
	{
		BB: '1 Samuel',
		B: '1 Samuel',
		b: '1 Sam.',

		_vol: 'OT'
	},
	{
		BB: '2 Samuel',
		B: '2 Samuel',
		b: '2 Sam.',

		_vol: 'OT'
	},
	{
		BB: '1 Kings',
		B: '1 Kings',
		b: '1 Kgs.',

		_vol: 'OT'
	},
	{
		BB: '2 Kings',
		B: '2 Kings',
		b: '2 Kgs.',

		_vol: 'OT'
	},
	{
		BB: '1 Chronicles',
		B: '1 Chronicles',
		b: '1 Chr.',

		_vol: 'OT'
	},
	{
		BB: '2 Chronicles',
		B: '2 Chronicles',
		b: '2 Chr.',

		_vol: 'OT'
	},
	{
		BB: 'Ezra',
		B: 'Ezra',
		b: 'Ezra',

		_vol: 'OT'
	},
	{
		BB: 'Nehemiah',
		B: 'Nehemiah',
		b: 'Neh.',

		_vol: 'OT'
	},
	{
		BB: 'Esther',
		B: 'Esther',
		b: 'Esth.',

		_vol: 'OT'
	},
	{
		BB: 'Job',
		B: 'Job',
		b: 'Job',

		_vol: 'OT'
	},
	{
		BB: 'Psalms',
		B: 'Psalms',
		b: 'Ps.',

		_vol: 'OT'
	},
	{
		BB: 'Proverbs',
		B: 'Proverbs',
		b: 'Prov.',

		_vol: 'OT'
	},
	{
		BB: 'Ecclesiastes',
		B: 'Ecclesiastes',
		b: 'Eccl.',

		_vol: 'OT'
	},
	{
		BB: 'Song of Solomon',
		B: 'Song of Solomon',
		b: 'Song',

		_vol: 'OT'
	},
	{
		BB: 'Isaiah',
		B: 'Isaiah',
		b: 'Isa.',

		_vol: 'OT'
	},
	{
		BB: 'Jeremiah',
		B: 'Jeremiah',
		b: 'Jer.',

		_vol: 'OT'
	},
	{
		BB: 'Lamentations',
		B: 'Lamentations',
		b: 'Lam.',

		_vol: 'OT'
	},
	{
		BB: 'Ezekiel',
		B: 'Ezekiel',
		b: 'Ezek.',

		_vol: 'OT'
	},
	{
		BB: 'Daniel',
		B: 'Daniel',
		b: 'Dan.',

		_vol: 'OT'
	},
	{
		BB: 'Hosea`',
		B: 'Hosea`',
		b: 'Hosea',

		_vol: 'OT'
	},
	{
		BB: 'Joel',
		B: 'Joel',
		b: 'Joel',

		_vol: 'OT'
	},
	{
		BB: 'Amos',
		B: 'Amos',
		b: 'Amos',

		_vol: 'OT'
	},
	{
		BB: 'Obadiah',
		B: 'Obadiah',
		b: 'Obad.',

		_vol: 'OT'
	},
	{
		BB: 'Jonah',
		B: 'Jonah',
		b: 'Jonah',

		_vol: 'OT'
	},
	{
		BB: 'Micah',
		B: 'Micah',
		b: 'Micah',

		_vol: 'OT'
	},
	{
		BB: 'Nahum',
		B: 'Nahum',
		b: 'Nahum',

		_vol: 'OT'
	},
	{
		BB: 'Habakkuk',
		B: 'Habakkuk',
		b: 'Hab.',

		_vol: 'OT'
	},
	{
		BB: 'Zechariah',
		B: 'Zechariah',
		b: 'Zech.',

		_vol: 'OT'
	},
	{
		BB: 'Malachi',
		B: 'Malachi',
		b: 'Mal.',

		_vol: 'OT'
	},
	{
		BB: 'Matthew',
		B: 'Matthew',
		b: 'Matt.',

		_vol: 'NT'
	},
	{
		BB: 'Mark',
		B: 'Mark',
		b: 'Mark',

		_vol: 'NT'
	},
	{
		BB: 'Luke',
		B: 'Luke',
		b: 'Luke',

		_vol: 'NT'
	},
	{
		BB: 'John',
		B: 'John',
		b: 'John',

		_vol: 'NT'
	},
	{
		BB: 'Acts',
		B: 'Acts',
		b: 'Acts',

		_vol: 'NT'
	},
	{
		BB: 'Romans',
		B: 'Romans',
		b: 'Rom.',

		_vol: 'NT'
	},
	{
		BB: '1 Corinthians',
		B: '1 Corinthians',
		b: '1 Cor.',

		_vol: 'NT'
	},
	{
		BB: '2 Corinthians',
		B: '2 Corinthians',
		b: '2 Cor.',

		_vol: 'NT'
	},
	{
		BB: 'Galatians',
		B: 'Galatians',
		b: 'Gal.',

		_vol: 'NT'
	},
	{
		BB: 'Ephesians',
		B: 'Ephesians',
		b: 'Eph.',

		_vol: 'NT'
	},
	{
		BB: 'Philippians',
		B: 'Philippians',
		b: 'Philip.',

		_vol: 'NT'
	},
	{
		BB: 'Colossians',
		B: 'Colossians',
		b: 'Col.',

		_vol: 'NT'
	},
	{
		BB: '1 Thessalonians',
		B: '1 Thessalonians',
		b: '1 Thes.',

		_vol: 'NT'
	},
	{
		BB: '2 Thessalonians',
		B: '2 Thessalonians',
		b: '2 Thes.',

		_vol: 'NT'
	},
	{
		BB: '1 Timothy',
		B: '1 Timothy',
		b: '1 Tim.',

		_vol: 'NT'
	},
	{
		BB: '2 Timothy',
		B: '2 Timothy',
		b: '2 Tim.',

		_vol: 'NT'
	},
	{
		BB: 'Titus',
		B: 'Titus',
		b: 'Titus',

		_vol: 'NT'
	},
	{
		BB: 'Philemon',
		B: 'Philemon',
		b: 'Philem.',

		_vol: 'NT'
	},
	{
		BB: 'Hebrews',
		B: 'Hebrews',
		b: 'Heb.',

		_vol: 'NT'
	},
	{
		BB: 'James',
		B: 'James',
		b: 'James',

		_vol: 'NT'
	},
	{
		BB: '1 Peter',
		B: '1 Peter',
		b: '1 Pet.',

		_vol: 'NT'
	},
	{
		BB: '2 Peter',
		B: '2 Peter',
		b: '2 Pet.',

		_vol: 'NT'
	},
	{
		BB: '1 John',
		B: '1 John',
		b: '1 Jn.',

		_vol: 'NT'
	},
	{
		BB: '2 John',
		B: '2 John',
		b: '2 Jn.',

		_vol: 'NT'
	},
	{
		BB: '3 John',
		B: '3 John',
		b: '3 Jn.',

		_vol: 'NT'
	},
	{
		BB: 'Jude',
		B: 'Jude',
		b: 'Jude',

		_vol: 'NT'
	},
	{
		BB: 'Revelation',
		B: 'Revelation',
		b: 'Rev.',

		_vol: 'NT'
	},
	{
		BB: '1 Nephi',
		B: '1 Nephi',
		b: '1 Ne.',

		_vol: 'BOM'
	},
	{
		BB: '2 Nephi',
		B: '2 Nephi',
		b: '2 Ne.',

		_vol: 'BOM'
	},
	{
		BB: 'Jacob',
		B: 'Jacob',
		b: 'Jacob',

		_vol: 'BOM'
	},
	{
		BB: 'Enos',
		B: 'Enos',
		b: 'Enos',

		_vol: 'BOM'
	},
	{
		BB: 'Jarom',
		B: 'Jarom',
		b: 'Jarom',

		_vol: 'BOM'
	},
	{
		BB: 'Omni',
		B: 'Omni',
		b: 'Omni',

		_vol: 'BOM'
	},
	{
		BB: 'Words of Mormon',
		B: 'Words of Mormon',
		b: 'W of M',

		_vol: 'BOM'
	},
	{
		BB: 'Mosiah',
		B: 'Mosiah',
		b: 'Mosiah',

		_vol: 'BOM'
	},
	{
		BB: 'Alma',
		B: 'Alma',
		b: 'Alma',

		_vol: 'BOM'
	},
	{
		BB: 'Helaman',
		B: 'Helaman',
		b: 'Hel.',

		_vol: 'BOM'
	},
	{
		BB: '3 Nephi',
		B: '3 Nephi',
		b: '3 Ne.',

		_vol: 'BOM'
	},
	{
		BB: '4 Nephi',
		B: '4 Nephi',
		b: '4 Ne.',

		_vol: 'BOM'
	},
	{
		BB: 'Mormon',
		B: 'Mormon',
		b: 'Morm.',

		_vol: 'BOM'
	},
	{
		BB: 'Ether',
		B: 'Ether',
		b: 'Ether',

		_vol: 'BOM'
	},
	{
		BB: 'Moroni',
		B: 'Moroni',
		b: 'Moro.',

		_vol: 'BOM'
	},
	{
		BB: 'Doctrine and Covenants',
		B: 'Doctrine and Covenants',
		b: 'D&C',

		_vol: 'DC'
	},
	{
		BB: 'Official Declaration',
		B: 'Official Declaration',
		b: 'OD',

		_vol: 'DC'
	},
	{
		BB: 'Moses',
		B: 'Moses',
		b: 'Moses',

		_vol: 'POGP'
	},
	{
		BB: 'Abraham',
		B: 'Abraham',
		b: 'Abr.',

		_vol: 'POGP'
	},
	{
		BB: 'Joseph Smith–Matthew',
		B: 'Joseph Smith–Matthew',
		b: 'JS–M',

		_vol: 'POGP'
	},
	{
		BB: 'Joseph Smith–History',
		B: 'Joseph Smith–History',
		b: 'JS–H',

		_vol: 'POGP'
	},
	{
		BB: 'Articles of Faith',
		B: 'Articles of Faith',
		b: 'A of F',

		_vol: 'POGP'
	}
], (book, i) => {
	book._index = i;
	return new Book(book);
});
