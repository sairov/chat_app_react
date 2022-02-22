import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import useSocket from './hooks/socketConnect';
import Navbar from './components/Navbar/Navbar';
import { fetchChats } from '../../store/actions/chat';
import FriendsList from './components/FriendsList/FriendsList';
import Messenger from './components/Messenger/Messenger';
import './Chat.scss';

const Chat = () => {

    const dispatch = useDispatch();
    const user = useSelector(state => state.authReducer.user)

    useSocket(user, dispatch);

    useEffect(()=> {
        dispatch(fetchChats())
        .then(res => console.log(res))
        .catch(err => console.log(err))
    }, [dispatch]);

    return(
       <div id='chat-container'>
           <Navbar/>
           <div id="chat-wrap">
               <FriendsList/>
               <Messenger/>
           </div>
       </div>
    );
}

export default Chat;