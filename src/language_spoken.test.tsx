import languageCodes from "./utils/languageCodes"
import httpRequest from "./utils/http-request"
import "regenerator-runtime/runtime";

const { languageInEnglish, alpha2Codes } = languageCodes;

const capitalize = (language: string) => {
  if (!language) return "";
  const lower = language.toLowerCase();
  return lower.charAt(0).toUpperCase() + lower.slice(1);
}

const getAlpha2Code = (language: string) => {
  if (!language) return undefined;
  const normalized = language.toLowerCase();
  const normalizedLangs = languageInEnglish.map((l: string) => l.toLowerCase());
  const codeIndex = normalizedLangs.indexOf(normalized);
  if (codeIndex === -1) return undefined;
  return alpha2Codes[codeIndex];
}

const countryExtractor = (countriesArray: Array<{ name: string }>) => {
  if (!Array.isArray(countriesArray)) return [];
  return countriesArray.map(c => c && c.name).filter(Boolean);
}

const countryListLookup = async (alpha2Code: string | number) => {
  try {
    const res = await httpRequest(alpha2Code);
    return countryExtractor(res.data);
  } catch (error) {
    return undefined;
  }
}

const getResponse = (language: string, listOfPlaces: string[] | undefined) => {
  const count = Array.isArray(listOfPlaces) ? listOfPlaces.length : 0;
  return `${capitalize(language)} is spoken in ${count} countries around the world`;
}

export {
  capitalize,
  getAlpha2Code,
  countryExtractor,
  countryListLookup,
  getResponse
};
