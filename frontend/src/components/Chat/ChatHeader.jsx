import React from 'react';
import { Link } from 'react-router-dom';

const ChatHeader = ({ slug }) => {
    return (
        <header className="bg-white/5 p-4 flex items-center justify-center sticky top-0 z-10 relative">
            <Link to="/" className="text-gray-400 hover:text-primary transition-colors absolute left-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                </svg>
            </Link>
            <h1 className="text-lg font-bold text-white capitalize">IArbitre - {slug}</h1>
        </header>
    );
};

export default ChatHeader;
