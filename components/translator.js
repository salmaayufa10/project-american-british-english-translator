const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require('./american-to-british-titles.js');
const britishOnly = require('./british-only.js');

const reverse = (obj) =>
  Object.fromEntries(Object.entries(obj).map(([k, v]) => [v, k]));

const escapeRegex = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

class Translator {
  constructor() {
    this.americanToBritish = {
      ...americanOnly,
      ...americanToBritishSpelling,
      ...americanToBritishTitles
    };
    this.britishToAmerican = {
      ...britishOnly,
      ...reverse(americanToBritishSpelling),
      ...reverse(americanToBritishTitles)
    };
  }

  // Menjaga huruf kapital dari teks asli
  matchCase(original, replacement) {
    const origWords = original.split(' ');
    const repWords = replacement.split(' ');
    if (origWords.length === repWords.length && origWords.length > 1) {
      return repWords
        .map((w, i) =>
          /^[A-Z]/.test(origWords[i]) ? w.charAt(0).toUpperCase() + w.slice(1) : w
        )
        .join(' ');
    }
    if (/^[A-Z]/.test(original)) {
      return replacement.charAt(0).toUpperCase() + replacement.slice(1);
    }
    return replacement;
  }

  translate(text, locale) {
    const toBritish = locale === 'american-to-british';
    const dict = toBritish ? this.americanToBritish : this.britishToAmerican;

    const stash = [];
    const hold = (s) => {
      stash.push(`<span class="highlight">${s}</span>`);
      return `\u0001${stash.length - 1}\u0001`;
    };

    let result = text;

    // Format waktu
    if (toBritish) {
      result = result.replace(/\b(\d{1,2}):(\d{2})\b/g, (m, h, mi) => hold(`${h}.${mi}`));
    } else {
      result = result.replace(/\b(\d{1,2})\.(\d{2})\b/g, (m, h, mi) => hold(`${h}:${mi}`));
    }

    // Kata, frasa, dan gelar (frasa terpanjang dulu)
    const keys = Object.keys(dict).sort((a, b) => b.length - a.length);
    for (const key of keys) {
      const regex = new RegExp(
        `(?<![A-Za-z0-9])${escapeRegex(key)}(?![A-Za-z0-9])`,
        'gi'
      );
      result = result.replace(regex, (match) =>
        hold(this.matchCase(match, dict[key]))
      );
    }

    return result.replace(/\u0001(\d+)\u0001/g, (m, i) => stash[i]);
  }
}

module.exports = Translator;