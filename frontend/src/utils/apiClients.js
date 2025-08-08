import axios from "axios";

export const postRequest = async (url, data) => {
  const res = await axios.post(url, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.data;
};

export const putRequest = async (url, data) => {
  const res = await axios.put(url, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.data;
};

export const deleteRequest = async (url) => {
  const res = await axios.delete(url);
  return res.data;
};
