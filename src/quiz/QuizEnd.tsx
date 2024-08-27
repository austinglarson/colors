import { Question } from '../Quiz'

interface QuizEndProps {
    questions: Question[];
    newQuiz: () => Question[];
    setQuestions: React.Dispatch<React.SetStateAction<Question[]>>;
    setCurrentQuestionId: React.Dispatch<React.SetStateAction<number>>;
}

export default function QuizEnd({ questions, newQuiz, setQuestions, setCurrentQuestionId }: QuizEndProps) {
    function restartQuiz() {
        setQuestions(newQuiz());
        setCurrentQuestionId(0);
    }

    const correctQuestions = questions.filter((question: Question) => question.correct).reduce((sum, _) => sum + 1, 0);
    let quizMessage = 'Nice try!';
    if (correctQuestions >= 9) {
        quizMessage  = 'Amazing!';
    } else if (correctQuestions >= 7) {
        quizMessage  = 'Well done!';
    } else if (correctQuestions >= 4) {
        quizMessage  = 'Good job!';
    }

    return (
        <section>
            <h1>{quizMessage}</h1>
            <p>You scored {correctQuestions}/10!</p>
            <p>Try again?</p>
            <button className="btn" onClick={restartQuiz}>Start Quiz</button>
        </section>
    )
}