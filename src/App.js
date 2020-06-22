import React, { useState, useEffect } from "react";
import api from './services/api'

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepositories(response.data);
    })
  }, []);

  async function handleAddRepository() {
    // TODO
    const response = await api.post('/repositories', {
      title: `Aplicação teste ${Date.now()}`,
      url: "https://github.com/facebook/react-native",
      techs: ["React Native", "Node"]
    });

    const repository = response.data;
    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    // TODO
    // const response = await api.delete(`/repositories/${id}`);
    await api.delete(`/repositories/${id}`);

    const newRepositories = [...repositories];
    console.log(newRepositories);
    const repositoryIndex = newRepositories.findIndex(repository => repository.id === id);
    newRepositories.splice(repositoryIndex, 1)
    setRepositories([...newRepositories]);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>{repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
              </button>
          </li>
        ))}
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
