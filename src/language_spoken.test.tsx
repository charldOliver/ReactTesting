import languageCodes from "./utils/languageCodes"
import httpRequest from "./utils/http-request"
import "regenerator-runtime/runtime";

// Destructure the required parts from languageCodes
const { languageInEnglish, alpha2Codes } = languageCodes;

/**
 * Capitalizes the first letter of a string and converts the rest to lowercase.
 */
const capitalize = (language: string) => {
  return language.charAt(0).toUpperCase() + language.toLowerCase().slice(1)
}

/**
 * Converts a language name (e.g., "Spanish") to its alpha-2 code (e.g., "es").
 */
const getAlpha2Code = (language: string) => {
  const codeIndex = languageInEnglish.indexOf(language);
  const alpha2Code = codeIndex && alpha2Codes[codeIndex];
  return alpha2Code;
}

/**
 * Takes an array of country objects and converts it to an array of just country names.
 */
const countryExtractor = (countriesObject: { [x: string]: { name: any; }; }) => {
  const countriesArray = []
  for (const country in countriesObject) {
      countriesArray.push(countriesObject[country].name)
  }
  return countriesArray
}

/**
 * Asynchronously fetches a list of countries where a language is spoken using its alpha-2 code.
 */
const countryListLookup = async (alpha2Code: string | number) => {
  try {
      const res = await httpRequest(alpha2Code)
      return countryExtractor(res.data)
  } catch (error) {  
    return undefined;  
  } 
}

/**
 * Formats the final response string.
 */
const getResponse = (language: string, listOfPlaces: string | any[] | undefined) => {
  const count = Array.isArray(listOfPlaces) ? listOfPlaces.length : 0;
  return `${capitalize(language)} is spoken in ${count} countries around the world`
}

export{
  capitalize,
  getAlpha2Code,
  countryExtractor,
  countryListLookup,
  getResponse
};