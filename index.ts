type Alphabet = {
	[key: string]: string;
}

export class CarSlugger {
	/**
	 * Alphabet needs to translate cyrillic letters to latin
	 */
	private dict: Alphabet = {
		'а': 'a',
		'б': 'b',
		'в': 'v',
		'г': 'g',
		'д': 'd',
		'е': 'e',
		'ё': 'yo',
		'ж': 'zh',
		'з': 'z',
		'и': 'i',
		'й': 'i',
		'к': 'k',
		'л': 'l',
		'м': 'm',
		'н': 'n',
		'о': 'o',
		'п': 'p',
		'р': 'r',
		'с': 's',
		'т': 't',
		'у': 'u',
		'ф': 'ph',
		'х': 'h',
		'ц': 'c',
		'ч': 'ch',
		'ш': 'sh',
		'щ': 'sh',
		'ъ': '',
		'ы': 'y',
		'ь': '',
		'э': 'e',
		'ю': 'u',
		'я': 'ya',
		' ': ' ',
	};

	/**
	 * Alphabet needs to translate latin letters to cyrillic
	 */
	private latinDict: Alphabet = {
		'a': 'а',
		'b': 'б',
		'c': 'к',
		'd': 'д',
		'e': 'е',
		'f': 'ф',
		'g': 'г',
		'h': 'х',
		'i': 'и',
		'j': 'дж',
		'k': 'к',
		'l': 'л',
		'm': 'м',
		'n': 'н',
		'o': 'о',
		'p': 'п',
		'q': 'к',
		'r': 'р',
		's': 'с',
		't': 'т',
		'u': 'у',
		'v': 'в',
		'w': 'в',
		'x': 'кс',
		'y': 'й',
		'z': 'з',
		' ': ' ',
	};

	/**
	 * Just replace space to score
	 *
	 * @param text string
	 * @returns string
	 */
	private wordsToSlug(text: string): string {
		return text.replaceAll(' ', '-');
	};


	/**
	 * Matches pairs like “4x4”,
	 * words contains lating letters,
	 * words contains cyrillic letters,
	 * any digit
	 *
	 * @example "LADA (ВАЗ) 2112 4x4" > {
	 * 	match #1: LADA
	 * 	match #2: ВАЗ
	 * 	match #3: 2112
	 * 	match #4: 4x4
	 * }
	 */
	private commonRegExp: RegExp = new RegExp(/([a-zA-Z]+\d+)|(\dx\d)|([a-zA-Z]+)|([а-яА-Я]+)|(\d+)/g);

	/**
	 * Matches all cyrillic letters
	 *
	 * @example ЛАДА ВАЗ > {
	 * 	match #1: ЛАДА
	 * 	match #2: ВАЗ
	 * }
	 */
	private cyrillicRegExp: RegExp = new RegExp(/[а-яА-Я]+/);
	private cyrillicUppercase: RegExp = new RegExp(/[А-Я]+/);
	private latinRegExp: RegExp = new RegExp(/[a-zA-Z]+/);
	private latinUppercase: RegExp = new RegExp(/[A-Z]+/);

	/**
	 * Returns new sliced lowercase string
	 * Cyrillic symbols translited to lating.
	 *
	 * @param text string
	 * @returns string
	 */
	private parseString(text: string): string {
		const words: string[] | null = text.match(this.commonRegExp);
		let output = '';

		words?.forEach((word: string, index: number, arr: any) => {
			if (this.cyrillicRegExp.test(word)) {

				for (let i = 0; i <= word.length; i++) {
					if (i < word.length) output += this.dict[word[i].toLocaleLowerCase()] ?? '';
					else output += arr.length === index + 1 ? '' : ' ';
				};
			} else {
				const length = arr.length;
				const trueIndex = index + 1;

				if (trueIndex !== length && trueIndex > 1 || (trueIndex === 1 && length > 1)) {
					output += word.toLowerCase() + ' ';
				} else if (trueIndex === length) {
					output += word.toLowerCase();
				};
			};
		});

		return output;
	};

	/**
	 * Easy translit cyrillic to latin
	 *
	 * @param text string
	 * @returns string
	 */
	public translateCyrillic(text: string): string {
		if (this.cyrillicRegExp.test(text)) {
			let output = '';
			for (let i = 0; i <= text.length; i++) {
				if (this.cyrillicUppercase.test(text[i])) output += this.dict[text[i].toLowerCase()].toUpperCase() ?? '';
				else output += this.dict[text[i]] ?? '';
			};
			return output;
		} else {
			throw new Error("String don't matches [а-яА-Я] regexp;")
		}
	}

	/**
	 * Easy translit latin to cyrillic
	 *
	 * @param text string
	 * @returns string
	 */
	public translateLatin(text: string): string {
		if (this.latinRegExp.test(text)) {
			let output = '';
			for (let i = 0; i <= text.length; i++) {
				if (this.latinUppercase.test(text[i])) output += this.latinDict[text[i].toLowerCase()].toUpperCase() ?? '';
				else output += this.latinDict[text[i]] ?? '';
			};
			return output;
		} else {
			throw new Error("String don't matches [a-zA-Z] regexp;");
		}
	}

	public translateCustom(text: string, dict: Alphabet): string {
		let output = '';

		for (let i = 0; i <= text.length; i++) {
			output += dict[text[i]] ?? '';
		}

		return output;
	}

	public testString(string: string) {
		console.debug('Input string: ', string);
		console.debug('Output string: ', this.parseString(string));
		console.debug('Output Slug: ',
			this.wordsToSlug(
				this.parseString(string)
			)
		);
	};

	/**
	 * Combined two functions
	 * Making slug from a simple and complex strings
	 *
	 * @param string string
	 * @returns string
	 *
	 * @example "LADA (ВАЗ) 2112 4x4" >>> "lada-vaz-2112-4x4"
	 */
	public getSlug(string: string): string {
		return this.wordsToSlug(
			this.parseString(string)
		);
	};
}
