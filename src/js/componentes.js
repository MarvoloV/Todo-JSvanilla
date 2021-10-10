import { todoList } from "..";
import { Todo, TodoList } from "../classes";

//referencias en el Html
const divTodoList            = document.querySelector('.todo-list');
const txtInput               = document.querySelector('.new-todo');
const btnBorrarCompletados   = document.querySelector('.clear-completed');
const ulFilters              = document.querySelector('.filters') ;
const ancorFiltros           = document.querySelectorAll('.filtro') ;
const spanTodoCount          = document.querySelector('.todo-count') ;
/* spanTodoCount.firstChild=todoList */

export const actualizarPendientes= ()=>{
    spanTodoCount.firstChild.innerText=todoList.pendientes();
}
export const crearTodoHtml=(todo)=>{
    const htmlTodo =/*html*/ `
        <li class="${(todo.completado)?'completed':''}" data-id="${todo.id}">
            <div class="view">
                <input class="toggle" type="checkbox" ${(todo.completado)?'checked':''}>
                <label>${todo.tarea}</label>
                <button class="destroy"></button>
            </div>
            <input class="edit" value="Create a TodoMVC template">
        </li>
    `;
    const div=document.createElement('div');
    div.innerHTML=htmlTodo;
    divTodoList.append(div.firstElementChild);
    actualizarPendientes();
    return div.firstElementChild;
}
//eventos
txtInput.addEventListener('keyup', (event)=>{
    if(event.keyCode===13 && txtInput.value.length>0){
        console.log(txtInput.value);
        const nuevoTodo = new Todo(txtInput.value);
        todoList.nuevoTodo(nuevoTodo);
        crearTodoHtml(nuevoTodo);
        txtInput.value='';
        console.log(todoList);
        actualizarPendientes();
    }
});
divTodoList.addEventListener('click',(event)=>{
    const nombreElemento = event.target.localName;
    const todoElemento   =event.target.parentElement.parentElement;
    const todoId= todoElemento.getAttribute('data-id');
    
    if (nombreElemento.includes('input')) {
        todoList.marcarCompletado(todoId);
        todoElemento.classList.toggle('completed');
    }else if(nombreElemento.includes('button')){
        todoList.eliminarTodo(todoId);
        divTodoList.removeChild(todoElemento);
    }
    actualizarPendientes();
});
btnBorrarCompletados.addEventListener('click',()=>{
    todoList.eliminarCompletados();
    for (let i = divTodoList.children.length-1; i >=0; i--) {
        const elemento= divTodoList.children[i];
        if (elemento.classList.contains('completed')) {
            divTodoList.removeChild(elemento);
        }
    }
    actualizarPendientes();
});
ulFilters.addEventListener('click',(event)=>{
    const filtro=event.target.text;
    if(!filtro){return};

    ancorFiltros.forEach(elem => elem.classList.remove('selected'));
    event.target.classList.add('selected');
    for (const elemento of divTodoList.children) {
        elemento.classList.remove('hidden');
        const completado= elemento.classList.contains('completed');
        switch (filtro) {
            case 'Pendientes':
                if (completado) {
                    elemento.classList.add('hidden');
                }
                break;
            case 'Completados':
                if (!completado) {
                    elemento.classList.add('hidden');
                }
                break;
        }
    } 
    actualizarPendientes();
});
