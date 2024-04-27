const formatData = (questionData) => {
  const result = questionData.map((item) => {
    const question0bject = { question: item.question };
    const answers = [...item.incorrect_answers];
    const correctAnswerIndex = Math.floor(Math.random() * 4);
    answers.splice(correctAnswerIndex, 0, item.correct_answer);
    question0bject.answers = answers;
    question0bject.correctAnswerIndex = correctAnswerIndex;
    return question0bject;
  });

  return result;
};

export default formatData;
