import Book from './book';
import Verse from './verse';
import {each, groupBy, sortBy, values, noop} from 'lodash';
import {hyphens} from './util';

let verses = new WeakMap(),
	certainty = new WeakMap();

function groupByCh(vs) {
	return groupBy(vs, (v) => {
		return v.chapter;
	});
}

function groupByBook(vs) {
	return sortBy(values(groupBy(vs, (v) => {
		return v.book.id;
	})), (v) => {
		return v[0].book.index;
	});
}

export default class Reference {

	get verses() {
		return verses.get(this);
	}

	get certainty() {
		return certainty.get(this);
	}

	constructor(ref) {
		verses.set(this, []);

		this.addRef(ref);
	}

	addVerse(...args) {
		let b = null,
			c = null,
			v = null;

		switch(args.length) {
			case 1:
				[v] = args;
				break;
			case 3:
				[b,c,v] = args;
				v = new Verse(b, c, v);
				break;
		}

		if (v instanceof Verse) {
			verses.get(this).push(v);
		} else {
			throw new Error('invalid verse');
		}
	}

	addRef(...args) {
		each(args, (ref) => {
			let [book, vs, certain] = Book.parse(ref);

			// certainty.set(this, certain);

			(vs.match(/\d+\s*\:\s*\d+[^;:]+/g) || []).forEach((part) => {
				let [ch,vs] = part.split(/\s*:\s*/);
				ch = parseInt(ch);

				vs.split(new RegExp('\\s*[^\\d'+hyphens+']+\\s*')).forEach((vpart) => {
					let [vstart,vend] = vpart.split(new RegExp('['+hyphens+']+'));
					vend = vend || vstart;
					[vstart, vend] = [Math.min(vstart, vend), Math.max(vstart, vend)];

					for (let v = vstart; v <= vend; v++) {
						this.addVerse(book, ch, v);
					}
				});
			});
		});

		return this;
	}

	format(str) {
		let ret = [];

		each(
			groupByBook(verses.get(this)),
		(bGroup) => {
			let chRet = [],
				b;

			each(
				sortBy(
					groupByCh(bGroup),
				(group, ch) => {
					return ch;
				}),
			(vs) => {
				let vRet = [],
					vList = sortBy(vs, (v) => {
							return v.verse;
						});

				for (let i = 0; i < vList.length; i++) {
					let rstart = vList[i].verse,
						rend = rstart;

					while (vList[i + 1] && vList[i + 1].verse - vList[i].verse == 1) {
						rend = vList[i + 1].verse;
						i++;
					}
					vRet.push(rstart == rend ? rstart + '' : rstart + '-' + rend);
				}

				chRet.push(vs[0].chapter + ':' + vRet.join(', '));
				b = vs[0].book;
			});

			ret.push(b.format(str) + ' ' + chRet.join('; '));
		});

		return ret.join('\n');
	}
}
