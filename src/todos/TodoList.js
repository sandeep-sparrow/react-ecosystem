import React, { useEffect } from "react";
import NewTodoForm from "./NewTodoForm";
import TodoListItem from './TodoListItem';
import { loadTodos, removeTodoRequest, markTodoAsCompletedRequest } from "./thunks";
import { connect } from "react-redux";
import './TodoList.css';

const TodoList = ({ todos = [], onRemovePressed, onCompletedPressed, isLoading, startLoadingTodos }) => {

    useEffect(() => {
        startLoadingTodos();
    }, []);

    const loadingMessage = <div>Loading Todos from Backend...</div>;
    const content =  (
        <div className="list-wrapper">
            <NewTodoForm />
            {todos.map(todo => <TodoListItem 
                                    todo={todo} 
                                    onRemovePressed={onRemovePressed}
                                    onCompletedPressed={onCompletedPressed}
                                />
            )}
        </div>
    );

    return isLoading ? loadingMessage : content;
};

const mapStateToProps = state => ({
    todos: state.todos,
    isLoading: state.isLoading,
});

const mapDispatchToProps = dispatch => ({
    startLoadingTodos: () => dispatch(loadTodos()),
    onRemovePressed: id => dispatch(removeTodoRequest(id)),
    onCompletedPressed: id => dispatch(markTodoAsCompletedRequest(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);