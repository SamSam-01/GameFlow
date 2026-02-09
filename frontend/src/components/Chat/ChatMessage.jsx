import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const ChatMessage = ({ msg }) => {
    return (
        <div className={`flex ${msg.isSystem ? 'justify-center' : (msg.user === 'You' ? 'justify-end' : 'justify-start')}`}>
            <div className={`max-w-[80%] rounded-2xl px-4 py-2 ${msg.isSystem
                ? 'bg-transparent text-gray-500 text-sm'
                : (msg.user === 'You'
                    ? 'bg-primary text-white rounded-br-none'
                    : 'bg-surface text-gray-200 rounded-bl-none')
                }`}>
                {!msg.isSystem && msg.user !== 'You' && (
                    <p className="text-xs text-primary mb-1 font-bold">{msg.user}</p>
                )}
                <div className="markdown-body text-sm">
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                            p: ({ node, ...props }) => <p className="mb-1 last:mb-0" {...props} />,
                            a: ({ node, ...props }) => <a className="text-blue-400 underline hover:text-blue-300" rel="noopener noreferrer" {...props} />,
                            ul: ({ node, ...props }) => <ul className="list-disc ml-4 mb-2" {...props} />,
                            ol: ({ node, ...props }) => <ol className="list-decimal ml-4 mb-2" {...props} />,
                            li: ({ node, ...props }) => <li className="mb-1" {...props} />,
                            code: ({ node, inline, className, children, ...props }) => {
                                const match = /language-(\w+)/.exec(className || '')
                                return !inline ? (
                                    <pre className="bg-black/30 rounded p-2 overflow-x-auto mb-2 mt-2 border border-white/10">
                                        <code className={className} {...props}>
                                            {children}
                                        </code>
                                    </pre>
                                ) : (
                                    <code className="bg-black/20 rounded px-1 py-0.5 font-mono text-xs" {...props}>
                                        {children}
                                    </code>
                                )
                            },
                        }}
                    >
                        {msg.text}
                    </ReactMarkdown>
                </div>
            </div>
        </div>
    );
};

export default ChatMessage;
