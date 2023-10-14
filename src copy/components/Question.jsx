import Option from "./Option";
const Question = ({ question, answer, dispatch }) => {
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
