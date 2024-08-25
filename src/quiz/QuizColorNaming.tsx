import React from 'react';
import { Question } from '../Quiz'

interface QuizProps {
    question: Question;
    setQuestions: React.Dispatch<React.SetStateAction<Question[]>>;
    currentQuestionId: number;
    nextQuestion: () => void;
}

export default function QuizMultipleChoiceNames({question, setQuestions, currentQuestionId, nextQuestion}: QuizProps) {
	const [formData, setFormData] = React.useState('');
	const [message, setMessage] = React.useState('');

	function updateFormData(event: React.ChangeEvent<HTMLInputElement>) {
		setFormData(event.target.value);
	}

	function submitAnswer(event: React.MouseEvent<HTMLButtonElement>) {
		event.preventDefault();

		if (formData === '') {
			setMessage('Please type in a color name.');
			return;
		} else if (formData.toUpperCase() === question.answer.name) {
			setMessage('Correct!');
		} else {
			setMessage(`Incorrect! The correct color is ${question.answer.name}.`);
		}

		setQuestions(prevQuestions =>
			prevQuestions.map(q =>
				q.id === currentQuestionId
					? {...q, 'correct': formData.toUpperCase() === question.answer.name}
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
				<label htmlFor="colorName">Color Name</label>
				<input type="text" name="colorName" value={formData} onChange={updateFormData}></input>
				{question.correct === null ?
					<button className="btn" onClick={submitAnswer}>Submit</button> :
					<button className="btn" onClick={nextQuestion}>Next</button>}
				{message !== '' && <p>{message}</p>}
			</form>
		</section>
	)
}