import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GameEditModal from './GameEditModal';

const GameModal = ({ game, onClose }) => {
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);
    const [editedGame, setEditedGame] = useState(game);

    useEffect(() => {
        setEditedGame(game);
        setIsEditing(false);
    }, [game]);

    if (!game) return null;

    const handleDownloadRules = () => {
        // Mock download logic
        alert(`Downloading rules for ${game.game_name}...`);
        // TODO: window.open(game.rules_url, '_blank');
    };

    const handleStartChat = () => {
        navigate(`/chat/${game.slug}`);
    };

    const handleSave = (updatedGame) => {
        // TODO: make an API call to save changes
        if (updatedGame.newFile) {
            alert(`File selected: ${updatedGame.newFile.name} (Not uploaded yet)`);
        }
        setEditedGame(updatedGame);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setEditedGame(game);
        setIsEditing(false);
    };

    const currentGame = editedGame || game;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div className="relative bg-surface border border-white/10 rounded-2xl w-full max-w-md p-6 shadow-2xl transform transition-all scale-100">
                <div className="absolute top-4 right-4 flex gap-2">
                    <button
                        onClick={() => setIsEditing(!isEditing)}
                        className="text-gray-400 hover:text-white transition-colors p-1 rounded-full hover:bg-white/10"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 0 1 0 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 0 1 0-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281Z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        </svg>
                    </button>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-white transition-colors p-1 rounded-full hover:bg-white/10"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="flex flex-col items-center text-center mb-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-primary/20">
                        <span className="text-4xl text-white font-bold">{currentGame.game_name.charAt(0)}</span>
                    </div>

                    {isEditing ? (
                        <GameEditModal
                            game={currentGame}
                            onSave={handleSave}
                            onCancel={handleCancel}
                        />
                    ) : (
                        <>
                            <h2 className="text-2xl font-bold text-white mb-2">{currentGame.game_name}</h2>
                            <p className="text-gray-400 text-sm">
                                {currentGame.description || `Description of ${currentGame.game_name}`}
                            </p>
                        </>
                    )}
                </div>

                <div className="space-y-3">
                    <button
                        onClick={handleDownloadRules}
                        className="w-full bg-surface border border-white/10 hover:bg-white/5 text-white font-medium py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors cursor-not-allowed opacity-70"

                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                        </svg>
                        Download Rules (PDF)
                    </button>

                    <button
                        onClick={handleStartChat}
                        className="w-full bg-gradient-to-r from-primary to-secondary hover:from-indigo-600 hover:to-pink-600 text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-primary/25"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
                        </svg>
                        Start the Game
                    </button>
                </div>
            </div>
        </div>
    );
};

export default GameModal;
