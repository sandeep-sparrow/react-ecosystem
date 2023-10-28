import { loadTodosInProgress, loadTodosSuccess, loadTodosFailure } from "./actions";

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