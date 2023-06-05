import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input, Container } from 'reactstrap';
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../firebase';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
            .then(() => {
                alert('🆗');
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(errorCode + ' ' + errorMessage);
            });
    };

    const googleSignUp = () => {
        signInWithPopup(auth, provider)
            .then(() => {

            })
            .catch((err) => {
                alert(err);
            });
    };

    return (
        <Container className='w-50'>
            <Form onSubmit={handleSubmit} className="signin-form m-5">
                <h1 className="h3 mb-3 fw-normal">Please sign up</h1>

                <FormGroup className="form-floating">
                    <Input
                        type="email"
                        className="form-control"
                        id="floatingInput"
                        placeholder="name@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <Label for="floatingInput">Email address</Label>
                </FormGroup>
                <FormGroup className="form-floating">
                    <Input
                        type="password"
                        className="form-control"
                        id="floatingPassword"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <Label for="floatingPassword">Password</Label>
                </FormGroup>

                <div className="links d-flex justify-content-between">
                    <a href="/signin" style={{ textDecoration: 'none' }}>Already Have Account</a>
                </div>

                <Button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</Button>
                <Button type="button" className="signin-button" onClick={googleSignUp}>
                    Sign in With Google
                </Button>
            </Form>
        </Container>
    );
};

export default Signup;
