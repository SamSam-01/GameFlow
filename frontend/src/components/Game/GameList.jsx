import React, { useState, useEffect } from 'react';
import GameCard from './GameCard';
import Loader from '../AppLoader';

const GameList = () => {
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/games`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                setGames(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error('Error fetching games:', err);
                setError('Failed to load games');
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <Loader />
        );
    }

    if (error) {
        return (
            <div className="text-center p-8 bg-red-50/10 rounded-lg border border-red-500/50">
                <p className="text-red-400 mb-4">{error}</p>
                <button
                    onClick={() => window.location.reload()}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                >
                    Try Again
                </button>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4">
            {games.map((game) => (
                <GameCard key={game.slug || game.game_name} game={game} />
            ))}
        </div>
    );
};

export default GameList;
