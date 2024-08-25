import React from 'react';
import QuizStart from './quiz/QuizStart';
import QuizMultipleChoiceColors from './quiz/QuizMultipleChoiceColors';
import QuizMultipleChoiceNames from './quiz/QuizMultipleChoiceNames';
import QuizColorNaming from './quiz/QuizColorNaming';
import colorData from './data/colors.json'
import { Color } from './App'
import { colorFamilyData } from './App'
import './Quiz.scss'

const commonColors = ["SALMON", "RED", "PINK", "CORAL", "ORANGE", "GOLD", "YELLOW", "LAVENDER",
    "PURPLE","LIME","GREEN", "AQUAMARINE", "SKYBLUE", "BLUE", "TAN", "GRAY", "SLATEGRAY"];

export interface Question {
    type: string;
    id: number;
    correct: boolean | null;
    answer: Color;
    options: Color[] | null;
}

export default function Quiz() {
    const [questions, setQuestions] = React.useState(newQuiz());
	const [currentQuestionId, setCurrentQuestionId] = React.useState(-1);
    console.log('Render Quiz');

    React.useEffect(() => {
        console.log(questions);
    }, [questions]);

    function newQuiz() {
        const questionsArray: Question[] = [];
        for (let i = 0; i < 10; i++) {
            if (i == 4 || i == 9) {
                const commonColor = getCommonColor();
                questionsArray.push({'type': 'QuizColorNaming', 'id': i, 'correct': null, ...commonColor});
            } else if (i % 2 == 0) {
                const multipleChoiceColors = getMultipleChoiceColors();
                questionsArray.push({'type': 'QuizMultipleChoiceColors', 'id': i, 'correct': null, ...multipleChoiceColors});
            } else {
                const multipleChoiceColors = getMultipleChoiceColors();
                questionsArray.push({'type': 'QuizMultipleChoiceNames', 'id': i, 'correct': null, ...multipleChoiceColors});
            }
        }
        return questionsArray;
    }

	function nextQuestion() {
		setCurrentQuestionId(currentQuestionId + 1);
	}

    interface quizColors {
        answer: Color;
        options: Color[] | null;
    }

    function getMultipleChoiceColors(): quizColors {
        const randomColorFamily = colorFamilyData[Math.floor(Math.random() * colorFamilyData.length)];

        let shuffledColors: Color[] = [...randomColorFamily.colors].sort(() => 0.5 - Math.random());
        shuffledColors = shuffledColors.slice(0, 4);
        const color: Color = shuffledColors[Math.floor(Math.random() * shuffledColors.length)];

        return {answer: color, options: shuffledColors};
    }

    function getCommonColor(): quizColors {
        const defaultColor = colorData[colorData.length - 1]; // black
        const randomCommonColorName = commonColors[Math.floor(Math.random() * commonColors.length)];
        const randomCommonColor: Color = colorData.find(({ name }) => name === randomCommonColorName) ?? defaultColor;

        return {answer: randomCommonColor, options: null};
    }

	return (
		<div className="quiz">
            {currentQuestionId < 0 && <QuizStart nextQuestion={nextQuestion} />}
            {questions.map((questionData, i) => {
                if (currentQuestionId !== i) return;

                switch (questionData.type) {
                    case 'QuizMultipleChoiceColors':
                        return <QuizMultipleChoiceColors
                            question={questions[i]} setQuestions={setQuestions}
                            currentQuestionId={currentQuestionId} nextQuestion={nextQuestion}
                        />
                    case 'QuizMultipleChoiceNames':
                        return <QuizMultipleChoiceNames
                            question={questions[i]} setQuestions={setQuestions}
                            currentQuestionId={currentQuestionId} nextQuestion={nextQuestion}
                        />
                    case 'QuizColorNaming':
                        return <QuizColorNaming
                            question={questions[i]} setQuestions={setQuestions}
                            currentQuestionId={currentQuestionId} nextQuestion={nextQuestion}
                        />
                    default:
                        return <QuizMultipleChoiceColors
                            question={questions[i]} setQuestions={setQuestions}
                            currentQuestionId={currentQuestionId} nextQuestion={nextQuestion}
                        />
                }
            })}
		</div>
	)
}