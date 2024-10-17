const bd = require("../connection");
const express = require("express");
const app = express.Router();


app.get("/", function(req, res){
    const select = "select * from suporte";
    bd.query(select, function(err, results){
        if(err){
            console.log(err);
        }else{
            res.send(results);
        }
    });
});

app.get("/:id", function(req, res){
    const select = "select * from suporte where id_suporte = ?";
    bd.query(select, [req.params.id], function(err, results){
        if(err){
            console.log(err);
        }else{
            res.send(results);
        }
    });
});

app.delete("/del/:id", function(req, res){
    const del = "delete from suporte where id_suporte = ?";
    bd.query(del, [req.params.id], function(err, results){
        if(err){
            console.log(err);
        }else{
            res.send("Registro apagado com sucesso!");
        }
    });
});

app.post("/insert", function(req, res){
    const insert = "insert INTO suporte SET nome_suporte=?, cargo_suporte=?";
    const body = req.body;
    bd.query(insert, [body.nome_suporte, body.cargo_suporte], function(err, results){
        if(err){
            console.log(err);
        }else{
            res.send("Curso cadastrado com sucesso!");
        }
    });
});

app.put("/update/:id", function(req, res){
    const update = "update suporte SET nome_suporte=?, cargo_suporte=? WHERE id_suporte=?";
    const body = req.body;
    bd.query(update, [body.nome_curso, body.data_inicio, body.duracao_curso, body.descricao_curso, req.params.id], function(err, results){
        if(err){    
            console.log(err);
        }else{
            res.send("Curso atualizado com sucesso!");
        }
    });
});

module.exports = app;