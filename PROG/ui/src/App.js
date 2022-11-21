import './App.css';
import {
    Routes,
    Route,
    Link
} from "react-router-dom";
import IdentifyingArea from "./IdentifyingArea";
import FindingCallNumbers from "./FindingCallNumbers";
import ReplacingBooks from "./ReplacingBooks";

const Home = () => (
    <div className="home">
        <Link to="/replacing-books">
            <div className="homeCard">
                Replacing Books
            </div>
        </Link>
        <Link to="/identifying-area">
            <div className="homeCard">
                Identifying Area
            </div>
        </Link>
        <Link to="/finding-call-numbers">
            <div className="homeCard">
                Finding Call Numbers
            </div>
        </Link>
    </div>
)

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Home />} />                
                <Route path="/replacing-books" element={<ReplacingBooks />} />
                <Route path="/identifying-area" element={<IdentifyingArea />} />                
                <Route path="/finding-call-numbers" element={<FindingCallNumbers />} />
            </Routes>
        </div>
    );
}

export default App;
