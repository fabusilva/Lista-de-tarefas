import React, { useState } from 'react';
import './style.css'
function App() {
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');

  const handleTaskNameChange = (event) => {
    setTaskName(event.target.value);
  };

  const handleTaskDescriptionChange = (event) => {
    setTaskDescription(event.target.value);
  };

  const handleTaskSubmit = (event) => {
    event.preventDefault();
    const newTask = {
      name: taskName,
      description: taskDescription,
    };
    setTasks([...tasks, newTask]);
    setTaskName('');
    setTaskDescription('');
  };
  const handleTaskUpdate = (index) => {
    // Aqui você pode implementar a lógica para atualizar uma tarefa específica
    console.log('Atualizar tarefa', index);
  };

  const handleTaskDelete = (index) => {
    // Aqui você pode implementar a lógica para excluir uma tarefa específica
    console.log('Excluir tarefa', index);
  };
  return (
    <div>
    <form onSubmit={handleTaskSubmit}>
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

      <button type="submit">Cadastrar</button>
    </form>

    <h2>Tarefas Cadastradas:</h2>
    {tasks.length === 0 ? (
  <p>Nenhuma tarefa cadastrada.</p>
) : (
  <div>
    {tasks.map((task, index) => (
      <div key={index} style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px" }}>
        <strong>{task.name}</strong>: {task.description}
        <div style={{ marginTop: "10px" }}>
          <button onClick={() => handleTaskUpdate(index)}>Atualizar</button>
          <button onClick={() => handleTaskDelete(index)}>Excluir</button>
        </div>
      </div>
    ))}
  </div>
)}
    </div>
  );
}

export default App;
