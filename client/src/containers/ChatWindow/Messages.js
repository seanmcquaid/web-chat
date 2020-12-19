import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import socket from '../../sockets';
import { emitGetCurrentMessages } from '../../sockets/emit';
import { RECEIVE_CURRENT_MESSAGES } from '../../sockets/types';
import { tokenSelector } from '../../store/user/selectors';

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const { name } = useParams();
  const token = useSelector(tokenSelector);

  useEffect(() => {
    const timer = setInterval(() => {
      emitGetCurrentMessages(token, name);
    }, 3000);
    return () => {
      clearInterval(timer);
      socket.disconnect();
    };
  }, [name, token]);

  useEffect(() => {
    const timer = setInterval(() => {
      socket.on(RECEIVE_CURRENT_MESSAGES, (data) => {
        console.log(data);
        setMessages(data);
      });
    }, 3000);
    return () => {
      clearInterval(timer);
      socket.disconnect();
    };
  }, []);

  return (
    <MessagesList>
      {messages.map((message, i) => (
        <Message key={i}>{message.message}</Message>
      ))}
    </MessagesList>
  );
};

const MessagesList = styled.ol``;
const Message = styled.li``;

export default Messages;
