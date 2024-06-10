import React, { useState, useEffect } from 'react';
import './Sidebar.css';
import { assets } from '../../assets/assets.js';
import { RiMenuFold2Line, RiMenuUnfold2Line } from "react-icons/ri";
import { MdDeleteOutline } from "react-icons/md";
import { MdHistory } from "react-icons/md";

const Sidebar = () => {
    const [extended, setExtended] = useState(false);
    const [conversations, setConversations] = useState([]);
    const [responses, setResponses] = useState([]);

    useEffect(() => {
        fetchConversations();
        fetchResponses();
    }, []);

    const fetchConversations = async () => {
        try {
            const response = await fetch('https://localhost:7043/api/Conversations');
            const data = await response.json();
            setConversations(data?.$values || []);
        } catch (error) {
            console.error('Error fetching conversations:', error);
        }
    };

    const fetchResponses = async () => {
        try {
            const response = await fetch('https://localhost:7043/api/Responses');
            const data = await response.json();
            setResponses(data?.$values || []);
        } catch (error) {
            console.error('Error fetching responses:', error);
        }
    };

    const truncateText = (text) => {
        if (!text) return '';
        return text.split(' ').slice(0, 5).join(' ');
    };

    const deleteConversation = async (id) => {
        if (window.confirm('Are you sure you want to delete this conversation?')) {
            try {
                const response = await fetch(`https://localhost:7043/api/Conversations/${id}`, {
                    method: 'DELETE',
                });
                if (response.ok) {
                    fetchConversations();
                } else {
                    console.error('Failed to delete conversation:', response.statusText);
                }
            } catch (error) {
                console.error('Error deleting conversation:', error);
            }
        }
    };

    const handleNewChat = () => {
        window.location.reload();
    };

    return (
        <div className={`sidebar `}>
            <div className="top">
                <button
                    onClick={() => setExtended(prev => !prev)}
                    className={`menu ${extended ? 'transform scale-x-[-1] transition-transform duration-2000 ease-in-out ' : 'transition-transform duration-2000 ease-in-out'}`}
                >
                    <RiMenuFold2Line/>
                </button>
                <div className='new-chat' onClick={handleNewChat}>
                    <img className='plus-icon' src={assets.plus_icon} alt='plusIcon' />
                    {extended ? <p>New Chat</p> : null}
                </div>
                {extended ?
                    <div className='recent'>
                        <p className='recent-title'>Recent</p>
                        <div className='recent-entry'>
                            <p className='history'><MdHistory className='history-icon'/>History</p>
                            <ul>
                                {conversations.map(conversation => (
                                    <li>
                                        <ul>
                                            {conversation.questions.$values.map(question => (
                                                <li key={question.id}>
                                                    Question: {truncateText(question.text)}, {truncateText(question.question)}
                                                </li>
                                            ))}
                                        </ul>
                                        <button onClick={() => deleteConversation(conversation.id)} className='btn'>
                                            <MdDeleteOutline />
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    : null}
            </div>
            <img src={assets.uir_icon} className='sidebar-image' />
        </div>
    );
};

export default Sidebar;
