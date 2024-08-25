import React from 'react';
import { Question } from '../Quiz'

interface QuizProps {
    question: Question;
    setQuestions: React.Dispatch<React.SetStateAction<Question[]>>;
    currentQuestionId: number;
    nextQuestion: () => void;
}

export default function QuizMultipleChoiceNames({question, setQuestions, currentQuestionId, nextQuestion}: QuizProps) {
	const [formData, setFormData] = React.useState({color: ''});
	const [message, setMessage] = React.useState('');
	const id = React.useId();

	function updateFormData(event: React.ChangeEvent<HTMLInputElement>) {
		setFormData(prevFormData => {
			return {
				...prevFormData,
				color: event.target.value
			}
		});
	}

	function submitAnswer(event: React.MouseEvent<HTMLButtonElement>) {
		event.preventDefault();

		if (formData.color === '') {
			setMessage('Please select a color.');
			return;
		} else if (formData.color === question.answer.name) {
			setMessage('Correct!');
		} else {
			setMessage(`Incorrect! The correct color is ${question.answer.name}.`);
		}

		setQuestions(prevQuestions =>
			prevQuestions.map(q =>
				q.id === currentQuestionId
					? {...q, 'correct': formData.color === question.answer.name}
					: q
			)
		);
	}

	return (
		<section>
            <h2>Question {currentQuestionId + 1}</h2>
			<p>What color is this?</p>
			<div className="color-swatch" style={{backgroundColor: question.answer.hex}}></div>

			<form>
				{question.options && question.options.map(colorOption =>
					<div key={colorOption.name}>
						<input 
							type="radio"
							id={id + '-' + colorOption.name}
							name="color"
							value={colorOption.name}
							checked={formData.color === colorOption.name}
							onChange={updateFormData}
						/>
						<label htmlFor={id + '-' + colorOption}>{colorOption.name.toLowerCase()}</label>
						<br />
					</div>
				)}
				{question.correct === null ?
					<button className="btn" onClick={submitAnswer}>Submit</button> :
					<button className="btn" onClick={nextQuestion}>Next</button>}
				{message !== '' && <p>{message}</p>}
			</form>
		</section>
	)
}