import React, { useState } from 'react';
import './FrontPage.css';
import TopBar from '../TopBar/TopBar';


const FrontPage = ({ onStartTest }) => {
    const [selectedCategory, setSelectedCategory] = useState(null);

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
    };

    return (
        <div>
            <TopBar />
            <div className="front-page">
                <h1>Selectează o categorie de examinare</h1>
                <div className="category-buttons">
                    {['A, A1, A2, AM', 'B, B1', 'C, C1', 'D, D1, Tb, Tv', 'Tr'].map((category) => (
                        <button
                            key={category}
                            className={`category-button ${selectedCategory === category ? 'selected' : ''}`}
                            onClick={() => handleCategorySelect(category)}
                        >
                            {category}
                        </button>
                    ))}
                </div>
                <button className="start-button" onClick={() => onStartTest(selectedCategory)}>
                    Start Test
                </button>
            </div>
        </div>
    );
};

export default FrontPage;
