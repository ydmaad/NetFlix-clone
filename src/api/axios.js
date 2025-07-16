import axios from "axios";

const instance = axios.create({
  baseURL: "http://api.themoviedb.org/3",
  params: {
    api_key: "dbb370a3882dd27207df745bc2b7efb1",
    language: "ko-KR",
  },
});

export default instance;
