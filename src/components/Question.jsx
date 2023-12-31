import Option from "./Option";
import { useQuiz } from "../contexts/QuizContext";
const Question = () => {
  const { questions, index, dispatch, answer } = useQuiz();
  const question = questions[index];
  return (
    <div>
      <h4>{question.question}</h4>

      <div className="options">
        {question.options.map((o, i) => (
          <Option
            key={i}
            option={o}
            answer={answer}
            dispatch={dispatch}
            index={i}
            correctOption={question.correctOption}
          />
        ))}
      </div>
    </div>
  );
};

export default Question;
