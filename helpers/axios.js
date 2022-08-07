import axios from "axios";

const fetchWebsite = async (url, headers) => {
  // const instance = axios.create({
  //   baseURL: url,
  //   // timeout: 1000,
  //   headers: headers,
  // });
  // instance.defaults.headers.post["Access-Control-Allow-Origin"] = "*";

  // return instance.get();

  return fetch(url, {
    mode: "cors",
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  });
};

export { fetchWebsite };
