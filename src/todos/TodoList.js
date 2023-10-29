import React, { useEffect } from "react";
import NewTodoForm from "./NewTodoForm";
import TodoListItem from './TodoListItem';

import { loadTodos, removeTodoRequest, markTodoAsCompletedRequest } from "./thunks";
import { connect } from "react-redux";
import { getTodosLoading, getCompleteTodos, getInCompleteTodos } from "./selectors";
import './TodoList.css';

const TodoList = ({ completeTodos, inCompleteTodos, onRemovePressed, onCompletedPressed, isLoading, startLoadingTodos }) => {

    useEffect(() => {
        startLoadingTodos();
    }, []);

    const loadingMessage = <div>Loading Todos from Backend...</div>;
    const content =  (
        <div className="list-wrapper">
            <NewTodoForm />
            <h4>Incomplete:</h4>
            {console.log(completeTodos)}
            {inCompleteTodos.map(todo => <TodoListItem 
                                    todo={todo} 
                                    onRemovePressed={onRemovePressed}
                                    onCompletedPressed={onCompletedPressed}
                                />
            )}
            <h4>Complete:</h4>
            {completeTodos.map(todo => <TodoListItem 
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
    isLoading: getTodosLoading(state),
    completeTodos: getCompleteTodos(state),
    inCompleteTodos: getInCompleteTodos(state),
});

const mapDispatchToProps = dispatch => ({
    startLoadingTodos: () => dispatch(loadTodos()),
    onRemovePressed: id => dispatch(removeTodoRequest(id)),
    onCompletedPressed: id => dispatch(markTodoAsCompletedRequest(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);