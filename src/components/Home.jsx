import React, { useReducer } from 'react'
import { Aside } from './aside/Aside'
import { WindowChat } from './chat/WindowChat'
import { UiContext } from '../context/UiContext'
import { ChatContext } from '../context/ChatContext'
import { uiReducer } from '../reducers/uiReducer'
import { chatReducer } from '../reducers/chatReducer'


export const Home = () => {
    const [chat, dispatch] = useReducer(chatReducer);
    const [ui, dispatchUi] = useReducer(uiReducer);
    
    return (
        <ChatContext.Provider value={{ chat, dispatch }}>
            <UiContext.Provider value={{ ui, dispatchUi }}>
                <div className='w-screen h-screen flex flex-col md:flex-row animate__animated animate__slideInUp animate__faster'>
                    <Aside />
                    <WindowChat />
                </div>
            </UiContext.Provider>
        </ChatContext.Provider>
    )
}
