import './styles.css';
import {Todo,TodoList} from './classes/index';
import { crearTodoHtml } from './js/componentes';
 export const todoList=new TodoList();
//creando del localstorage al DOm
todoList.todos.forEach(crearTodoHtml);