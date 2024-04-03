import { CarSlugger } from "../";
const slugger = new CarSlugger();

const dict = {
	'1': 'one',
	'2': 'two',
	'3': 'three',
	' ': ' ',
};

console.log('Simple string: ', slugger.translateCyrillic('Привет мир'));
console.log('Simple latin string: ', slugger.translateLatin('Trans-atlantic ocean chile gazer 50 cents'));
console.log('Slug: ', slugger.getSlug('LADA (ВАЗ) 2211 4x4'));
console.log('Custom alphabet:', slugger.translateCustom('3 3 2 1 1 3', dict))
