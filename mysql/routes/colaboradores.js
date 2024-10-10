const bd = require("../connection");
const express = require("express");
const app = express.Router();


app.get("/", function(req, res){
    const select = "select * from colaboradores";
    bd.query(select, function(err, results){
        if(err){
            console.log(err);
        }else{
            res.send(results);
        }
    });
});

app.get("/:id", function(req, res){
    const select = "select * from colaboradores where colaborador = ?";
    bd.query(select, [req.params.id], function(err, results){
        if(err){
            console.log(err);
        }else{
            res.send(results);
        }
    });
});

app.delete("/del/:id", function(req, res){
    const del = "delete from colaboradores where id_colaborador = ?";
    bd.query(del, [req.params.id], function(err, results){
        if(err){
            console.log(err);
        }else{
            res.send("Registro apagado com sucesso!");
        }
    });
});

app.post("/insert", function(req, res){
    const insert = "insert INTO colaboradores SET nome_colaborador=?, cargo_colaborador=?";
    const body = req.body;
    bd.query(insert, [body.nome_colaborador, body.cargo_colaborador], function(err, results){
        if(err){
            console.log(err);
        }else{
            res.send("colaborador cadastrado com sucesso!");
        }
    });
});

app.put("/insert/:id", function(req, res){
    const update = "update colaboradores SET nome_colaborador=?, cargo_colaborador=? WHERE id_colaborador=?";
    const body = req.body;
    bd.query(update, [body.nome_colaborador, body.cargo_colaborador, req.params.id], function(err, results){
        if(err){    
            console.log(err);
        }else{
            res.send("Colaborador atualizado com sucesso!");
        }
    });
});

module.exports = app;