import React, { useState, useCallback } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase';

const AddSurvey = () => {
    const [question, setQuestion] = useState('');
    const [description, setDescription] = useState('');
    const [options, setOptions] = useState([]);

    const handleAddOption = () => {
        setOptions([...options, { text: '', voteNum: 0 }]);
    };

    const handleRemoveOption = (index) => {
        const newOptions = [...options];
        newOptions.splice(index, 1);
        setOptions(newOptions);
    };

    const handleOptionChange = (index, value) => {
        const newOptions = [...options];
        newOptions[index].text = value;
        setOptions(newOptions);
    };

    const handleSubmit = useCallback(
        async (e) => {
            e.preventDefault();
            try {
                const surveyData = {
                    question,
                    description,
                    options,
                };

                await addDoc(collection(db, 'surveys'), surveyData);
                console.log('Document added successfully.');

                // Clear form inputs
                setQuestion('');
                setDescription('');
                setOptions([]);

            } catch (error) {
                console.error('Error adding document: ', error);
            }
        },
        [question, description, options]
    );

    return (
        <>
            <div className="form-container">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="question">Question:</label>
                        <input
                            type="text"
                            id="question"
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                            required
                            className="email-input"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description:</label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="email-input"
                        />
                    </div>
                    <div>
                        <label>Options:</label>
                        {options.map((option, index) => (
                            <div className="choice" key={index}>
                                <input
                                    type="text"
                                    value={option.text}
                                    onChange={(e) => handleOptionChange(index, e.target.value)}
                                    className="email-input"
                                />

                                <button className="remove-option" onClick={() => handleRemoveOption(index)}>
                                    ❌
                                </button>
                            </div>
                        ))}
                        <button type="button" onClick={handleAddOption} className="submit-button">
                            Add Option
                        </button>
                    </div>
                    <button type="submit" className="submit-button">
                        Submit
                    </button>
                </form>
            </div>
        </>
    );
};

export default AddSurvey;