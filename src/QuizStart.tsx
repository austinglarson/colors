interface QuizProps {
    nextQuestion: () => void;
}

export default function QuizStart({nextQuestion}: QuizProps) {
    return (
        <section>
            <h1>HTML Color Quiz</h1>
            <button onClick={nextQuestion}>Start Quiz</button>
        </section>
    )
}