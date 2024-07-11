import React, {useContext, useState } from 'react'
import './Sidebar.css'
import { assets } from '../../assets/assets'
import { Context } from '../../Context/Context'

const Sidebar = () => {

    const [extended,setExtended] = useState(false)
    // const [,setPrevPrompts] = useState([]);
    const {onSent,setRecentPrompt, prevPrompts,newChat} = useContext(Context);

    const loadPrompt = async (prompt) => {
        setRecentPrompt(prompt)
        await onSent ()
    }
return (

    <div className='sidebar'>
        <div className="top">
            <img onClick={()=>setExtended(prev=>!prev)} className="menu"src={assets.menu_icon} alt="" />
            <div onClick={()=>newChat()}className="New-Chat">
                <img src={assets.plus_icon} alt="" />
                {extended?<p>New Chat</p>:null}   
            </div>
            {extended?
            <div className="recent">
                <p className="recent-title">Recent</p>
                {prevPrompts.map((item,index)=>{
                    return(
                        <div onClick={()=>loadPrompt(item)} className="recent-entry">
                            <img src={assets.message_icon} alt="" />
                            <p>{item} ...</p>
                        </div>
                    )
                })} 

            </div>
            :null}
        </div>

        <div className="bottom">
            <div className="bottam-item recent entry">
                <img src={assets.question_icon} alt="" />
                {extended?<p>Help</p>:null}
            </div>
            <div className="bottam-item recent entry">
                <img src={assets.history_icon} alt="" />
                {extended?<p>Activity</p>:null}
            </div>
            <div className="bottam-item recent entry">
                <img src={assets.setting_icon} alt="" />
                {extended?<p>Setting</p>:null}
            </div>
        </div>
    </div>
    
)
}

export default Sidebar;
