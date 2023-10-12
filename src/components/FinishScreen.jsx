import { ACTION } from "../App";
const FinishScreen = ({ points, maxPossiblePoints, highScore, dispatch }) => {
  const percentage = (points / maxPossiblePoints) * 100;
  return (
    <>
      <p className="result">
        You scored <strong>{points}</strong> out of {maxPossiblePoints}{" "}
        {Math.ceil(percentage)} %
      </p>
      <p className="highscore">(High score : {highScore} Points)</p>
      <button
        className="btn btn-ui"
        onClick={() => {
          dispatch({ type: ACTION.RESTART_QUIZ });
        }}>
        Restart Quiz
      </button>
    </>
  );
};

export default FinishScreen;
