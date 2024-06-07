import React, { useState, useEffect } from "react";
import "./Main.css";
import Carousel from "../Carousel/Carousel.jsx";
import { TypeAnimation } from "react-type-animation";
import { assets } from "../../assets/assets.js";
import { ClipLoader } from "react-spinners";

const Main = () => {
    const [question, setQuestion] = useState('');
    const [conversationHistory, setConversationHistory] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showCarousel, setShowCarousel] = useState(true);
    const [conversation, setConversation] = useState([]);
    const [questionClicked, setQuestionClicked] = useState(false);
    const [response, setResponse] = useState("");

    useEffect(() => {
        const interval = setInterval(() => {
            handleNext();
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    const updateGallery = (newItems) => {
        return newItems.map((item, index) => {
            return { ...item, className: `gallery-item-${index + 1} ` };
        });
    };

    const handleNext = () => {
        if (questionClicked) {
            setResponse("UIR stands for something cool!");
            setQuestionClicked(false);
        } else {
            setCarouselItems((prevItems) => {
                const newItems = [...prevItems];
                newItems.push(newItems.shift());
                return updateGallery(newItems);
            });
        }
    };

    const handleQuestionClick = () => {
        setQuestionClicked(true);
    };

    const handleInputChange = (e) => {
        setQuestion(e.target.value);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        if (question.trim() === '') {
            alert('Please enter a question');
            return;
        }

        setLoading(true);
        setError(null);

        await fetchResponse(question);

        setLoading(false);
    };

    const fetchResponse = async (question) => {
        try {
            const res = await fetch('https://jsonplaceholder.typicode.com/posts/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ question }),
            });

            const text = await res.text();
            if (res.ok) {
                const newEntry = { question, response: text };
                setConversationHistory((prev) => [...prev, newEntry]);
                setShowResult(true);
                setShowCarousel(false);
                setConversation(prevConversation => [...prevConversation, newEntry]);
                setQuestion('');
            } else {
                setError(`Error: ${res.statusText} - ${text}`);
            }
        } catch (networkError) {
            setError(`Network error: ${networkError.message}`);
        }
    };

    return (
        <div className="main">
            <div className='nav'>
                <p>AzureOpenAI</p>
                <button className='image-button' onClick={() => handleButtonClick('User Icon clicked')}>
                    <img src={assets.user_icon} alt='User Icon' />
                </button>
            </div>

            <div className="main-container">
                {!showResult
                    ? <>
                        <div className='greet'>
                            <p><span>
                                Azul,
                                <TypeAnimation
                                    sequence={[" UIR.", " JIT."]}
                                    cursorColor="#c770f0"
                                    speed={250}
                                    repeat={Infinity}
                                />
                            </span></p>
                            <p>How can I help you today?</p>
                        </div>
                        {loading && <ClipLoader color="#c770f0" />}
                        {error && <p className='error'>{error}</p>}
                        {showCarousel && (
                            <Carousel
                                handleQuestionClick={handleQuestionClick}
                                questionClicked={questionClicked}
                                response={response}
                            />
                        )}
                    </>
                    : null
                }

                <div className='main-bottom'>
                    {conversation.length > 0 &&
                        <div className='conversation'>
                            {conversationHistory.map((convo, index) => (
                                <div key={index} className='conversation-entry'>
                                    <div className='question-title'>
                                        <img className='question-img' width={40} src={assets.user_icon} alt='User Icon' />
                                        <p>Q{index + 1}: {convo.question}</p>
                                    </div>
                                    <div className='response-data'>
                                        <img src={assets.uir_icon} width={40} className='response-image' alt='Response Icon' />
                                        <p>{index + 1}: {convo.response}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    }

                    <form onSubmit={handleFormSubmit} className='search-box'>
                        <input
                            type="text"
                            id="question"
                            placeholder="Enter your question"
                            value={question}
                            onChange={handleInputChange}
                        />
                        <div>
                            <button className='image-button' type="submit" disabled={loading}>
                                {loading && "Sending..."}
                                {loading ? null : question.trim() === '' ? <img src={assets.send_icon} alt='Send Icon' /> : "Send"}
                            </button>
                        </div>
                    </form>

                    <p className='bottom-info'>
                        AzureOpenAI may display inaccurate info, including about people, so double-check its response.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Main;
