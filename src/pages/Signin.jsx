import React, { useState } from 'react';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../firebase';
import { Container, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { Link } from 'react-router-dom';

const Signin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                alert('🆗');
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(errorCode + ' ' + errorMessage);
            });
    };

    const googleSignIn = () => {
        signInWithPopup(auth, provider)
            .then(() => {

            })
            .catch((err) => {
                alert(err);
            });
    };

    return (
        <Container className="container">
            <Form onSubmit={handleSubmit}>
                <h2>Please sign in</h2>

                <FormGroup>
                    <Label for="email">Email address:</Label>
                    <Input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="password">Password:</Label>
                    <Input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </FormGroup>

                <div className="links">
                    <Link to="/signup" className="link">
                        Create New Account
                    </Link>
                    <Link to="/forgotpassword" className="link">
                        Forgot Password 😥
                    </Link>
                </div>

                <Button type="submit" className="signin-button">
                    Sign in
                </Button>
                <Button type="button" className="signin-button" onClick={googleSignIn}>
                    Sign in With Google
                </Button>
            </Form>
        </Container>
    );
};

export default Signin;
