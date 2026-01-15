require('dotenv').config();
const express = require("express") 
const app = express()
const serviceroute = require("./Routes/ServicesRoutes")
const clientroute = require("./Routes/ClientRoutes")
const adminroute = require("./Routes/AdminRoutes")
const cors = require('cors');
const villes = require("./villes.json");


app.use(express.json())

app.use(cors())

// Middleware
app.use(cors({
    // origin: ['exp://192.168.0.187:8081'],
    origin: ['exp://192.168.11.102:8081'],
  credentials: true
}));
app.use(express.json());

app.use("/api",serviceroute)
app.use("/api",clientroute)
app.use("/api",adminroute)


app.listen(3001,()=>{
    console.log(`Serveur express ecoute sur 
        localhost:3001
        // Votre add IP: 192.168.0.187:3001
        Hiba : 192.168.11.102:3001
    `)
    console.log("test uni")
})



app.use(express.json());


app.get("/api/villes", (req, res) => {
  res.json(villes.villes);
});



// app.listen(3000, () => {
//   console.log("API running on http://localhost:3000");
// });



// req => request pour recuperer les donnees envoyes de frontend front=>back
// res => response pour envoyer la reponse de backend backend=>front
// app.get('/test',(req,res)=>{
//     resjson({hhh:"sss"})
// })