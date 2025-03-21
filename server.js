const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors()); 
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Database Connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",  // Default is empty in XAMPP
    database: "portfolio_db"
});

db.connect(err => {
    if (err) {
        console.error("Database connection failed: " + err.stack);
        return;
    }
    console.log("✅ Connected to MySQL Database!");
});

// Handle Form Submission
app.post("/contact", (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ error: "All fields are required" });
    }

    const sql = "INSERT INTO contact_messages (name, email, message) VALUES (?, ?, ?)";
    db.query(sql, [name, email, message], (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Failed to save message" });
        }
        res.status(200).json({ message: "Message sent successfully!" });
    });
});

// Start Server
app.listen(5000, () => {
    console.log("🚀 Server running on port 5000");
});
