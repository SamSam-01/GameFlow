import React from 'react';

const ChatInput = ({ newMessage, setNewMessage, handleSendMessage }) => {
    return (
        <footer className="p-4 bg-gray-900 border-t border-white/10 sticky bottom-0">
            <form onSubmit={handleSendMessage} className="flex gap-2 max-w-4xl mx-auto">
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Ask to IArbitre..."
                    className="flex-1 bg-surface text-white rounded-full px-6 py-3 focus:outline-none focus:ring-2 focus:ring-primary border border-transparent placeholder-gray-500"
                />
                <button
                    type="submit"
                    className="bg-primary hover:bg-indigo-600 text-white rounded-full p-3 transition-colors flex items-center justify-center aspect-square"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                        <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
                    </svg>
                </button>
            </form>
        </footer>
    );
};

export default ChatInput;
