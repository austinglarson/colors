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
		} else if (formData.color === question.answer.hex) {
			setMessage('Correct!');
		} else {
			const optionNumber = (question.options || []).findIndex(({ name }) => name === question.answer.name) ?? '';
			setMessage(`Incorrect! The correct color is option ${optionNumber + 1}.`);
		}

		setQuestions(prevQuestions =>
			prevQuestions.map(q =>
				q.id === currentQuestionId
					? {...q, 'correct': formData.color === question.answer.hex}
					: q
			)
		);
	}

	return (
		<section>
            <h2>Question {currentQuestionId + 1}</h2>
			<p>What color is {question.answer.name.toLowerCase()}?</p>

			<form>
				{question.options && question.options.map(colorOption =>
					<div key={colorOption.hex}>
						<input 
							type="radio"
							id={id + '-' + colorOption.hex}
							name="color"
							value={colorOption.hex}
							checked={formData.color === colorOption.hex}
							onChange={updateFormData}
						/>
						<label className="color-swatch" htmlFor={id + '-' + colorOption} style={{backgroundColor: colorOption.hex}}></label>
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