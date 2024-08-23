import React from 'react';

interface QuizProps {
    questions: Array<object>;
    setQuestions: Function;
    currentQuestion: number;
    setCurrentQuestion: Function;
    color: string;
    colorOptions: Array<string>;
}

export default function QuizMultipleChoiceNames({questions, setQuestions, currentQuestion, setCurrentQuestion, color, colorOptions}: QuizProps) {
	const [formData, setFormData] = React.useState({color: ''});
	const id = React.useId();

	function updateFormData(event: React.ChangeEvent<HTMLInputElement>) {
		setFormData(prevFormData => {
			return {
				color: event.target.value
			}
		});
	}
	console.log(formData);

	function submitAnswer(event: React.MouseEvent<HTMLButtonElement>) {
		event.preventDefault();

		if (formData.color === color) {
			console.log('Correct! :D');
			setQuestions(prevQuestions =>
                prevQuestions.map(question =>
                    question.id === currentQuestion
                        ? {...question, 'correct': true}
                        : question
                )
            );
		} else {
			console.log('Inorrect! :(');
		}
	}

	return (
		<section>
            <h2>Question {currentQuestion + 1}</h2>
			<p>What color is this?</p>
			<div className="color-swatch" style={{backgroundColor: color}}></div>

			<form>
				{colorOptions.map(colorOption =>
					<div key={colorOption}>
						<input 
							type="radio"
							id={id + '-' + colorOption}
							name="color"
							value={colorOption}
							checked={formData.color === colorOption}
							onChange={updateFormData}
						/>
						<label htmlFor={id + '-' + colorOption}>{colorOption}</label>
						<br />
					</div>
				)}
				<button onClick={submitAnswer}>Submit</button>
			</form>
		</section>
	)
}