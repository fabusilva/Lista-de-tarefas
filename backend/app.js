const express = require("express");
const cors = require("cors");
const { conectandoMongo, getMongo } = require('./banco');
const { ObjectId } = require("mongodb");

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

//Conexão do banco
let db;
conectandoMongo((error) => {
  if (!error) {
    app.listen(port, function () {
      console.log(`Servidor rodando em http://localhost:${port}/tarefas`);
    });
    db = getMongo();
  }
});

//Listar todas as tarefas
app.get('/tarefas', async (req, res) => {
  try {
    const arrayTarefas = await db.collection('tarefas').find({}).toArray();
    res.status(200).json(arrayTarefas);
  } catch (error) {
    console.log('Erro ao listar tarefas:', error);
    res.status(500).json({ msg: "Erro ao listar tarefas!" });
  }
});

//Listar uma tarefa
app.get('/tarefas/:id', async (req, res) => {
  try {
    const tarefa = await db.collection('tarefas').findOne({ _id: new ObjectId(req.params.id) });
    res.status(200).json(tarefa);
  } catch (error) {
    console.log('Erro ao listar tarefas:', error);
    res.status(500).json({ msg: "Erro ao listar tarefa!" });
  }
});

//Criar uma tarefa
app.post('/tarefas', async (req,res) =>{
  try {
    const { nome, descricao } = req.body;
    const tarefa = { nome, descricao };
    const banco = await db.collection('tarefas').insertOne(tarefa);
    res.status(200).json(banco)
  } catch (error) {
    console.log('Erro ao criar tarefa: ', error);
    res.status(500).json({ msg: "Erro ao criar tarefa!" });
  }
});

//Deletar uma tarefa
app.delete('/tarefas/:id', async(req, res) =>{
  try {
    const tarefa = await db.collection('tarefas').deleteOne({ _id: new ObjectId(req.params.id) });
    res.status(200).json({msg:`Tarefa ${tarefa.nome} foi excluida!`});
  } catch (error) {
    console.log('Erro ao deletar a tarefa: ',error);
    res.status(500).json({ msg: "Erro ao deletar tarefa!" });
  }
});
//Atualizando tarefa
app.put('/tarefas/:id', async (req,res) =>{
  try {
    const nome = req.body.nome;
    const descricao = req.body.descricao;
    const updates = {nome,descricao};
    const tarefa = await db.collection('tarefas').updateOne({ _id: new ObjectId(req.params.id) },{$set:updates});
    res.status(200).json({msg:`Tarefa ${updates.nome} foi atualizada!`});
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Erro ao atualizar tarefa!" });
  }
})