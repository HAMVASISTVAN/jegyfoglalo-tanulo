const express = require("express");
const cors = require('cors'); 
// cors() engedélyezi, hogy a 5500-as frontend hozzáférjen a 3000-es backend API-hoz.
// A CORS azt engedi meg, hogy a 5500-as oldal kommunikálhasson a 3000-as Express szerverrel
// app.use(express.json());  -> akkor kell, amikor a kliens JSON adatot küld a backendnek a body-ban
// A CORS pedig csak azért kell, mert most a Live Server 5500-as portjáról beszélgetünk az Express 3000-as portjával
const app = express();
app.use(cors());
 
app.use(express.json());  // a backendnek tudnia kell fogadni a JSON-adatot amely a  frontend-ből érkezik
// express.json() jelentése: ha a kliens JSON-adatot küld nekem, alakítsam át úgy, hogy a req.body segítségével el tudjam érni
// const PORT = 3000;
const PORT = process.env.PORT || 3000;
const path = require('path');
// Statikus fájlok kiszolgálása
app.use(express.static(__dirname)); 
// a fenti sorok sorrendje fontos, be kell tartani
// A nézőtér adatai
let nezoter = [
    ["S", "S", "S", "S", "S"],
    ["S", "S", "S", "S", "S"],
    ["S", "S", "S", "S", "S"],
    ["S", "S", "S", "S", "S"],
    ["S", "S", "S", "S", "S"],
    ["S", "S", "S", "S", "S"],
    ["S", "S", "S", "S", "S"],
    ["S", "S", "S", "S", "S"],
    ["S", "S", "S", "S", "S"],
    ["S", "S", "S", "S", "S"]
];
// ha valaki GET kéréssel meghívja a /api/nezoter címet, akkor hajtsd végre ezt a függvényt
// a backend szépen visszaküldi a nezoter tömböt JSON-formátumban
// http://localhost:3000/api/nezoter

// A főoldal megnyitásakor a jegyfoglalo_3.html fájl visszaküldése
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'jegyfoglalo_3.html'));
});

app.get("/api/nezoter", function(req, res) {
    res.json(nezoter);
});
// backendben létrehozunk egy POST útvonalat, ami egyelőre csak megnézi, mit kapott
app.post("/api/foglal", function(req, res) {

    console.log(req.body);           // kiíratjuk a kapott adatot, pl: {"sor":"3","oszlop":"2"}//
    let sor = req.body.sor;          // elmentjük a sor változóba
    let oszlop = req.body.oszlop;    // elmentjük az oszlop változóba
    if (nezoter[sor][oszlop] === "S") 
    {  nezoter[sor][oszlop] = "F";
       // res.json(req.body);   // server válasza a frontendnek JSON-formátumban
       res.json({ siker: true,
                  uzenet: "Sikeres foglalás"
                });
     }
    else   { res.json({ 
             siker: false,
             uzenet: "Ez a hely már foglalt!"
                  });
            }
});
app.listen(PORT, () => {
  console.log(`Szerver elindult a ${PORT} porton.`);
});
