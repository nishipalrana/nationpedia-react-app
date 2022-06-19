import axios from "axios";

export const service = {};

service.getCountriesList = async () => {
  return axios.get("https://restcountries.com/v3.1/all?fields=name,capital,flags");
};

service.getCountryNameList = async () => {
  return axios.get("https://restcountries.com/v3.1/all?fields=name");
};

service.getCountryInfo = async (name) => {
  return axios.get(`https://restcountries.com/v3.1/name/${name}`);
};

service.getCountriesByRegion = async (region) => {
  return axios.get(`https://restcountries.com/v3.1/region/${region}`);
};

service.getCurrencyList = async () => {
  return axios.get("https://restcountries.com/v3.1/all?fields=currencies");
};

service.getCountriesByCurrency =async (currency) => {
  return axios.get(`https://restcountries.com/v3.1/currency/${currency}?fields=name,capital,flags`);
};
