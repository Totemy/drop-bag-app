import axios from 'axios';

const API_KEY = "fc532f0b68f563638171396db1bc8485";
const API_URL = "https://api.novaposhta.ua/v2.0/json/";

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Api-Key': API_KEY,
  },
});
export async function getAdress() {
  try {
    const response = await axiosInstance.get("", {
      apiKey: API_KEY,
      modelName: "Address",
      calledMethod: "getSettlements",
      methodProperties: {

      }
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}
export default axiosInstance;