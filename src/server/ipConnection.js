const axios = require("axios");

const ipConnection = () => {
  const options = {
    method: "GET",
    url: "https://ipinfo.io/json",
    headers: {
      Authorization: `Bearer ${process.env.IP_API_TOKEN}`,
    },
  };
  return axios
    .request(options)
    .then((response) => response)
    .catch((err) => err);
};

module.exports = { ipConnection };
