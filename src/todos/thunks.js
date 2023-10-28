import {
    createTodo, 
    removeTodo,
    loadTodosInProgress, 
    loadTodosSuccess, 
    loadTodosFailure,
    markTodoAsCompleted, 
        } from "./actions";

export const displayAlert = text => () => {
    alert(text);
};

export const loadTodos = () => async (dispatch, getState) => {

    try{
        dispatch(loadTodosInProgress());

        const response = await fetch('http://localhost:8080/todos-delay');
        const todos = await response.json();
    
        dispatch(loadTodosSuccess(todos));
    }catch(ex){
        dispatch(loadTodosFailure());
        dispatch(displayAlert(ex));
    };
};

export const addTodoRequest = text => async dispatch => {

    const body = JSON.stringify({ text });

    try{
        const response = await fetch('http://localhost:8080/todos', {
            headers: {
                'Content-type': 'application/json',
            },
            method: 'POST',
            body,
        });
        const todo = await response.json();
        dispatch(createTodo(todo));
    }catch(ex){
        dispatch(displayAlert(ex));
    };
};

export const removeTodoRequest = id => async dispatch => {
    
    try{
        const response = await fetch(`http://localhost:8080/todos/${id}`, {
            method: 'DELETE',
        });
        const removedTodo = await response.json();
        dispatch(removeTodo(removedTodo));
    }catch(ex){
        dispatch(displayAlert(es));
    };
};

export const markTodoAsCompletedRequest = id => async dispatch => {

    try{
        const response = await fetch(`http://localhost:8080/todos/${id}/completed`, {
            method: 'POST',
        });
        const updatedTodo = await response.json();
        dispatch(markTodoAsCompleted(updatedTodo));
    }catch(ex){
        dispatch(displayAlert(ex));
    };
};