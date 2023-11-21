import axios from "axios";
const ServerURL = "https://themobileplus.co.in:23000"

const getData = async (url) => {
    try {
      var response = await fetch(`${ServerURL}/${url}`);
      var result = await response.json();
      return result;
    } catch (e) {
      return { status: false };
    }
  };
  
  const postData = async (url, body) => {
    try {
      var response = await axios.post(`${ServerURL}/${url}`, body);
      var result = await response.data;
      return result;
    } catch (error) {
      return false;
    }
  };
  
  const putData = async (url, body) => {
    try {
      var response = await axios.put(`${ServerURL}/${url}`, body);
      var result = await response.data;
      return result;
    } catch (error) {
      return false;
    }
  };
  
  const deleteData = async (url, body) => {
    try {
      var response = await axios.delete(`${ServerURL}/${url}`, body);
      var result = await response.data;
      return result;
    } catch (error) {
      
      return false;
    }
  };
  
  export { ServerURL, postData, getData, putData, deleteData };
  