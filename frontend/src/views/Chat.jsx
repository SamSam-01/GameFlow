import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import ChatHeader from '../components/Chat/ChatHeader';
import ChatMessage from '../components/Chat/ChatMessage';
import ChatInput from '../components/Chat/ChatInput';
import QuickReplyButton from '../components/chat/QuickReplyButton';
import quickReplies from '../data/quick_replies.json';

const Chat = () => {
    const { slug } = useParams();
    const [messages, setMessages] = useState([
        { id: 1, user: 'IArbitre', text: `Welcome to the ${slug} chat room! I'm here to help with rules`, isSystem: true },
    ]);
    const [newMessage, setNewMessage] = useState('');
    const [socket, setSocket] = useState(null);
    const [isStreaming, setIsStreaming] = useState(false);

    // Append chunk to the last message
    const reconstructMessage = (prevMessages, text) => {
        const lastMessage = prevMessages[prevMessages.length - 1];
        return [
            ...prevMessages.slice(0, -1),
            { ...lastMessage, text: lastMessage.text + text }
        ];
    }

    // TODO: extract this logic into a custom hook to decouple the network layer from the UI component.
    React.useEffect(() => {
        const ws = new WebSocket(`${import.meta.env.VITE_WS_URL}/ws`);

        ws.onopen = () => {
            console.log('Connected to WebSocket');
        };

        ws.onmessage = (event) => {
            const text = event.data;

            if (text === " [FIN]") {
                setIsStreaming(false);
                return;
            }

            setMessages((prevMessages) => {
                const lastMessage = prevMessages[prevMessages.length - 1];

                if (isStreaming && lastMessage && lastMessage.user === 'IArbitre' && !lastMessage.isSystem) {
                    return reconstructMessage(prevMessages, text);
                }

                if (lastMessage && lastMessage.user === 'IArbitre' && !lastMessage.isSystem && !lastMessage.isComplete) {
                    return reconstructMessage(prevMessages, text);
                } else {
                    return [...prevMessages, { id: Date.now(), user: 'IArbitre', text: text, isSystem: false, isComplete: false }];
                }
            });
        };

        ws.onclose = () => {
            console.log('Disconnected from WebSocket');
        };

        setSocket(ws);

        return () => {
            ws.close();
        };
    }, []);

    const handleSendMessage = (e) => {
        e.preventDefault();
        sendMessage(newMessage);
    };

    const handleQuickReply = (text) => {
        sendMessage(text);
    };

    const sendMessage = (text) => {
        if (!text.trim() || !socket) return;

        const userMessage = {
            id: Date.now(),
            user: 'You',
            text: text,
            isSystem: false,
        };

        setMessages((prev) => [...prev, userMessage]);

        // Prepare for IArbitre response
        setMessages((prev) => [...prev, { id: Date.now() + 1, user: 'IArbitre', text: '', isSystem: false, isComplete: false }]);
        setIsStreaming(true);

        socket.send(JSON.stringify({
            slug: slug,
            question: text
        }));

        setNewMessage('');
    };

    return (
        <div className="min-h-screen bg-gray-900 flex flex-col">
            <ChatHeader slug={slug} />

            <main className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg) => (
                    <ChatMessage key={msg.id} msg={msg} />
                ))}
            </main>

            {/* TODO: wrap when there is too much quick replies */}
            <div className="px-4 pb-2 flex gap-2 overflow-x-auto no-scrollbar mask-gradient justify-center">
                {quickReplies.map((reply) => (
                    <QuickReplyButton
                        key={reply.id}
                        reply={reply}
                        onClick={handleQuickReply}
                    />
                ))}
            </div>

            <ChatInput
                newMessage={newMessage}
                setNewMessage={setNewMessage}
                handleSendMessage={handleSendMessage}
            />
        </div>
    );
};

export default Chat;
