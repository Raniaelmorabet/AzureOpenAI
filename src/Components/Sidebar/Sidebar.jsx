import React, { useState } from 'react';
import './Sidebar.css';
import { assets } from '../../assets/assets.js';
import { RiMenuFold2Line } from "react-icons/ri";

const Sidebar = () => {
    const [extended, setExtended] = useState(false);

    const handleNewChat = () => {
        window.location.reload();
    };

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
                            <p>What is react ...</p>
                        </div>
                    </div>
                    : null}
            </div>
            {/*<div className="Bottom">*/}
            {/*    <div className='bottom-item recent-entry'>*/}
            {/*        <img src={assets.question_icon} alt='' />*/}
            {/*        {extended ? <p>Help</p> : null}*/}
            {/*    </div>*/}
            {/*    <div className='bottom-item recent-entry'>*/}
            {/*        <img src={assets.history_icon} alt='' />*/}
            {/*        {extended ? <p>Activity</p> : null}*/}
            {/*    </div>*/}
            {/*    <div className='bottom-item recent-entry'>*/}
            {/*        <img src={assets.setting_icon} alt='' />*/}
            {/*        {extended ? <p>Settings</p> : null}*/}
            {/*    </div>*/}
            {/*</div>*/}
            <img src={assets.uir_icon} className='sidebar-image'/>
        </div>
    );
};

export default Sidebar;