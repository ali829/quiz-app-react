import { ACTION } from "../App";

const NextQuestion = ({ dispatch, answer, index, numQuestions }) => {
  if (answer === null) return null;
  if (index < numQuestions - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => {
          dispatch({ type: ACTION.MOVE_TO_NEXT });
        }}>
        Next
      </button>
    );
  if (index === numQuestions - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => {
          dispatch({ type: ACTION.FINISH_QUIZ });
        }}>
        finish
      </button>
    );
};

export default NextQuestion;
