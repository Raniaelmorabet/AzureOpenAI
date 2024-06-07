import React, { useState, useEffect } from 'react';
import './Sidebar/Sidebar.css';
import { assets } from '../assets/assets.js';
import { RiMenuFold2Line } from "react-icons/ri";
import { MdDeleteOutline } from "react-icons/md";

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

    const truncateText = (text) => {
        const words = text.split(' ');
        return words.length > 5 ? `${words.slice(0, 5).join(' ')}...` : text;
    };

    const hardcodedText = "This is a long text that needs to be truncated for display purposes.";

    return (
        <div className='sidebar'>
            <div className="top">
                <button onClick={() => setExtended(prev => !prev)} className='menu'><RiMenuFold2Line /></button>
                <div className='new-chat' onClick={handleNewChat}>
                    <img className='plus-icon' src={assets.plus_icon} alt='plusIcon' />
                    {extended ? <p>New Chat</p> : null}
                </div>
                {extended ?
                    <div className='recent'>
                        <p className='recent-title'>Recent</p>
                        <div className='recent-entry'>
                            <img className='message-icon' src={assets.message_icon} alt='' />
                            <ul>
                                {conversations.map(conversation => (
                                    <li key={conversation.id}>
                                        {conversation.id}
                                        <ul>
                                            {conversation.questions.$values.map(question => (
                                                <li key={question.id}>
                                                    {truncateText(question.text)}, {truncateText(question.question)}
                                                </li>
                                            ))}
                                            {/*{responses.map(response => (*/}
                                            {/*    <li key={response.id}>*/}
                                            {/*        Response: {truncateText(response.text)}*/}
                                            {/*    </li>*/}
                                            {/*))}*/}
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