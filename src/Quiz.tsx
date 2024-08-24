import React from 'react';
import QuizStart from './QuizStart';
import QuizMultipleChoiceNames from './QuizMultipleChoiceNames';
import './Quiz.scss'

export default function Quiz() {
    const [questions, setQuestions] = React.useState(newQuiz());
	const [currentQuestion, setCurrentQuestion] = React.useState(-1);
	const [score, setScore] = React.useState<number>(0);

    function newQuiz() {
        const questionsArray = [];
        for (let i = 0; i < 10; i++) {
            questionsArray.push({'id': i, 'correct': false});
        }
        return questionsArray;
    }

	React.useEffect(() => {
		console.log(score);
	}, [score]);

	function nextQuestion() {
		setCurrentQuestion(currentQuestion + 1);
	}

	return (
		<div className="quiz">
            {currentQuestion < 0 && <QuizStart nextQuestion={nextQuestion} />}
			{currentQuestion === 0 && <QuizMultipleChoiceNames
                questions={questions} setQuestions={setQuestions}
                currentQuestion={currentQuestion} setCurrentQuestion={setCurrentQuestion}
                color="coral" colorOptions={["lightsalmon", "orangered", "coral", "pink"]}
            />}
		</div>
	)
}