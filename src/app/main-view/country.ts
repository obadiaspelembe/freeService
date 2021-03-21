interface ReginalBlock {
  acronym: String;
  name: String;
  otherAcronyms: Array<any>;
  otherNames: Array<any>;
}

interface Translation {
  de: String;
  es: String;
  fr: String;
  ja: String;
  it: String;
  br: String;
  pt: String;
  nl: String;
  hr: String;
  fa: String;
}

interface Language {
  iso639_1: String;
  iso639_2: String;
  name: String;
  nativeName: String;
}

interface Currency {
  code: String;
  name: String;
  symbol: String;
}

export interface Country {
  name: String;
  topLevelDomain: Array<String>;
  alpha2Code: String;
  alpha3Code: String;
  callingCodes: Array<String>;
  capital: String;
  altSpellings: Array<String>;
  region: String;
  subregion: String;
  population: Number;
  latlng: Array<Number>;
  demonym: String;
  area: Number;
  gini: Number;
  timezones: Array<String>;
  borders: Array<String>;
  nativeName: String;
  numericCode: Array<String>;
  currencies: Array<Currency>;
  languages: Array<Language>;
  translations: Translation;
  flag: String;
  regionalBlocs: [];
  cioc: String;
}
