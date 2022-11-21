import './IdentifyingArea.css';
import {useEffect, useRef, useState} from "react";
import axios from 'axios';

function IdentifyingArea() {
    const [start, setStart] = useState(false);
    const [data, setData] = useState([]);
    const [calls, setCalls] = useState([]);
    const [descriptions, setDescriptions] = useState([]);
    const [selectedCall, setSelectedCall] = useState(null);
    const [selectedDescription, setSelectedDescription] = useState(null);
    const [matched, setMatched] = useState("N/A");
    const [incorrectDescription, setIncorrectDescription] = useState([]);
    const [score, setScore] = useState(0);

    const shuffle = (array) => {
        let currentIndex = array.length, randomIndex;
        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]];
        }
        return array;
    }

    const setRandomCallNumbersAndDescription = () => {
        const callNumbers = [];
        const descriptions = [];
        const incorrectDescription = [];

        // set random call numbers and descriptions
        while (callNumbers.length < 4) {
            const random = Math.floor(Math.random() * 10);
            if (callNumbers.includes(data[random].callNumber)) continue;
            callNumbers.push(data[random].callNumber);
            descriptions.push(data[random].description);
        }

        // set incorrect descriptions
        const remaining = data.filter(item => !callNumbers.includes(item.callNumber));
        while (incorrectDescription.length < 3) {
            const random = Math.floor(Math.random() * remaining.length);
            if (incorrectDescription.includes(remaining[random].description)) continue;
            incorrectDescription.push(remaining[random].description);
        }

        setCalls(shuffle(callNumbers));
        setDescriptions(shuffle(descriptions));
        setIncorrectDescription(shuffle(incorrectDescription));
    }

    const matchCallNumberAndDescription = (a, b) => {
        if (a === null || b === null) return;
        //filter
        const filtered = data.filter(item => item.callNumber === a && item.description === b);
        console.log("filtered", filtered.length);
        // match
        if (filtered.length === 0) {
            setMatched("TRY AGAIN!");
            if (score <= 2) setScore(0);
            setScore(score - 2);
            return;
        }
        if (filtered[0].callNumber === a && filtered[0].description === b) {
            console.log("Matched");
            //remove matched call number and description
            const newCalls = calls.filter((call) => call !== a);
            const newDescriptions = descriptions.filter((description) => description !== b);
            setScore(score + 3);
            setCalls(newCalls);
            setDescriptions(newDescriptions);
            setSelectedCall("Please select a call number");
            setSelectedDescription("Please select a description");
            setMatched("CORRECT!");
        }
    }

    useEffect(() => {
        axios.get('http://localhost:5058/CallDescription/GetAll').then((response) => {
            setData(response.data);
        })
    }, [])

    const selectCallNumber = (value) => {
        setSelectedCall(value);
    }

    const selectDescription = (value) => {
        setSelectedDescription(value);
    }

    const initialise = () => {
        setRandomCallNumbersAndDescription();
        setStart(true);
    }

    return (
        <div className="App">
            <div className="card">
                <div className="rowOne">
                    {start ? (
                        <>
                            <div className="rowOneColOne">
                                {calls.map((item) =>
                                    <div
                                        className={`item ${selectedCall === item ? 'selectedCall' : ''}`}
                                        key={item}
                                        onClick={() => selectCallNumber(item)}>
                                        {item}
                                    </div>
                                )}
                            </div>
                            <div className="rowOneColTwo">
                                {descriptions.map((item) =>
                                    <div
                                        className={`item ${selectedDescription === item ? 'selectedDescription' : ''}`}
                                        key={item}
                                        onClick={() => selectDescription(item)}>
                                        {item}
                                    </div>
                                )}
                                {incorrectDescription.map((item) =>
                                    <div
                                        className={`item ${selectedDescription === item ? 'selectedDescription' : ''}`}
                                        key={item}
                                        onClick={() => selectDescription(item)}>
                                        {item}
                                    </div>
                                )}
                            </div>
                        </>
                    ): <div className="startBtn" onClick={() => initialise()}>Start</div>}
                </div>
                <div className="rowTwo">
                    <div className="rowTwoRowOne">
                        <div className="rowTwoRowOneColOne">
                            <div className="label">Selected Call Number</div>
                            <div className="value">{selectedCall === null ? "Please select a call number" : selectedCall}</div>
                        </div>
                        <div className="rowTwoRowOneColTwo">
                            <div className="label">Selected Description</div>
                            <div className="value">{selectedDescription === null ? "Please select a description" : selectedDescription}</div>
                        </div>
                        <div className="rowTwoRowOneColThree">
                            <div className="label">Result</div>
                            <div className="value">{matched}</div>
                        </div>
                    </div>
                    <div className="rowTwoRowTwo">
                        <div className="match" onClick={() => matchCallNumberAndDescription(selectedCall, selectedDescription)}>Match</div>
                        <div className="reset" onClick={() => window.location.reload()}>Reset</div>
                        <div className="score">Score: <span>{score}</span></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default IdentifyingArea;
