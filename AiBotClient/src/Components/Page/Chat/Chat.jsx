import React, { useState, useEffect, useRef } from 'react';

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [language, setLanguage] = useState('en'); // Default language is English
    const chatBoxRef = useRef(null);
    const [isTextarea, setIsTextarea] = useState(false);

    const appendMessage = (message, sender) => {
        setMessages((prevMessages) => [...prevMessages, { message, sender }]);
    };

    const sendMessage = async () => {
        if (!input.trim()) return;

        // Append user message to the chat
        appendMessage(input, 'user');
        setInput('');

        try {
            const response = await fetch('https://ai-api-for-career-canvas.vercel.app/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: input, language }), // Sending language preference (Banglish or Bengali)
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error('Network response was not ok: ' + errorText);
            }

            const data = await response.json();
            // Append AI response to the chat
            appendMessage(data.response, 'ai');
        } catch (error) {
            console.error('Error:', error);
            appendMessage('Error communicating with the AI. Please try again.', 'ai');
        }
    };

    useEffect(() => {
        if (chatBoxRef.current) {
            chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
        }
    }, [messages]);

    const renderMessage = (msg) => {
        const cleanedMessage = msg.replace(/\*{1,2}/g, '').replace(/`{1,3}/g, '').trim();
        const lines = cleanedMessage.split('\n');

        return lines.map((line, index) => {
            if (line.startsWith('```') && line.endsWith('```')) {
                const code = line.replace(/`{3}/g, '').trim();
                return (
                    <div key={index} className="my-2 p-2">
                        <pre className="bg-black text-white p-2 rounded">
                            <code>{code}</code>
                        </pre>
                        <button
                            onClick={() => navigator.clipboard.writeText(code)}
                            className="mt-2 text-sm text-blue-600 hover:underline"
                        >
                            Copy
                        </button>
                    </div>
                );
            }
            if (line.includes(':')) {
                const [title, content] = line.split(':');
                return (
                    <div key={index} className="mt-2">
                        <strong>{title.trim()}:</strong> {content.trim()}
                    </div>
                );
            }
            return <p key={index}>{line}</p>;
        });
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter" && e.shiftKey) {
            e.preventDefault();
            setIsTextarea(true);
        }
    };

    return (
        <div className="w-full md:w-11/12 lg:w-11/12  mx-auto bg-white shadow-lg p-4 rounded-lg">
            <h1 className="text-3xl font-bold text-green-800 text-center mb-4">CraftedCircle Chatbot</h1>

            {/* Language Selection Dropdown */}
            <div className="text-center mb-4">
                <label className="mr-2 font-bold">Language:</label>
                <select
                    className="p-2 border border-gray-300 rounded"
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                >
                    <option value="en">English</option>
                    <option value="bn">Bangla</option> 
                    <option value="banglish">Banglish</option> 
                </select>
            </div>

            <div ref={chatBoxRef} className="md:h-96 h-40 overflow-y-auto p-4 bg-gray-100 rounded-lg mb-4">
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`my-2 p-2 flex flex-col rounded-lg shadow ${msg.sender === 'user' ? 'bg-gray-300 text-end self-end' : 'bg-green-200 self-start'}`}
                    >
                        {renderMessage(msg.message)}
                    </div>
                ))}
            </div>

            <div className="w-full  flex flex-col">
                {isTextarea ? (
                    <textarea
                        placeholder="Type your message..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="flex-1 p-2 border border-gray-300  rounded w-full resize-none"
                        rows={4}
                        onKeyDown={handleKeyPress}
                    />
                ) : (
                    <input
                        type="text"
                        placeholder="Type your message..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="flex-1 p-2 border border-gray-300 rounded w-full"
                        onKeyDown={handleKeyPress}
                    />
                )}
                <button
                    onClick={sendMessage}
                    className="mt-2 p-4 bg-gradient-to-r from-green-500 to-green-700 text-white font-bold rounded-lg shadow-lg transition-all duration-300 ease-in-out  transform hover:scale-105 hover:shadow-xl"
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default Chat;
