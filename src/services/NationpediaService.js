import axios from "axios";

export const service = {};

service.getCountriesList = async () => {
  return axios.get("https://restcountries.com/v3.1/all");
};

service.getCountryNameList = async () => {
  return axios.get("https://restcountries.com/v3.1/all?fields=name");
};

service.getCountryInfo = async (name) => {
  return axios.get(`https://restcountries.com/v3.1/name/${name}?fullText=true`);
};

service.getCountriesByRegion = async (region) => {
  return axios.get(`https://restcountries.com/v3.1/region/${region}`);
};
