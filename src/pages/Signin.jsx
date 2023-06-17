import React, { useState, useCallback } from 'react';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const SignIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        if (!email || !password) {
            return;
        }
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                alert("Giriş Başarılı 👍")
                window.location.href = "/";
            })
            .catch((error) => {
                alert("Giriş Yapılamadı : " + error.message);
            });
    }, [email, password]);

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <h3>Giriş yap</h3>
                <label htmlFor="email">E-posta:</label>
                <input type="email" className="email-input" value={email} onChange={e => setEmail(e.target.value)} />
                <label htmlFor="password">Şifre:</label>
                <input type="password" className="password-input" value={password} onChange={e => setPassword(e.target.value)} />
                <p> <a href="signup">Hesabın yokmu kayıt ol</a> </p>
                <input type="submit" className="submit-button" value="Giriş" />
                <p> <a href="ForgotPassword">Şifremi unuttum 😭</a> </p>
            </form>
        </div>
    );
};

export default SignIn;