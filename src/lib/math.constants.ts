export const articles = {
    "Pizza slice": "🍕",
    "Doughnut": "🍩",
    "Lollipop": "🍭",
    "Rocket": "🚀",
    "Honeybee": "🐝",
    "Egg": "🥚",
    "Cupcake": "🧁",
    "Mushroom": "🍄",
    "Watermelon": "🍉",
    "Apple": "🍎",
    "Banana": "🍌",
    "Carrot": "🥕",
    "Sunflower": "🌻",
    "Rabbit": "🐇",
    "Dog": "🐕",
    "Sheep": "🐑",
    "Fish": "🐟",
    "Butterfly": "🦋",
};

// Number to words mapping for text-to-speech
const ONES = [
    "zero",
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine"
];

const TEENS = [
    "ten",
    "eleven",
    "twelve",
    "thirteen",
    "fourteen",
    "fifteen",
    "sixteen",
    "seventeen",
    "eighteen",
    "nineteen"
];

const TENS = [
    "",
    "",
    "twenty",
    "thirty",
    "forty",
    "fifty",
    "sixty",
    "seventy",
    "eighty",
    "ninety"
];

/**
 * Convert numbers to words for text-to-speech (0-100)
 * @param num - Number to convert (0-100)
 * @returns Word representation of the number
 * @example
 * numberToWords(5) // "five"
 * numberToWords(12) // "twelve"
 * numberToWords(25) // "twenty five"
 */
export const numberToWords = (num: number): string => {
    if (num < 10) return ONES[num];
    if (num < 20) return TEENS[num - 10];
    if (num < 100) {
        const tenDigit = Math.floor(num / 10);
        const oneDigit = num % 10;
        return oneDigit === 0 ? TENS[tenDigit] : `${TENS[tenDigit]} ${ONES[oneDigit]}`;
    }
    return num.toString();
};