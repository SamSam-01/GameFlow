import React from 'react';

const QuickReplyButton = ({ reply, onClick }) => {
    return (
        <button
            onClick={() => onClick(reply.text)}
            className="bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-gray-300 hover:text-white px-3 py-1.5 rounded-full text-sm transition-all whitespace-nowrap"
        >
            {reply.label}
        </button>
    );
};

export default QuickReplyButton;
