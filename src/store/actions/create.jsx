import axios from "./../../axios/axios-quiz";
import { CREATE_QUIZ_QUESTION, RESET_QUIZ_QUESTION } from "./actionsTypes";

export function createQuizQuestion(item) {
  return {
    type: CREATE_QUIZ_QUESTION,
    item,
  };
}
export function resetQuizQuestion() {
  return {
    type: RESET_QUIZ_QUESTION,
  };
}
export function finishCreateQuiz() {
  return async (dispatch, getState) => {
    await axios.post("/quizzes.json", getState().create.quiz);
    dispatch(resetQuizQuestion());
  };
}
