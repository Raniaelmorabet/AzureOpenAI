import React, { useState } from 'react';
import './Sidebar.css';
import { assets } from '../../assets/assets.js';

const Sidebar = () => {
    const [extended, setExtended] = useState(false);

    const handleNewChat = () => {
        window.location.reload(); // This will refresh the page
    };

    return (
        <div className='sidebar'>
            <div className="top">
                <img onClick={() => setExtended(prev => !prev)} className='menu' src={assets.menu_icon} alt='menuIcon' />
                <div className='new-chat' onClick={handleNewChat}>
                    <img src={assets.plus_icon} alt='plusIcon' />
                    {extended ? <p>New Chat</p> : null}
                </div>
                {extended ?
                    <div className='recent'>
                        <p className='recent-title'>Recent</p>
                        <div className='recent-entry'>
                            <img src={assets.message_icon} alt='' />
                            <p>What is react ...</p>
                        </div>
                    </div>
                    : null}
            </div>
            <div className="Bottom">
                <div className='bottom-item recent-entry'>
                    <img src={assets.question_icon} alt='' />
                    {extended ? <p>Help</p> : null}
                </div>
                <div className='bottom-item recent-entry'>
                    <img src={assets.history_icon} alt='' />
                    {extended ? <p>Activity</p> : null}
                </div>
                <div className='bottom-item recent-entry'>
                    <img src={assets.setting_icon} alt='' />
                    {extended ? <p>Settings</p> : null}
                </div>
            </div>
        </div>
    );
};

export default Sidebar;