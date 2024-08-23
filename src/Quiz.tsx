import React from 'react';
import QuizMultipleChoiceNames from './QuizMultipleChoiceNames';
import './Quiz.scss'

interface QuizMultipleChoiceNamesProps {
    score: number;
    setScore: React.Dispatch<React.SetStateAction<number>>;
}

export default function Quiz() {
	const [currentModule, setCurrentModule] = React.useState(0);
	const [score, setScore] = React.useState<number>(0);

	React.useEffect(() => {
		console.log(score);
	}, [score]);

	function nextModule() {
		setCurrentModule(currentModule + 1);
	}

	return (
		<div>
			{currentModule === 0 && <QuizMultipleChoiceNames score={score} setScore={setScore} color="coral" colorOptions={["lightsalmon", "orangered", "coral", "pink"]} />}
			<button onClick={nextModule}>Next</button>
		</div>
	)
}