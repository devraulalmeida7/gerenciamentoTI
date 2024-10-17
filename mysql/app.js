const express = require("express");
const app = express();
const suporteRoutes = require('./routes/suporte');
const chamadosRoutes = require('./routes/chamados');
const cors = require("cors");  // Importa o pacote cors
const body = require("body-parser");

app.use(cors());

app.use(body.json());

//USar as rotes de alunos
app.use('/suporte', suporteRoutes);

//Usar as rotas de cursos
app.use('/chamados', chamadosRoutes);

app.listen(8080, function(){
    console.log("Servidor rodando na porta 8080!");
});