const express = require("express");
const app = express();
const cors = require("cors");
const { pool } = require("./data/data");
app.use(cors());
app.use(express.json());
app.listen(3000, () => {
    console.log("Server ativo na porta 3000");
})

// Encerrar as conexões do pool de conexões ao final do processo
process.on('SIGINT', () => {
    pool.end();
    process.exit();
});

let register = null;
app.post('/api/registerUser', async (req, res) => {
    try {
        register = await pool.connect();
        const { name, email, password } = req.body;
        console.log(name);
        await register.query(`INSERT INTO Users (id, nome, email, password) VALUES (uuid_generate_v4(), '${name}', '${email}', '${password}')`)
        res.send("Cadastrado com sucesso!")
    } catch (error) {
        console.error(error);
        res.status(500).send("Erro ao cadastrar usuário");
    } finally {
        // Liberar a conexão do pool de conexões
        register.release();
    }
});

app.get('/api/getUsers', async(req, res) => {
    try {
        register = await pool.connect();
        const data = await register.query(`SELECT * FROM Users`);
        // console.log(data.rows);
        res.send(data.rows)
    } catch (error) {
        res.status(500).send('Erro na consulta')
    }
})


app.delete('/api/deleteUser/:email', async(req, res) => {
    try {
        register = await pool.connect();
        const {email}= req.params
        await register.query(`DELETE FROM Users WHERE email='${email}'`);
        res.send("Deletado com sucesso!")
    } catch (error) {
        res.status(500).send('Erro na exclusão')
    }
})

app.post('/api/updateUser/:email', async(req, res) => {
    try {
        register = await pool.connect();
        const {email} = req.params
        const { novoEmail, name}= req.body
        console.log({email, novoEmail, name});
        await register.query(`UPDATE Users SET nome='${name}', email='${novoEmail}' WHERE email='${email}';`);
        res.send("alterado com sucesso!")
    } catch (error) {
        console.log(error);
        res.status(500).send('Erro no update')
    }
})