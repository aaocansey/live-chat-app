import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Chat from './pages/Chat';
import Message from './components/Message';



const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<SignUp/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/chat' element={<Chat/>}/>
                <Route path='/message' element={<Message/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default AppRouter;
