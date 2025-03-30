// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCIp1DpMcdncM12dVMPeB8CqTvBWY6S_Lo",
    authDomain: "prepwise-61bd6.firebaseapp.com",
    projectId: "prepwise-61bd6",
    storageBucket: "prepwise-61bd6.firebasestorage.app",
    messagingSenderId: "87326188300",
    appId: "1:87326188300:web:3655712633560fd8511f29",
    measurementId: "G-QRTD43FRX7"
};

const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);