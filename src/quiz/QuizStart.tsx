interface QuizProps {
    nextQuestion: () => void;
}

export default function QuizStart({nextQuestion}: QuizProps) {
    return (
        <section>
            <h1>HTML Color Quiz</h1>
            <p>Test your knowledge with this 10-question quiz on color names.</p>
            <button className="btn" onClick={nextQuestion}>Start Quiz</button>
        </section>
    )
}