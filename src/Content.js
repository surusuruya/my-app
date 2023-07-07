import React from "react";
import styled from "styled-components";
import Clock from "./Clock";
import Todo from "./Todo";

const Content = ()=>{
    return (
        <Container>
            <Clock />
            <Todo />
        </Container>
    ); 
}

const Container = styled.div`
    position: absolute;
    top: 33px;
    right: 0;
    width: 500px;
    height: calc(100% - 33px);
    color: white;
`;

export default Content;