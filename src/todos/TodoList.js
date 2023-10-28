import React, { useEffect } from "react";
import NewTodoForm from "./NewTodoForm";
import TodoListItem from './TodoListItem';
import { loadTodos } from "./thunks";
import { connect } from "react-redux";
import { removeTodo, markTodoAsCompleted } from "./actions";
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
    onRemovePressed: text => dispatch(removeTodo(text)),
    onCompletedPressed: text => dispatch(markTodoAsCompleted(text)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);