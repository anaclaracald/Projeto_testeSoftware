const express = require("express")
const admin = require("firebase-admin")
const cors = require("cors")
const path = require("path");

const app = express()

app.use(cors());
app.use(express.json())
app.use(express.static(path.join(__dirname, "../../frontend")));

const serviceAccount = require("./firebaseKey.json")

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
})

const db = admin.firestore()
const usuariosCollection = db.collection("usuarios")

// log routes
app.use((req, res, next) => {
    console.log(`Received ${req.method} request for ${req.url}`);
    next();
  });
  

// CREATE
app.post("/usuarios", async (req, res) => {

    try {
        const { nome, email, senha } = req.body
        const novoUsuario = { nome, email, senha }
        const docRef = await usuariosCollection.add(novoUsuario)
        res.status(201).json({ id: docRef.id, ...novoUsuario })
    }
    catch (error) {
        console.error("Error adding new user.", error)
        res.status(500).json({ error: error.message })
    }

})

// READ todos os usuários
app.get("/usuarios", async (req, res) => {

    try {
        const snapshot = await usuariosCollection.get()
        const usuarios = []
        snapshot.forEach((doc) => {
            usuarios.push({ id: doc.id, ...doc.data() })
        })
        res.json(usuarios)
    }
    catch (error) {
        res.status(500).json({ error: error.message })
    }

})

// READ 1 usuário
app.get("/usuarios/:id", async (req, res) => {

    try {
        const doc = await usuariosCollection.doc(req.params.id).get()

        if (doc.exists == false) {
            res.status(404).json({ message: "User not found." })
        }

        res.json({ id: doc.id, ...doc.data() })
    }
    catch (error) {
        res.status(500).json({ error: error.message })
    }

})

// UPDATE
app.put("/usuarios/:id", async (req, res) => {

    try {
        const { nome, email, senha } = req.body
        const userRef = usuariosCollection.doc(req.params.id)
        await userRef.update({ nome, email, senha })
        res.json({ message: "User updated successfully."})
    }
    catch (error) {
        res.status(500).json({ error: error.message })
    }

})

// DELETE
app.delete("/usuarios/:id", async (req, res) => {

    try {
        await usuariosCollection.doc(req.params.id).delete()
        res.json({ message: "User deleted successfully." })
    }
    catch (error) {
        res.status(500).json({ error: error.message })
    }

})

// página inicial
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../../frontend/index.html"));
});

// inicializar servidor
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)
})
