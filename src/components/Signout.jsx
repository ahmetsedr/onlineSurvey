import React from 'react';
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

const Signout = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        signOut(auth)
            .then(() => {
                alert("Sign-out successful.");
            })
            .catch((error) => {
                alert(error + "An error happened.");
            });
    };

    return (
        <div className="container">
            <button onClick={handleSubmit} type="button">Sign Out</button>
        </div>
    );
};

export default Signout;
