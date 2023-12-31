import { useQuiz } from "../contexts/QuizContext";

const NextQuestion = () => {
  const { index, dispatch, answer, numQuestions, ACTION } = useQuiz();
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
