import React, { useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { addTodoRequest } from './thunks';
import { getTodos } from './selectors';

const FormContained = styled.div`
    border-radius: 8px;
    padding: 16px;
    text-align: center;
    box-shadow: 0 4px 8px grey;
`;

const NewTodoInput = styled.input`
    font-size: 16px;
    padding: 8px;
    border: none;
    border-bottom: 2px solid #ddd;
    border-radius: 8px;
    width: 70%;
    outline: none;
`;

const NewTodoButton = styled.button`
    font-size: 16px;
    padding: 8px;
    border: none;
    border-radius: 8px;
    outline: none;
    cursor: pointer;
    margin-left: 8px;
    width: 20%;
    background-color: #22ee22;
`;

const NewTodoForm = ({ todos, onCreatePressed }) => {
    const [inputValue, setInputValue] = useState('');

    return (
        <FormContained>
            <NewTodoInput
                className="new-todo-input"
                type="text"
                placeholder="Type your new todo here"
                value={inputValue}
                onChange={e => setInputValue(e.target.value)} />
            <NewTodoButton 
                className="new-todo-button"
                onClick={() => {
                    const isDuplicateText = 
                        todos.some(todo => todo.text === inputValue);
                    if(!isDuplicateText){
                        onCreatePressed(inputValue);
                        setInputValue('');
                    }
                }}
            >
                Create Todo
            </NewTodoButton>
        </FormContained>
    );
};

const mapStateToProps = state => ({
    todos: getTodos(state),
});

const mapDisptachToProps = disptach => ({
    onCreatePressed: text => disptach(addTodoRequest(text)),
});

export default connect(mapStateToProps, mapDisptachToProps)(NewTodoForm);