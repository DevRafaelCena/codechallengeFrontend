import './App.css';
import React, {useEffect,useState} from 'react';
import FormTodo from './components/NewTask';


import Tasks from './components/Tasks'

function App() {

  const [todos, setTodos] = useState([]);
  const [todosCompleted, setTodosCompleted] = useState([]);
  const [body, setBody] = useState(  <Tasks todos={todos} todosCompleted={todosCompleted} updateTodos={(list) => { setTodos(list) }}   updateTodosCompleted={(list) => { setTodosCompleted(list) }} />)
  

 
  useEffect(()=>{
    setBody(
      <>
         <Tasks todos={todos} todosCompleted={todosCompleted} updateTodos={(list) => { setTodos(list) }}   updateTodosCompleted={(list) => { setTodosCompleted(list) }} />
      </>

    );

  },[todos,todosCompleted])
  return (
    <div className="App">
      <header className="App-header">
        <h1> To-do List</h1>
        <FormTodo  updateTodos={(list)=> { setTodos(list)}}/>

      <div id="grid">
        {body}
      </div>
      </header>
    </div>
  );
}

export default App;
