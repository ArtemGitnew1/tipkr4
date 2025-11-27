import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
    const wordDictionary = [
        { word: "hello", translation: "привет" },
        { word: "world", translation: "мир" },
        { word: "cat", translation: "кот" },
        { word: "dog", translation: "собака" },
        { word: "house", translation: "дом" },
        { word: "sun", translation: "солнце" },
        { word: "book", translation: "книга" },
        { word: "water", translation: "вода" },
        { word: "food", translation: "еда" },
        { word: "tree", translation: "дерево" },
        { word: "car", translation: "машина" },
        { word: "school", translation: "школа" },
        { word: "friend", translation: "друг" },
        { word: "family", translation: "семья" },
        { word: "city", translation: "город" },
        { word: "time", translation: "время" },
        { word: "day", translation: "день" },
        { word: "night", translation: "ночь" },
        { word: "love", translation: "любовь" },
        { word: "work", translation: "работа" }
    ];

    const [currentWord, setCurrentWord] = useState(null);
    const [showTranslation, setShowTranslation] = useState(false);
    const [usedWords, setUsedWords] = useState([]);
    const [allWordsLearned, setAllWordsLearned] = useState(false);
    const [wordQueue, setWordQueue] = useState([]);

    const shuffleArray = (array) => {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    };

    const initializeQueue = () => {
        const shuffledWords = shuffleArray(wordDictionary);
        setWordQueue(shuffledWords);
        setUsedWords([]);
        setAllWordsLearned(false);
        return shuffledWords;
    };

    const getNextWord = () => {
        if (wordQueue.length === 0) {
            setAllWordsLearned(true);
            return;
        }

        setCurrentWord(wordQueue[0]);
        setWordQueue(prev => prev.slice(1));
        setShowTranslation(false);
    };

    const handleShowTranslation = () => {
        setShowTranslation(true);
        if (currentWord && !usedWords.includes(currentWord.word)) {
            setUsedWords(prev => [...prev, currentWord.word]);
        }
    };

    const handleNextWord = () => {
        getNextWord();
    };

    const resetTraining = () => {
        const newQueue = initializeQueue();
        setCurrentWord(newQueue[0]);
        setWordQueue(newQueue.slice(1));
        setShowTranslation(false);
        setAllWordsLearned(false);
    };

    useEffect(() => {
        const initialQueue = initializeQueue();
        setCurrentWord(initialQueue[0]);
        setWordQueue(initialQueue.slice(1));
    }, []);

    return (
        <div className="app">
            <div className="container">
                <h1>Тренажёр слов</h1>

                <div className="word-card">
                    {allWordsLearned ? (
                        <div className="completion-message">
                            <h2>🎉 Поздравляем!</h2>
                            <p>Вы изучили все 20 слов!</p>
                            <button
                                className="btn btn-secondary"
                                onClick={resetTraining}
                            >
                                Начать заново
                            </button>
                        </div>
                    ) : currentWord ? (
                        <>
                            <div className="word-display">
                                <h2>{currentWord.word}</h2>
                                {showTranslation && (
                                    <div className="translation">
                                        <span>{currentWord.translation}</span>
                                    </div>
                                )}
                            </div>

                            <div className="controls">
                                {!showTranslation ? (
                                    <button
                                        className="btn btn-primary"
                                        onClick={handleShowTranslation}
                                    >
                                        Показать перевод
                                    </button>
                                ) : (
                                    <button
                                        className="btn btn-secondary"
                                        onClick={handleNextWord}
                                    >
                                        Следующее слово
                                    </button>
                                )}
                            </div>
                        </>
                    ) : (
                        <p>Загрузка...</p>
                    )}
                </div>

                <div className="stats">
                    <p>Изучено слов: {usedWords.length} / {wordDictionary.length}</p>
                    <p>Осталось в раунде: {wordQueue.length}</p>
                </div>

                {!allWordsLearned && (
                    <div className="instructions">
                        <h3>Как пользоваться:</h3>
                        <ol>
                            <li>Посмотрите на английское слово</li>
                            <li>Попробуйте вспомнить перевод</li>
                            <li>Нажмите "Показать перевод" для проверки</li>
                            <li>Нажмите "Следующее слово" для продолжения</li>
                        </ol>
                    </div>
                )}
            </div>
        </div>
    );
};

export default App;