import "./App.css";
import { useEffect, useState } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";

function App() {
  // App guarda el estado compartido para que input y lista usen la misma informacion.
  const [tasks, setTasks] = useState([]);

  // --------------------------------------------------------------------------------
  // 2) CONEXION BACKEND

  useEffect(() =>{
    fetch("http://localhost:3000/tasks")
      .then((response) => response.json())
      .then((data) => {
        setTasks(data)
      })
      .catch((error) => {
        console.error("Error al obtener tareas:", error)
      })
  }, [])

  // --------------------------------------------------------------------------------

  // const addTask = (taskText) => {
  //   const cleanText = taskText.trim();

  //   if (!cleanText) {
  //     return;
  //   }

  //   const newTask = {
  //     id: Date.now(),
  //     text: cleanText,
  //     completed: false,
  //   };

  //   setTasks((currentTasks) => [...currentTasks, newTask]);
  // };

  const addTask = (taskText) => {
    const cleanText = taskText.trim()
    
    if (!cleanText){
      return
    }

    const newTask = {
      // id: Date.now(), // ya no es necesario por el 'autoincrement' que usa el DB
      text: cleanText,
      completed: false
    }

    fetch("http://localhost:3000/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
        body: JSON.stringify(newTask),
    })
    .then((response) => response.json())
    .then((data) =>{
      console.log('Tarea creada en backend', data)

      // Agregamos la nueva tarea al estado para actualizar la pantalla
      setTasks([...tasks, data])
    })
    .catch((error) => {
      console.error('Error al crear tarea:', error)
    })

  }

  // --------------------------------------------------------------------------------
  
  // const removeTask = (taskId) => {
  //   setTasks((currentTasks) =>
  //     currentTasks.filter((task) => task.id !== taskId)
  //   );

  // };

  // DELETE

  const removeTask = async (id) => {
  console.log(id)
  try {
    await fetch(`http://localhost:3000/tasks/${id}`, {
      method: "DELETE",
    });
  

    // 🔥 actualizar estado SIN recargar
    setTasks((prev) => prev.filter((task) => task.id !== id));
  } catch (error) {
    console.error("Error eliminando:", error);
  }
};

  // --------------------------------------------------------------------------------

  const toggleTask = (taskId) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };



  return (
    <main className="app-shell">
      <section className="task-manager">
        <Header />
        <TaskInput onAddTask={addTask} />
        <TaskList
          tasks={tasks}
          onToggleTask={toggleTask}
          onRemoveTask={removeTask}
        />
        <Footer />
      </section>
    </main>
  );
}

export default App;
