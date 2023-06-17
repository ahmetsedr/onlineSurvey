import React, { useState, useEffect } from 'react';
import { collection, doc, getDocs, updateDoc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

const VoteSurvey = () => {
    const [surveys, setSurveys] = useState([]);

    useEffect(() => {
        const fetchSurveys = async () => {
            try {
                const surveySnapshot = await getDocs(collection(db, 'surveys'));
                const surveyData = surveySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
                setSurveys(surveyData);
            } catch (error) {
                console.error('Error fetching surveys:', error);
            }
        };

        fetchSurveys();
    }, []);

    const handleVoteSubmit = async (surveyId, optionIndex) => {
        try {
            const surveyRef = doc(db, 'surveys', surveyId);
            const surveySnapshot = await getDoc(surveyRef);
            const surveyData = surveySnapshot.data();

            if (!surveyData) {
                console.error('Survey not found.');
                return;
            }

            const updatedOptions = [...surveyData.options];
            updatedOptions[optionIndex].voteNum += 1;

            const updateFields = {
                options: updatedOptions,
            };

            await updateDoc(surveyRef, updateFields);
            console.log('Vote submitted successfully.');

            // Update the local state with the new survey data
            const updatedSurveys = surveys.map((survey) => {
                if (survey.id === surveyId) {
                    return { ...survey, options: updatedOptions };
                }
                return survey;
            });

            setSurveys(updatedSurveys);
        } catch (error) {
            console.error('Error submitting vote: ', error);
        }
    };

    return (
        <div className="container">
            <h2>Surveys</h2>
            {surveys.length === 0 ? (
                <p>No surveys available.</p>
            ) : (
                surveys.map((survey) => (
                    <div key={survey.id} className="survey">
                        <h3>{survey.question}</h3>
                        <ul>
                            {Array.isArray(survey.options) ? (
                                survey.options.map((option, index) => (
                                    <li key={index}>
                                        {option.text} - {option.voteNum}
                                        <button
                                            onClick={() => handleVoteSubmit(survey.id, index)}

                                        >
                                            Vote
                                        </button>
                                    </li>
                                ))
                            ) : (
                                <li>No options available for this survey.</li>
                            )}
                        </ul>
                    </div>
                ))
            )}
        </div>
    );
};

export default VoteSurvey;
