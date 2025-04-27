// Import các hàm bạn cần từ SDKs mà bạn muốn sử dụng
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js";

// Cấu hình Firebase của ứng dụng web của bạn
const firebaseConfig = {
    apiKey: "AIzaSyBCf-OukGcAuZnGHp86nWesFsgTlqO58rM",
    authDomain: "luckyvicky-22.firebaseapp.com",
    databaseURL: "https://luckyvicky-22-default-rtdb.firebaseio.com",
    projectId: "luckyvicky-22",
    storageBucket: "luckyvicky-22.firebasestorage.app",
    messagingSenderId: "935020289236",
    appId: "1:935020289236:web:13f340fc6fe80fb6ca6f41",
    measurementId: "G-P53X7L4CML"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
export { database };
