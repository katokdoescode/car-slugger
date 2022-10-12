import { CarSlugger } from ".";
const slugger = new CarSlugger();

console.log('Simple string: ', slugger.translateCyrillic('Привет мир'));
console.log('Slug: ', slugger.getSlug('LADA (ВАЗ) 2211 4x4'));
