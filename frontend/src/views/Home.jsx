import React from 'react';
import GameList from '../components/GameList';

const Home = () => {
    return (
        <div className="min-h-screen bg-transparent">
            <header className="py-8 px-4 text-center">
                <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 mb-4">
                    GameFlow
                </h1>
                <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                    Choose your game and start playing instantly.
                </p>
            </header>

            <main className="container mx-auto px-4 pb-12">
                <GameList />
            </main>
        </div>
    );
};

export default Home;
