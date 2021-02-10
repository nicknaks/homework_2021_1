'use strict';

/**
 * Функция переводит римские числа в десятичные и обратно (в зависимости от того, что было в функцию передано)
 * @param number - число для перевода в другую систему счисления
 * @return {string|null} - результат перевода
 */
const roman = (number) => {
  if (typeof number === 'number' || Number.isInteger(Number(number))) {
    return fromArabicToRoman(number);
  }

  if (typeof number === 'string') {
    if (!checkEntryParams(number)) {
      return null;
    }

    return fromRomanToArabic(number);
  }

  return null;
}

const romanDigits = {
  M: 1000,
  CM: 900,
  D: 500,
  CD: 400,
  C: 100,
  XC: 90,
  L: 50,
  XL: 40,
  X: 10,
  IX: 9,
  V: 5,
  IV: 4,
  I: 1
};

function checkEntryParams(str) {
  let lastDigit;
  let counter = 0;

  for (const digit of str.toUpperCase()) {
    if (!romanDigits.hasOwnProperty(digit)) {
      return false;
    }

    if (lastDigit === undefined || digit === lastDigit) {
      counter++
      lastDigit = digit;

      if (counter > 4) {
        return false;
      }
    } else {
      counter = 0;
    }
  }

  return true;
}

function fromArabicToRoman(number) {
  if (number < 1) return '';

  let result = '';

  for (const key in romanDigits) {
    while (number >= romanDigits[key]) {
      result += key;
      number -= romanDigits[key];
    }
  }

  return result;
}

function fromRomanToArabic(str) {
  return str.toUpperCase().split('').reduce(function (previousValue, currentItem, index, arr) {
    const firstDigit = romanDigits[arr[index]];
    const secondDigit = romanDigits[arr[index + 1]];
    const thirdDigit = romanDigits[arr[index + 2]];

    if (secondDigit && thirdDigit && firstDigit <= secondDigit && secondDigit < thirdDigit)
      return null;

    if (secondDigit > firstDigit) {
      return previousValue - firstDigit;
    } else {
      return previousValue + firstDigit;
    }
  }, 0);
}
