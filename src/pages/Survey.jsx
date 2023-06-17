import React, { useState } from 'react';

const Survey = () => {
    const question = "Sorumuzun başlığı";
    const description = "Soru Açıklaması";
    const options = ["Seçenek 1", "Seçenek 2", "Seçenek 3"];
    const [votes, setVotes] = useState([0, 0, 0]);

    const submitVote = (voteValue) => {
        const updatedVotes = [...votes];
        updatedVotes[voteValue]++;
        setVotes(updatedVotes);
    };

    const handleVoteSubmit = (event) => {
        event.preventDefault();

        const selectedOption = document.querySelector('input[name="voteOption"]:checked');

        if (selectedOption) {
            const voteValue = parseInt(selectedOption.value);
            submitVote(voteValue);
        }
    };

    return (
        <div>
            <h1 id="questionTitle">{question}</h1>
            <p id="questionDescription">{description}</p>
            <form id="voteForm" onSubmit={handleVoteSubmit}>
                <fieldset>
                    <legend>Seçenekler</legend>
                    <div id="optionsContainer">
                        {options.map((option, index) => (
                            <div key={index}>
                                <input
                                    type="radio"
                                    name="voteOption"
                                    value={index}
                                    data-index={index}
                                />
                                <label>{option}</label>
                                <span>({votes[index]})</span>
                            </div>
                        ))}
                    </div>
                </fieldset>
                <button type="submit">Oy Ver</button>
            </form>
            <div id="result"></div>
        </div>
    );
};

export default Survey;