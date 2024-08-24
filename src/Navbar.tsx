import { Link } from 'react-router-dom';
import './Navbar.scss';

export default function Navbar() {
    return (
        <div className="navbar">
            <nav>
                <Link to="/" className="logo">Colors</Link>
                <Link to="/">Home</Link>
                <Link to="/quiz">Quiz</Link>
            </nav>
        </div>
    );
}