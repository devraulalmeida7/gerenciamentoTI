const bd = require("../connection");
const express = require("express");
const app = express.Router();

// Rota que retorna todos os chamados com o nome do responsável
app.get("/responsavel", function(req, res) {
    const select = `
        SELECT chamados.*, suporte.nome_suporte 
        FROM chamados 
        LEFT JOIN suporte ON chamados.responsavel_chamado = suporte.id_suporte
    `;
    bd.query(select, function(err, results) {
        if (err) {
            console.log(err);
            res.status(500).send("Erro ao buscar chamados com responsável.");
        } else {
            res.send(results);
        }
    });
});

// Rota que retorna um chamado específico pelo ID com o nome do responsável
app.get("/responsavel/:id", function(req, res) {
    const select = `
        SELECT chamados.*, suporte.nome_suporte 
        FROM chamados 
        LEFT JOIN suporte ON chamados.responsavel_chamado = suporte.id_suporte 
        WHERE chamados.id_chamado = ?
    `;
    
    bd.query(select, [req.params.id], function(err, results) {
        if (err) {
            console.log(err);
            res.status(500).send("Erro ao buscar o chamado.");
        } else {
            res.send(results);
        }
    });
});

// Rota que retorna chamados pelo status, junto com o nome do responsável
app.get("/responsavel/status/:status", function(req, res) {
    const select = `
        SELECT chamados.*, suporte.nome_suporte 
        FROM chamados 
        LEFT JOIN suporte ON chamados.responsavel_chamado = suporte.id_suporte 
        WHERE chamados.status_chamado = ?
    `;
    
    bd.query(select, [req.params.status], function(err, results) {
        if (err) {
            console.log(err);
            res.status(500).send("Erro ao buscar chamados por status.");
        } else {
            res.send(results);
        }
    });
});

// Rota que retorna todos os chamados (sem o nome do responsável)
app.get("/", function(req, res) {
    const select = "SELECT * FROM chamados";
    bd.query(select, function(err, results) {
        if (err) {
            console.log(err);
            res.status(500).send("Erro ao buscar chamados.");
        } else {
            res.send(results);
        }
    });
});

// Rota que retorna um chamado específico pelo ID (sem o nome do responsável)
app.get("/:id", function(req, res) {
    const select = "SELECT * FROM chamados WHERE id_chamado = ?";
    bd.query(select, [req.params.id], function(err, results) {
        if (err) {
            console.log(err);
            res.status(500).send("Erro ao buscar o chamado.");
        } else {
            res.send(results);
        }
    });
});

// Rota que retorna chamados por status (sem o nome do responsável)
app.get("/status/:status", function(req, res) {
    const select = "SELECT * FROM chamados WHERE status_chamado = ?";
    bd.query(select, [req.params.status], function(err, results) {
        if (err) {
            console.log(err);
            res.status(500).send("Erro ao buscar chamados por status.");
        } else {
            res.send(results);
        }
    });
});

// Rota para deletar um chamado
app.delete("/del/:id", function(req, res) {
    const del = "DELETE FROM chamados WHERE id_chamado = ?";
    bd.query(del, [req.params.id], function(err, results) {
        if (err) {
            console.log(err);
            res.status(500).send("Erro ao deletar o chamado.");
        } else {
            res.send("Registro apagado com sucesso!");
        }
    });
});

// Rota para inserir um chamado
app.post("/insert", function(req, res) {
    const insert = "INSERT INTO chamados SET status_chamado=?, responsavel_chamado=?";
    const body = req.body;
    bd.query(insert, [body.status_chamado, body.responsavel_chamado], function(err, results) {
        if (err) {
            console.log(err);
            res.status(500).send("Erro ao inserir chamado.");
        } else {
            res.send("Chamado cadastrado com sucesso!");
        }
    });
});

// Rota para atualizar um chamado
app.put("/update/:id", function(req, res) {
    const update = "UPDATE chamados SET status_chamado=?, responsavel_chamado=? WHERE id_chamado=?";
    const body = req.body;
    bd.query(update, [body.status_chamado, body.responsavel_chamado, req.params.id], function(err, results) {
        if (err) {    
            console.log(err);
            res.status(500).send("Erro ao atualizar chamado.");
        } else {
            res.send("Chamado atualizado com sucesso!");
        }
    });
});

module.exports = app;