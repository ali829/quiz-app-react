export const initialState = {
  questions: [],
  // loading , error , ready , active , finished
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highScore: 0,
};
export const ACTION = {
  DATA_RECEIVED: "data-received",
  DATA_FAILED: "data-failed",
  START_QUIZ: "start-quiz",
  UPDATE_ANSWER: "update-answer",
  MOVE_TO_NEXT: "move-to-next",
  FINISH_QUIZ: "finish-quiz",
  RESTART_QUIZ: "restart-quiz",
};
export const reducer = (state, action) => {
  switch (action.type) {
    case ACTION.DATA_RECEIVED:
      return { ...state, questions: action.payload.data, status: "ready" };
    case ACTION.DATA_FAILED:
      return { ...state, status: "error" };
    case ACTION.START_QUIZ:
      return { ...state, status: "active" };
    case ACTION.UPDATE_ANSWER:
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case ACTION.MOVE_TO_NEXT:
      return { ...state, index: state.index + 1, answer: null };
    case ACTION.FINISH_QUIZ:
      return {
        ...state,
        status: "finished",
        highScore:
          state.points > state.highScore ? state.points : state.highScore,
      };
    case ACTION.RESTART_QUIZ:
      return {
        ...initialState,
        questions: state.questions,
        status: "ready",
        highScore: state.highScore,
      };

    default:
      throw new Error("something goes wrong...");
  }
};
