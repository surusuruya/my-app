import React, { useState, useRef, useCallback } from "react";
import styled from "styled-components";
import cn from 'classnames';
import {MdAdd, MdCheckBoxOutlineBlank, MdCheckBox, MdRemoveCircleOutline} from "react-icons/md";


function Todo(){
    const [todos, setTodos] = useState([
        {
            id: 1,
            text: 'TODO LIST 완성하기',
            checked: true,
        },
        {
            id: 2,
            text: 'React 공부하기',
            checked: false,
        },
    ]);

    const nextId = useRef(3);

    const onInsert = useCallback(text => {
        const todo = {
            id : nextId.current,
            text,
            checked : false,
        };
        setTodos(todos.concat(todo));
        nextId.current++;
    }, [todos]);

    const onRemove = useCallback(id => {
        setTodos(todos.filter(
            todo => todo.id !== id
        ))
    }, [todos]);

    const onToggle = useCallback(id => {
        setTodos(todos.map(todo =>
                todo.id === id ? {...todo, checked: !todo.checked} : todo,
            ),
        );
    }, [todos]);


    return (
        <Container>
            <TodoInsert onInsert={onInsert} />            
            <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle} />
        </Container>
    );
}





function TodoInsert({onInsert}){
    const [value, setValue] = useState('');
    const onChange = useCallback(e => {
        setValue(e.target.value);
    }, []);
    const onSubmit = useCallback(e => {
        onInsert(value);
        setValue('');
        // 새로고침 막기
        e.preventDefault();
    }, [onInsert, value]);

    return (
        <form onSubmit={onSubmit}>
                <input className="todoInput" placeholder="할 일 추가하기" value={value} onChange={onChange}/>
                <button className="subBtn" type="submit">
                    <MdAdd />
                </button>
            </form>
    )
}

function TodoList({todos, onRemove, onToggle}){
    return (
        <div className="todoList">
            {todos.map(todo => (
                <TodoListItem todo={todo} key={todo.id} onRemove={onRemove} onToggle={onToggle} />
            ))}
        </div>
    )
}

function TodoListItem({todo, onRemove, onToggle}){
    const {id, text, checked} = todo;

    return (
        <div className="todoListItem">
            <div className={cn('todoCheck', {checked})} onClick={()=>onToggle(id)}>
                {checked ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
                <div className="todoText">{text}</div>
            </div>
            <div className="todoRemove" onClick={()=>onRemove(id)}>
                <MdRemoveCircleOutline />
            </div>
        </div>
    )
}


const Container = styled.div`
    margin-top: 44px;
    text-align: center;

    .todoInput {
        width: 67%;
        height: 33px;
        padding: 7px;
        outline: none;
        border: 2px solid silver;
        border-radius: 5px;
        background: transparent;
        font-size: 22px;
        color: white;
    }

    .subBtn {
        margin-left: 5px;
        width: 50px;
        height: 50px;
        color: white;
        font-size: 20px;
        background: transparent;
        border: 2px solid silver;
        outline: none;
        border-radius: 5px;
        cursor: pointer;
    }

    .subBtn:hover {
        background: white;
        color: black;
    }


    .todoList {
        text-align: left;
        margin: 5% 9%;
        min-height: 512px;
        overflow: auto;
        border: 1px solid silver;
        border-radius: 5px;
    }

    .todoListItem {
        padding: 1rem;
        display: flex;
        align-items: center;

        &:nth-child(even) {
            background: rgba(255,255,255,0.2);
        }

        .todoCheck {
            cursor: pointer;
            flex: 1;
            display: flex;
            align-items: center;

            svg {
                font-size: 1.5rem;
            }

            .todoText {
                margin-left: 0.5rem;
                flex: 1;
            }

            &.checked {
                svg {
                    color: #22b8fc;
                }

                .todoText {
                    color: #22b8fc;
                    text-decoration: line-through;
                }
            }
        }

        .todoRemove {
            display: flex;
            align-items: center;
            font-size: 1.5rem;
            color: tomato;
            cursor: pointer;

            &:hover {
                color: red;
            }
        }

        & + & {
            border-top: px solid blue;
        }
    }
    // todoListItem END


`;




export default Todo;