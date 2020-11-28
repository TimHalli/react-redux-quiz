import axios from "axios";

export default axios.create({
  baseURL: 'https://react-quiz-86b57.firebaseio.com/'
})