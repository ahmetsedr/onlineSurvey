import React, { useCallback, useState } from "react";
import { getDatabase, ref, push } from "firebase/database";
import { Container, Form, FormGroup, Label, Input, Button } from "reactstrap";

const db = getDatabase();

const StartSurvey = () => {
    const [question, setQuestion] = useState("");
    const [description, setDescription] = useState("");
    const [options, setOptions] = useState([]);

    const handleAddOption = () => {
        setOptions([...options, ""]);
    };

    const handleRemoveOption = (index) => {
        const newOptions = [...options];
        newOptions.splice(index, 1);
        setOptions(newOptions);
    };

    const handleOptionChange = (index, value) => {
        const newOptions = [...options];
        newOptions[index] = value;
        setOptions(newOptions);
    };

    const handleSubmit = useCallback(
        (e) => {
            e.preventDefault();
            const surveyData = {
                question,
                description,
                options,
            };

            push(ref(db, "surveys"), surveyData)
                .then((newRef) => {
                    console.log("Survey data saved with ID: ", newRef.key);
                })
                .catch((error) => {
                    console.error("Error saving survey data: ", error);
                });
        },
        [question, description, options]
    );

    return (
        <Container className="container">
            <h2>Start Survey</h2>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label for="question">Question:</Label>
                    <Input
                        type="text"
                        id="question"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="description">Description:</Label>
                    <Input
                        type="textarea"
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </FormGroup>
                <div>
                    <Label>Options:</Label>
                    {options.map((option, index) => (
                        <div className="choice" key={index}>
                            <Input
                                type="text"
                                value={option}
                                onChange={(e) => handleOptionChange(index, e.target.value)}
                            />

                            <Button
                                className="remove-option"
                                onClick={() => handleRemoveOption(index)}
                            >
                                Remove Option
                            </Button>
                        </div>
                    ))}
                    <Button type="button" onClick={handleAddOption}>
                        Add Option
                    </Button>
                </div>
                <Button type="submit">Submit</Button>
            </Form>
        </Container>
    );
};

export default StartSurvey;