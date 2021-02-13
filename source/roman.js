'use strict';

const ROMAN_DIGITS = {
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

/**
 * Функция проверяет входные параметры и переводит римские числа в десятичные и обратно (в зависимости от того, что было в функцию передано)
 * @param {string|number} value - число для перевода в другую систему счисления
 * @return {string|null|number} - результат перевода
 */
const roman = (value) => {
  if (typeof value === 'number' || Number.isInteger(Number(value)) && value != null) {
    return fromArabicToRoman(value);
  }

  if (typeof value === 'string' && !(/[^XIVLCDM]/i.test(value) || /\b(.)\1{4,}/i.test(value))) {
    return fromRomanToArabic(value);
  }

  return null;
}

/**
 * Функция переводит арабские числа в римские
 * @param {number} number - число для перевода в римкую систему счисления
 * @return {string} - результат перевода
 */
const fromArabicToRoman = (number) => {
  if (number < 1) {
    return '';
  }

  return Object.entries(ROMAN_DIGITS).reduce((result, [romanDigit, value])=> {
    while (number >= value) {
      result += romanDigit
      number -= value
    }
    return result
  }, '');
}

/**
 * Функция переводит римские числа в арабские
 * @param {string} str - строка, состоящая из римских цифр, для перевода в арабские
 * @return {number} - результат перевода
 */
const fromRomanToArabic = (str) => {
  return str.toUpperCase().split('').reduce((previousValue, currentItem, index, arr) => {
    const secondDigit = ROMAN_DIGITS[arr[index + 1]];
    const thirdDigit = ROMAN_DIGITS[arr[index + 2]];

    if (secondDigit && thirdDigit && ROMAN_DIGITS[currentItem] <= secondDigit && secondDigit < thirdDigit) {
      return null;
    }

    return secondDigit > ROMAN_DIGITS[currentItem] ? previousValue - ROMAN_DIGITS[currentItem] : previousValue + ROMAN_DIGITS[currentItem];
  }, 0);
}
