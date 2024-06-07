import React, { useState } from "react";
import "./Main.css";
import { assets } from "../../assets/assets.js";
import { IoSparklesSharp } from "react-icons/io5";
import Carousel from "../Carousel/Carousel.jsx";
import { TypeAnimation } from "react-type-animation";

const Main = () => {
    const [chat, setChat] = useState('');
    const [messages, setMessages] = useState([]);
    const [showResult, setShowResult] = useState(false);

    const handleChat = (e) => {
        setChat(e.target.value);
    };

    const handleSend = () => {
        if (chat.trim()) {
            setMessages([...messages, { text: chat, sender: 'user' }]);
            setChat('');
            setShowResult(true);
        }
    };

    return (
        <div className='main'>
            <div className='nav'>
                <p>AzureOpenAI</p>
                <button className='image-button' onClick={() => setShowResult(true)}>
                    <img src={assets.user_icon} alt='User Icon' />
                </button>
            </div>
            <div className='main-container'>
                {!showResult
                    ? <>
                        <div className='greet'>
                            <p><span>
                        Azul,
                        <TypeAnimation
                            sequence={[" UIR.", " JobInTech."]}
                            cursorColor="#c770f0"
                            speed={270}
                            repeat={Infinity}
                        />
                    </span></p>
                            <p>How can I help you today?</p>
                        </div>
                        <Carousel />
                    </>
                    : <div className='result'>
                        {messages.map((message, index) => (
                            <div key={index} className='question-title'>
                                <img className='question-img' src={assets.user_icon} alt='User Icon' />
                                <p>{message.text}</p>
                            </div>
                        ))}
                        <div className='response-data'>
                            <img src={assets.uir_icon} className='response-image' alt='Response Icon' />
                            <p className='response-para'>hello back</p>
                        </div>
                    </div>
                }
                <div className='main-bottom'>
                    <div className='search-box'>
                        <input type='text' value={chat} placeholder='Enter a prompt here' onChange={handleChat} />
                        <div>
                            <button className='image-button' onClick={handleSend}>
                                <img src={assets.send_icon} alt='Send Icon' />
                            </button>
                        </div>
                    </div>
                    <p className='bottom-info'>
                        AzureOpenAI may display inaccurate info, including about people, so double-check its response.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Main;