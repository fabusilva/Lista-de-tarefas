import React, { useEffect, useState } from "react";
import "./style.css";
import axios from "axios";

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskId, setTaskId] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  const getAll = async () => {
    try {
      const response = await axios.get("http://localhost:3000/tarefas");
      const data = response.data;
      console.log(data);
      setTasks(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAll();
  }, []);

  const handleTaskIdChange = (event) => {
    setTaskId(event.target.value);
  };

  const handleTaskNameChange = (event) => {
    setTaskName(event.target.value);
  };

  const handleTaskDescriptionChange = (event) => {
    setTaskDescription(event.target.value);
  };

  const handleTaskSubmit = async () => {
    const id = taskId;
    const newTask = {
      nome: taskName,
      descricao: taskDescription,
    };
    if(isUpdating === true){
      await axios.put(`http://localhost:3000/tarefas/${id}`,newTask);
      setIsUpdating(false);
    }else{
      await axios.post("http://localhost:3000/tarefas", newTask);
    }
    setTaskName("");
    setTaskDescription("");
    setTaskId("");
    getAll();
  };

  const handleTaskUpdate = async (index) => {
    const response = await axios.get(`http://localhost:3000/tarefas/${index}`)
    const data = response.data;
    setTaskId(data._id);
    setTaskName(data.nome);
    setTaskDescription(data.descricao);
    setIsUpdating(true);
  };

  const handleTaskDelete = async (index) => {
    await axios.delete(`http://localhost:3000/tarefas/${index}`);
    getAll();
  };

  return (
    <div>
      <form>
        <label className="hidden" htmlFor="taskId">ID da Tarefa:</label>
        <input
          type="text"
          id="taskId"
          value={taskId}
          className="hidden"
          onChange={handleTaskIdChange}
        />
        <label htmlFor="taskName">Nome da Tarefa:</label>
        <input
          type="text"
          id="taskName"
          value={taskName}
          onChange={handleTaskNameChange}
        />

        <label htmlFor="taskDescription">Descrição:</label>
        <textarea
          id="taskDescription"
          value={taskDescription}
          onChange={handleTaskDescriptionChange}
        />

        <button type="button" onClick={handleTaskSubmit}>Cadastrar</button>
      </form>

      <h2>Tarefas Cadastradas:</h2>
      {tasks.length === 0 ? (
        <p>Nenhuma tarefa cadastrada.</p>
      ) : (
        <div>
          {tasks.map((task, index) => (
            <div
              key={index}
              style={{
                border: "1px solid #ccc",
                padding: "10px",
                marginBottom: "10px",
              }}
            >
              <h3>{task.nome}</h3>
              <p>{task.descricao}</p>

              <div style={{ marginTop: "10px" }}>
                <button onClick={() => handleTaskUpdate(task._id)}>
                  Atualizar
                </button>
                <button onClick={() => handleTaskDelete(task._id)}>
                  Excluir
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
