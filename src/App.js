import React,{useState,useEffect} from "react";
import api from './services/api';

import './App.css';

import "./styles.css";

function App() {
    const [repositories,setRepositories] = useState([]);

    useEffect(()=>{

      api.get('repositories').then(response =>{
        setRepositories(response.data);
      });
        
    },[]);
  async function handleAddRepository() {
    const response = await api.post('repositories',{
      title:"Desafio Node.js",
      url:"https://github.com/brenokf/desafio-Conceitos-do-Node.js",
      techs:["Node.js","React.js","React Native"]
    });

    const repository = response.data;
    setRepositories([...repositories,repository]);

  };

  async function handleRemoveRepository(id) {
  
    await api.delete(`repositories/${id}`);                                                                                                                                                                                                
   setRepositories(repositories.filter(repository=>repository.id !==id));

    //const repositoryid = response.data.filter(repositoryid=>repository.data.id !== id);
    //setRepositories([...repositories,repositoryid]);




      



    
  
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository =>
            <li key={repository.id}>
              {repository.title}

          <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>
        </li>
        )} 
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
