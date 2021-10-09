import './styles.css';
import {Todo,TodoList} from './classes/index';
import { crearTodoHtml } from './js/componentes';
 export const todoList=new TodoList();
 const tarea= new Todo('Aprender Javascript');

todoList.nuevoTodo(tarea);
console.log(todoList);
crearTodoHtml(tarea);
