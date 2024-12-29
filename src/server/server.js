const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const sql = require("mssql/msnodesqlv8");
const jwt = require("jsonwebtoken");

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Configurare baza de date
var dbConfig = {
    server: "DESKTOP-MATD0D3\\SQLEXPRESS",  // Numele serverului si al instantei mele din SQL Server
    database: "quizz-app-db",  // Numele bazei de date
    user: "Gabi",  // Userul SQL Server
    password: "",  // Parola pentru userul SQL Server
    options: {
        trustedConnection: true,
    },
    driver: "msnodesqlv8",
}

// Configurare conexiune persistenta
let poolPromise = sql.connect(dbConfig);

// Ruta pentru login
app.post("/api/login", async (req, res) => {
    const { email, parola } = req.body;

    if (!email || !parola) {
        return res.status(400).send("Email-ul si parola sunt obligatorii.");
    }

    try {
        let pool = await poolPromise;
        const result = await pool
            .request()
            .input("email", sql.VarChar, email)
            .input("parola", sql.VarChar, parola)
            .query("SELECT * FROM users WHERE email = @email AND parola = @parola");

        if (result.recordset.length > 0) {
            const user = result.recordset[0];

            // Creare token JWT
            const token = jwt.sign(
                { id: user.id, email: user.email },  // Payload-ul token-ului
                'secret_key',  // Secretul folosit pentru semnatura token-ului
                { expiresIn: '12h' }  // Token-ul expira in 12 ore
            );

            res.status(200).json({
                success: true,
                token,  // Trimitem token-ul in raspuns
                user: { id: user.id, email: user.email, nume: user.nume, prenume: user.prenume }
            });
        } else {
            res.status(401).send("Email sau parola incorecte.");
        }
    } catch (err) {
        console.error("Eroare la login:", err);
        res.status(500).send("Eroare la server. Te rugam sa incerci din nou mai tarziu.");
    }
});

// Ruta pentru inregistrare
app.post("/api/register", async (req, res) => {
    const { email, parola, nume, prenume } = req.body;

    if (!email || !parola || !nume || !prenume) {
        return res.status(400).send("Toate campurile sunt obligatorii.");
    }

    try {
        let pool = await poolPromise;

        // Verificam daca email-ul exista deja
        const checkEmailResult = await pool
            .request()
            .input("email", sql.VarChar, email)
            .query("SELECT * FROM users WHERE email = @email");

        if (checkEmailResult.recordset.length > 0) {
            return res.status(400).send("Email-ul este deja folosit.");
        }

        // Daca email-ul nu este folosit, inregistreaza utilizatorul
        const insertResult = await pool
            .request()
            .input("email", sql.VarChar, email)
            .input("parola", sql.VarChar, parola)
            .input("nume", sql.VarChar, nume)
            .input("prenume", sql.VarChar, prenume)
            .query("INSERT INTO users (email, parola, nume, prenume) OUTPUT INSERTED.id VALUES (@email, @parola, @nume, @prenume)");

        const newUser = insertResult.recordset[0];
        
        // Creare token JWT
        const token = jwt.sign(
            { id: newUser.id, email: newUser.email }, 
            'secret_key', 
            { expiresIn: '12h' } 
        );

        res.status(200).json({
            success: true,
            token,
            user: { id: newUser.id, email: newUser.email, nume, prenume }
        });
    } catch (err) {
        console.error("Eroare la înregistrare:", err);
        res.status(500).send("Eroare la server. Te rugăm să încerci din nou mai târziu.");
    }
});

// Endpoint pentru verificarea disponibilitatii email-ului
app.post("/api/check-email", async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).send("Email-ul este necesar.");
    }

    try {
        let pool = await poolPromise;
        const result = await pool
            .request()
            .input("email", sql.VarChar, email)
            .query("SELECT * FROM users WHERE email = @email");

        if (result.recordset.length > 0) {
            return res.status(200).json({ available: false });  // Email-ul exista deja
        } else {
            return res.status(200).json({ available: true });  // Email-ul este disponibil
        }
    } catch (err) {
        console.error("Eroare la verificarea email-ului:", err);
        res.status(500).send("Eroare la server. Te rugam sa incerci din nou mai tarziu.");
    }
});


// Configurare port si ascultare server Express
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Serverul a pornit si ruleaza pe portul ${PORT}`);
});
