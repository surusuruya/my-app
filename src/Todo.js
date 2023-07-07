import React, { useState } from "react";
import styled from "styled-components";

function Input(props){
    
    return (
        <input className="todoInput" onKeyDown={event => {
            if(event.key === "Enter") {
                const _todo = event.target.value;
                props.onChange(_todo);
                
                event.target.value = "";
            }
        }}/>
    )
}

function Todo(){
    const [id, setId] = useState(1);
    const [todoList, setTodoList] = useState([]);
      
    return (
        <Container>
            <Title>오늘 할 일을 작성하세요!</Title>

            <Input onChange={(_todo)=>{
                const newTodo = {id:id, todo:_todo, checked: false,};
                const newList = [...todoList];
    
                newList.push(newTodo);
                setTodoList(newList);
                setId(id+1);
                console.log('todoList:', todoList);
            }}></Input>

            <TodoList>
                <div className="tasks-left">할 일 <span>2</span>개 남음</div>
                <TodoItem todoList={todoList}></TodoItem>
            </TodoList>
        </Container>
    );
}

function TodoItem(props) {
    const list = []

    for(let i=0; i<props.todoList.length; i++) {
        let t = props.todoList[i];
        list.push(
            <li id={t.id} key={t.id} className="todoItem">
                <input type="checkbox" className="todoCheck" checked={t.checked}/>
                {t.todo}
            </li>)
    }

    return (
        <ul className="todoItem_ul">
            {list}
        </ul>
    );
}

const Container = styled.div`
    margin-top: 44px;
    text-align: center;

    .todoInput {
        width: 80%;
        height: 33px;
        padding: 7px;
        outline: none;
        border: 1px solid silver;
        border-radius: 11px;
        background: transparent;
        font-size: 22px;
        color: white;
    }
`;

const TodoList = styled.div`
    margin: 5% 9%;
    text-align: center;
    height: 500px;
    border: 1px solid silver;
    border-radius: 5px;

    .todoItem_ul {
        padding: 0 25px;
    }

    .tasks-left {
        padding: 10px 0;
        color: white;
        font-size: 18px;
        font-weight: bold;
        border-bottom: 1px dotted silver;
    }

    .tasks-left > span {
        color: red;
    }

    .todoItem {
        text-align: left;
        font-size: 18px;
        margin: 25px 0;
        list-style-type: none;
    }

    .todoCheck {
        margin-right: 10px;
    }
`;
    
const Title = styled.div`
    text-align: center;
    margin-bottom: 10px;
`;


export default Todo;