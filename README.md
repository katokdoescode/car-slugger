# CAR SLUGGER PACKAGE

Needs to convert complex string with car brand name or car model to slug.
Also can convert cyrillic letters to latin.

## Usage

```bash
# Install dependencies (only typescript needed)
$ npm i

# Generate JS if need
$ npm run build

# To see test cases try this:
$ node ./dist/test.js
```

### Simple translit cyrillic to latin

```JavaScript
import { CarSlugger } from "car-slugger";
const slugger = new CarSlugger();

console.log(slugger.translateCyrillic('Привет мир'));

// Output: "Privet mir"
```

### Simple translit latin to cyrillic

This one is really poor

```JavaScript
import { CarSlugger } from "car-slugger";
const slugger = new CarSlugger();

console.log(slugger.translateLatin('Transatlantic ocean'));

// Output: "Трансатлантик океан"
```

### Converting to slug

```JavaScript
import { CarSlugger } from "car-slugger";
const slugger = new CarSlugger();

console.log(slugger.getSlug('LADA (ВАЗ) 2211 4x4'));

// Output: lada-vaz-2211-4x4
```

### Using custom dict

```JavaScript
import { CarSlugger } from "car-slugger";
const slugger = new CarSlugger();

const dict = {
	'1': 'one',
	'2': 'two',
	'3': 'three',
	' ': ' ',

	const string = slugger.translateCustom('3 3 2 1 1 3', dict);
	// Output: "three three two one one three"
};
```
