import React, { useCallback } from 'react';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';

const Navbar = () => {

    const handleClickSignOut = useCallback(() => {
        signOut(auth)
    }, []);

    const handleClickAddSurvey = useCallback(() => {
        window.open("/AddSurvey", "_blank");
    }, []);

    return (
        <div className="navbar">
            <h1 className="title">Online Survey</h1>
            <div className="navbar-buttons">
                <button onClick={handleClickSignOut} className="logout-button">✖</button>
                <button onClick={handleClickAddSurvey} className="logout-button">Anket Ekle</button>
            </div>
        </div>
    );
};

export default Navbar;
