import React, { useState, useEffect } from 'react';
import { collection, doc, updateDoc, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { Container, Form, Button } from "reactstrap";

const Survey = () => {
    const [surveyData, setSurveyData] = useState(null);
    const [votes, setVotes] = useState([]);

    useEffect(() => {
        const fetchSurveyData = async () => {
            const surveyRef = collection(db, "surveys");
            const snapshot = await getDocs(surveyRef);
            const surveyData = snapshot.docs.map(doc => doc.data());
            setSurveyData(surveyData);
            setVotes(surveyData.map(data => data.votes));
        };

        fetchSurveyData();
    }, []);

    const submitVote = async (voteValue) => {
        const updatedVotes = [...votes];
        updatedVotes[voteValue]++;
        setVotes(updatedVotes);

        const surveyIndex = voteValue; // Vote option index corresponds to the survey index
        const surveyRef = doc(db, "surveys", surveyData[surveyIndex].id);

        await updateDoc(surveyRef, {
            votes: updatedVotes
        });
    };

    const handleVoteSubmit = (event) => {
        event.preventDefault();

        const selectedOption = document.querySelector('input[name="voteOption"]:checked');

        if (selectedOption) {
            const voteValue = parseInt(selectedOption.value);
            submitVote(voteValue);
        }
    };

    if (!surveyData) {
        return <div>Loading...</div>;
    }

    return (
        <Container className="container">
            {surveyData.map((data, index) => (
                <div key={index}>
                    <h1>{data.question}</h1>
                    <p>{data.description}</p>
                    <Form id="voteForm" onSubmit={handleVoteSubmit}>
                        <fieldset>
                            <legend>Seçenekler</legend>
                            <div id="optionsContainer">
                                {data.options.map((option, optionIndex) => (
                                    <div key={optionIndex} className="choice">
                                        <input
                                            type="radio"
                                            name="voteOption"
                                            value={optionIndex}
                                            data-index={optionIndex}
                                        />
                                        <label>{option}</label>
                                        <span>({votes[index][optionIndex]})</span>
                                    </div>
                                ))}
                            </div>
                        </fieldset>
                        <Button type="submit">Oy Ver</Button>
                    </Form>
                    <div id="result"></div>
                </div>
            ))}
        </Container>
    );
};

export default Survey;