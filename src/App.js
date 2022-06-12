
import Navbar from './components/Navbar'
import Footer from './components/Footer';
import Cards from './components/Cards';
import { useState, useEffect } from 'react'

function App() {
  const [todos, setTodos] = useState([])
  const [todo, setTodo] = useState('')
  const [todoEditing, setTodoEditing] = useState(null)
  const [editingText, setEditingText] = useState("")

  useEffect(() => {
    const json = localStorage.getItem("todos");
    const loadedTodos = JSON.parse(json);
    if (loadedTodos) {
      setTodos(loadedTodos);
    }
  }, []);


  useEffect(() => {
    const json = JSON.stringify(todos);
    localStorage.setItem("todos", json);
  }, [todos]);


function handleSubmmit(e) {
      e.preventDefault()

      const newTodo = {
        id: new Date().getTime(),
        text:todo,
        completed: false,
      }
      setTodos([...todos].concat(newTodo))
      setTodo("")
  }

  function deleteTodo(id) {
      const updateTodos = [...todos].filter((todo) => todo.id !== id )

      setTodos(updateTodos)
  }

  function togglecomplete(id) {
    const updatedtodos = [...todos].map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed
      }
      return todo
    } )

    setTodos(updatedtodos)

  }

  function editTodo(id) {
    const updatedTodos = [... todos].map((todo) => {
      if (todo.id === id) {
        todo.text = editingText
      }
      return todo
    })
    setTodos(updatedTodos)
    setTodoEditing(null)
    setEditingText(" ")
  }


  return(
    <>
    < Navbar />
    <br/>
    <div className='container' >
      <form  onSubmit={handleSubmmit}>
        <input type='text' placeholder='todo' onChange={(e) => setTodo(e.target.value)} value={todo} />
        <button type='submit'>Add Todo</button>
      </form>
      {todos.map((todo) =>
      <div key={todo.id}>
        {todoEditing === todo.id ?
        (<input type='text' onChange=
        {(e) => setEditingText(e.target.value)  }
        value={editingText} />)
         : (<div> {todo.text}</div>)}


      <button onClick={() => deleteTodo(todo.id)}>delete</button>
      <input type='checkbox'
      onChange={() =>
      togglecomplete(todo.id)}
      checked={todo.completed} />
      {todoEditing === todo.id ? (<button onClick={() => editTodo(todo.id)}>
        submit edit</button>) : ( <button onClick={() => setTodoEditing(todo.id)}>Edit Todo</button>)}



      </div> )}


    </div>
    </>
  );
}
export default App;


















