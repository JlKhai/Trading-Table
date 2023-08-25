import axios from "axios";

const TOKEN = "cjjor9pr01qorp963cigcjjor9pr01qorp963cj0";

export default axios.create({
  baseURL: "https://finnhub.io/api/v1",
  params: {
    token: TOKEN,
  },
});
