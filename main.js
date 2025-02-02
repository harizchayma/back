import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "gestion location"
});

// Login route
app.post("/login", (req, res) => {
    const sql = "SELECT * FROM login WHERE name = ? AND password = ?";

    db.query(sql, [req.body.name, req.body.password], (err, data) => {
        if (err) {
            console.error("Database error:", err);  // Afficher l'erreur MySQL
            return res.status(500).json({ error: "Internal Server Error" });
        }
        if (data.length > 0) {
            return res.json({ message: "Login successful" });
        } else {
            return res.status(401).json({ error: "Invalid credentials" });
        }
    });
});


app.listen(3000, () => {
    console.log(`Server running on port: 3000`);
});