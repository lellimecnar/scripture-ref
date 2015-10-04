import {each} from 'lodash';
import {constCase, format} from './util';

let id = new WeakMap(),
	index = new WeakMap(),
	tokens = new WeakMap(),
	books = new WeakMap();

export default class Volume {

	get id() {
		return id.get(this);
	}

	get index() {
		return index.get(this);
	}

	get books() {
		return books.get(this);
	}

	constructor(vol) {
		let key = constCase(vol.v);

		id.set(this, key);

		index.set(this, vol._index);

		delete vol._index;

		tokens.set(this, vol);

		Volume[key] = this;
	}

	format(str = '{V}') {
		return format(str, tokens.get(this));
	}
}

each([
	{
		V: 'The Old Testament',
		VV: 'The Old Testament',
		v: 'OT'
	},
	{
		V: 'The New Testament',
		VV: 'The New Testament',
		v: 'NT'
	},
	{
		V: 'The Book of Mormon',
		VV: 'The Book of Mormon: Another Testament of Jesus Christ',
		v: 'BOM'
	},
	{
		V: 'Doctrine and Coventants',
		VV: 'Doctrine and Coventants',
		v: 'D&C'
	},
	{
		V: 'Pearl of Great Price',
		VV: 'Pearl of Great Price',
		v: 'POGP'
	}
], (vol, i) => {
	vol._index = i;
	return new Volume(vol);
});
