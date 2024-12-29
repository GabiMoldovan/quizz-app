const sql = require('mssql/msnodesqlv8');

// Crearea configuratiei bazei de date
var config = {
    server: "DESKTOP-MATD0D3\\SQLEXPRESS",  // Numele serverului si al instantei mele din SQL Server
    database: "quizz-app-db",  // Numele bazei de date
    user: "Gabi",  // Userul SQL Server
    password: "",  // Parola pentru userul SQL Server
    options: {
        trustedConnection: true,
    },
    driver: "msnodesqlv8",
}

// Realizeaza conexiunea
sql.connect(config, function(err) {
    if (err) {
        console.log("Eroare la conectare: ", err);
        return;
    }

    // Crearea unei cereri
    var request = new sql.Request();

    // Interogare SQL de test
    var query = "SELECT * FROM users";  // Exemplu de interogare pentru a selecta toate datele din tabelul 'users'

    // Executa interogarea
    request.query(query, function(err, records) {
        if (err) {
            console.log("Eroare la executia interogarii: ", err);
        } else {
            console.log("Rezultatele interogarii: ", records);
            // manipulare sau folosire a datele din `records`
        }
    });
});
