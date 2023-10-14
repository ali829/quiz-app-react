import "./index.css";
import Container from "./components/Container";
import Header from "./components/Header";
import Loader from "./components/Loader";
import Error from "./components/Error";
import StartScreen from "./components/StartScreen";
import Question from "./components/Question";
import NextQuestion from "./components/NextQuestion";
import FinishScreen from "./components/FinishScreen";
import Progress from "./components/Progress";
import { useEffect } from "react";
import { useQuiz } from "./contexts/QuizContext";

function App() {
  const { ACTION, dispatch, status } = useQuiz();
  useEffect(() => {
    fetch("http://localhost:9000/questions")
      .then((res) => res.json())
      .then((data) =>
        dispatch({ type: ACTION.DATA_RECEIVED, payload: { data } })
      )
      .catch(() => dispatch({ type: ACTION.DATA_FAILED }));
  }, []);
  return (
    <div className="app">
      <Header />
      <Container>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && <StartScreen />}
        {status === "active" && (
          <>
            <Progress />
            <Question />
            <NextQuestion />
          </>
        )}
        {status === "finished" && <FinishScreen />}
      </Container>
    </div>
  );
}

export default App;
