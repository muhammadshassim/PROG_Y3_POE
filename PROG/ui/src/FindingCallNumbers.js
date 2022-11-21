import './FindingCallNumbers.css';
import {useEffect, useRef, useState} from "react";
import axios from 'axios';
import {Link} from "react-router-dom";

function IdentifyingArea() {
    const [start, setStart] = useState(false);
    const [classes, setClasses] = useState([]);
    const categories = useRef([]);
    const subCategories = useRef([]);
    const topLevelQuestion = useRef({});
    const thirdLevelQuestion = useRef({});
    const stages = {
        topLevel: 0,
        secondLevel: 1,
        thirdLevel: 2,
        success: 3,
        failure: 4
    }
    const [stage, setStage] = useState(stages.topLevel);
    const [score, setScore] = useState(0);
    
    useEffect(() => {
        axios.get('http://localhost:5058/FindingCallNumbers/GetRandomThirdLevel').then((response) => {
            setClasses(response.data);
        })
    }, [])
    
    const startGame = () => {
        const randomTopLevelIndex = Math.floor(Math.random() * 4);
        topLevelQuestion.current = classes[randomTopLevelIndex];
        const randomThirdLevelIndex = Math.floor(Math.random() * topLevelQuestion.current.categories[0].subCategories.length);
        thirdLevelQuestion.current = topLevelQuestion.current.categories[0].subCategories[randomThirdLevelIndex];
        console.log({topLevelQuestion, thirdLevelQuestion});
        setStart(true);
    }
    
    const topLevelCheck = (topLevel) => {
        let indexes = [];
        if (topLevel.id === topLevelQuestion.current.id) {
            setScore((score) => score + 3);
            while (categories.current.length < topLevelQuestion.current.categories.length) {
                const randomSecondLevelIndex = Math.floor(Math.random() * topLevelQuestion.current.categories.length);
                if (!indexes.includes(randomSecondLevelIndex)) {
                    indexes.push(randomSecondLevelIndex);
                    categories.current.push(topLevel.categories[randomSecondLevelIndex]);
                }
            }
            console.log({categories});
            setStage(stages.secondLevel);
        } else {
            if (score < 1) {
                setStage(stages.failure);
            }
            setScore((score) => score - 1);
        }
    }
    
    const secondLevelCheck = (secondLevel) => {
        const success = false;
        const topLevelCategories = topLevelQuestion.current.categories;
        const selectedCategory = topLevelCategories.find((category) => category.id === secondLevel.id);
        const selectedSubCategories = selectedCategory.subCategories.find((subCategory) => subCategory.id === thirdLevelQuestion.current.id);
        if (selectedSubCategories) {
            console.log({selectedCategory, selectedSubCategories});
            subCategories.current.push(selectedSubCategories);
            while (subCategories.current.length < 4) {
                const randomThirdLevelIndex = Math.floor(Math.random() * selectedCategory.subCategories.length);
                if (!subCategories.current.includes(selectedCategory.subCategories[randomThirdLevelIndex])) {
                    subCategories.current.push(selectedCategory.subCategories[randomThirdLevelIndex]);
                }
            }
            setScore((score) => score + 3);
            setStage(stages.thirdLevel);
        } else {
            if (score < 1) {
                setStage(stages.failure);
            }
            setScore((score) => score - 1);
        }
    }
    
    const thirdLevelCheck = (thirdLevel) => {
        if (thirdLevel.id === thirdLevelQuestion.current.id) {
            setScore((score) => score + 3);
            setStage(stages.success);
        } else {
            if (score < 1) {
                setStage(stages.failure);
            }
            setScore((score) => score - 1);
        }
    }
    
    return (
        <div className="App">
            <div className="card">
                {start ? (
                    <>
                        <div className="rowOne">
                            <div className="colLeft">
                                {
                                    stage === stages.topLevel ? (
                                        classes.map((topLevel) => {
                                            return <h3 className="answer" onClick={() => topLevelCheck(topLevel)} key={topLevel.id}>{topLevel.id}</h3>
                                        })
                                    ): stage === stages.secondLevel ? (
                                        categories.current.map((topLevel) => {
                                            return <h3 className="answer" onClick={() => secondLevelCheck(topLevel)} key={topLevel.id}>{topLevel.id}</h3>
                                        })
                                    ): stage === stages.thirdLevel ? (
                                        subCategories.current.map((topLevel) => {
                                            return <h3 className="answer" onClick={() => thirdLevelCheck(topLevel)} key={topLevel.id}>{topLevel.id}</h3>
                                        })
                                    ): stage === stages.success ? (
                                        <h3 className="answer success">You Win!</h3>
                                    ): stage === stages.failure ? (
                                    <h3 className="answer failure">Try Again :(</h3>
                                    ): null
                                }
                            </div>
                            <div className="colRight">
                                <div className="score">
                                    Score: <div>{score}</div>
                                </div>
                                <Link to="/">Reset</Link>
                            </div>
                        </div>
                        <div className="rowTwo">
                            <div className="col">
                                <h3>Please select the correct {stage === stages.topLevel ? "TOP LEVEL" : stage === stages.secondLevel ? "SECOND LEVEL" : "THIRD LEVEL"} domain from the options above.</h3>
                                <div className="question">
                                    <h3>{thirdLevelQuestion.current.title}</h3>
                                </div>
                            </div>
                        </div>
                    </>
                ): <button className="startBtn" onClick={() => startGame()}>START</button>}
            </div>
        </div>
    );
}

export default IdentifyingArea;
