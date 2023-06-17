import React, { useState, useCallback } from 'react';
import { sendPasswordResetEmail, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");

    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        if (!email) {
            return;
        }
        sendPasswordResetEmail(auth, email)
            .then(() => {
                alert("Şifre sıfırlama bağlantısı gönderildi: " + email);
            })
            .catch((error) => {
                console.error("Hata:", error);
                alert("Bir hata oluştu.");
            });
    }, [email]);

    return (
        <div className='form-container'>
            <form onSubmit={handleSubmit} >
                <h3>Şifremi Unuttum 😭</h3>
                <label htmlFor="email">E-posta:</label>
                <input
                    type="email"
                    className="email-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input type="submit" className="submit-button" value="Şifreyi Sıfırla" />
            </form>
        </div>
    );
};

export default ForgotPassword;
