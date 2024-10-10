const bd = require("../connection");
const express = require("express");
const app = express.Router();


app.get("/", function(req, res){
    const select = "select * from chamado";
    bd.query(select, function(err, results){
        if(err){
            console.log(err);
        }else{
            res.send(results);
        }
    });
});

app.get("/:id", function(req, res){
    const select = "select * from chamado where id_chamado = ?";
    bd.query(select, [req.params.id], function(err, results){
        if(err){
            console.log(err);
        }else{
            res.send(results);
        }
    });
});

app.delete("/del/:id", function(req, res){
    const del = "delete from chamado where id_chamado = ?";
    bd.query(del, [req.params.id], function(err, results){
        if(err){
            console.log(err);
        }else{
            res.send("Registro apagado com sucesso!");
        }
    });
});

app.post("/insert", function(req, res){
    const insert = "insert INTO chamado SET responsavel_chamado=?";
    const body = req.body;
    bd.query(insert, [body.responsavel_chamado], function(err, results){
        if(err){
            console.log(err);
        }else{
            res.send("Chamado cadastrado com sucesso!");
        }
    });
});

app.put("/insert/:id", function(req, res){
    const update = "update chamado SET  status_chamado=?";
    const body = req.body;
    bd.query(update, [body.status_chamado, req.params.id], function(err, results){
        if(err){    
            console.log(err);
        }else{
            res.send("Status de chamado atualizado com sucesso!");
        }
    });
});

module.exports = app;