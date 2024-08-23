import React from 'react';

interface ModuleProps {
    score: string;
    setScore: Function;
    color: string;
    colorOptions: Array<string>;
}

export default function QuizMultipleChoiceNames({score, setScore, color, colorOptions}: ModuleProps) {
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
			setScore(score + 1);
		} else {
			console.log('Inorrect! :(');
		}
	}

	return (
		<div>
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
		</div>
	)
}