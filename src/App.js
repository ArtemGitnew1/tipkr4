import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
    // Словарь для тренировки
    const wordDictionary = [
        { word: "hello", translation: "привет" },
        { word: "world", translation: "мир" },
        { word: "computer", translation: "компьютер" },
        { word: "programming", translation: "программирование" },
        { word: "language", translation: "язык" },
        { word: "learning", translation: "обучение" },
        { word: "practice", translation: "практика" },
        { word: "memory", translation: "память" },
        { word: "knowledge", translation: "знание" },
        { word: "success", translation: "успех" }
    ];

    const [currentWord, setCurrentWord] = useState(null);
    const [showTranslation, setShowTranslation] = useState(false);
    const [usedWords, setUsedWords] = useState([]);

    // Получение случайного слова
    const getRandomWord = () => {
        let availableWords = wordDictionary.filter(word =>
            !usedWords.includes(word.word)
        );

        // Если все слова использованы, сбрасываем список
        if (availableWords.length === 0) {
            availableWords = wordDictionary;
            setUsedWords([]);
        }

        const randomIndex = Math.floor(Math.random() * availableWords.length);
        const selectedWord = availableWords[randomIndex];

        setCurrentWord(selectedWord);
        setShowTranslation(false);
        setUsedWords(prev => [...prev, selectedWord.word]);
    };

    // Получаем первое слово при загрузке
    useEffect(() => {
        getRandomWord();
    }, []);

    const handleShowTranslation = () => {
        setShowTranslation(true);
    };

    const handleNextWord = () => {
        getRandomWord();
    };

    return (
        <div className="app">
            <div className="container">
                <h1>Тренажёр слов</h1>

                <div className="word-card">
                    {currentWord ? (
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
                </div>

                <div className="instructions">
                    <h3>Как пользоваться:</h3>
                    <ol>
                        <li>Посмотрите на английское слово</li>
                        <li>Попробуйте вспомнить перевод</li>
                        <li>Нажмите "Показать перевод" для проверки</li>
                        <li>Нажмите "Следующее слово" для продолжения</li>
                    </ol>
                </div>
            </div>
        </div>
    );
};

export default App;