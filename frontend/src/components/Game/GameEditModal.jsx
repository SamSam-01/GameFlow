import React, { useState, useEffect } from 'react';

const GameEditModal = ({ game, onSave, onCancel }) => {
    const [editedGame, setEditedGame] = useState(game);

    useEffect(() => {
        setEditedGame(game);
    }, [game]);

    const handleSave = () => {
        if (editedGame.newFile) {
            alert(`File selected: ${editedGame.newFile.name} (Not uploaded yet)`);
        }
        onSave(editedGame);
    };

    return (
        <div className="flex flex-col items-center text-center mb-6 w-full">

            <div className="w-full space-y-4">
                <input
                    type="text"
                    value={editedGame.game_name}
                    onChange={(e) => setEditedGame({ ...editedGame, game_name: e.target.value })}
                    className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-white font-bold text-center focus:outline-none focus:border-primary"
                    placeholder="Game Name"
                />
                <textarea
                    value={editedGame.description || ''}
                    onChange={(e) => setEditedGame({ ...editedGame, description: e.target.value })}
                    className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-gray-300 text-sm focus:outline-none focus:border-primary min-h-[80px]"
                    placeholder="Description"
                />
                <div className="relative border border-dashed border-white/20 rounded-lg p-4 hover:bg-white/5 transition-colors text-center cursor-pointer group">
                    <input
                        type="file"
                        accept=".pdf"
                        onChange={(e) => setEditedGame({ ...editedGame, newFile: e.target.files[0] })}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div className="flex flex-col items-center gap-2 text-gray-400 group-hover:text-white transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                        </svg>
                        <span className="text-sm font-medium">
                            {editedGame.newFile ? editedGame.newFile.name : "Upload new Rules (PDF)"}
                        </span>
                    </div>
                </div>
                <div className="flex gap-2 justify-center">
                    <button onClick={handleSave} className="bg-primary hover:bg-primary/80 text-white px-4 py-1.5 rounded-lg text-sm transition-colors">Save</button>
                    <button onClick={onCancel} className="bg-white/10 hover:bg-white/20 text-white px-4 py-1.5 rounded-lg text-sm transition-colors">Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default GameEditModal;
