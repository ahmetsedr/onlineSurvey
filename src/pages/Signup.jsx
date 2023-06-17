import React, { useState, useCallback } from 'react';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const SignUp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        if (!email || !password) {
            return;
        }
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                alert("kayıt Başarılı 👍")
                window.location.href = "/signin";
            })
            .catch((error) => {
                alert("kayıt Yapılamadı : " + error.message);
            });
    }, [email, password]);

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <h3>Yeni hesap oluştur</h3>
                <label htmlFor="email">E-posta:</label>
                <input type="email" className="email-input" value={email} onChange={e => setEmail(e.target.value)} />
                <label htmlFor="password">Şifre:</label>
                <input type="password" className="password-input" value={password} onChange={e => setPassword(e.target.value)} />
                <p> <a href="signin">Mevcud hesapla giriş yap</a> </p>
                <input type="submit" className="submit-button" value="Oluştur" />
            </form>
        </div>
    );
};

export default SignUp;