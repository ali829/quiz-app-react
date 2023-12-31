import { useQuiz } from "../contexts/QuizContext";
const StartScreen = () => {
  const { ACTION, numQuestions, dispatch } = useQuiz();
  return (
    <div className="start">
      <h2>Welcome To The React Quiz !</h2>
      <h3>{numQuestions} Question to test your React mastery</h3>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: ACTION.START_QUIZ })}>
        {"Let's start"}
      </button>
    </div>
  );
};

export default StartScreen;
