import React, { useState, useEffect } from "react";
import styled from "styled-components";

function Clock(){
    const [date, setDate] = useState(new Date());
    const options = { hour: "numeric", minute: "numeric" };

    useEffect(()=>{
        const id = setInterval(()=>{
            setDate(new Date());
        }, 1000);

        return ()=>
            clearInterval(id);
    }, [])

    return (
        <Container>
            <CurDate>
                {date.getFullYear()}&nbsp;/&nbsp;{date.getMonth()+1}&nbsp;/&nbsp;{date.getDate()}
            </CurDate>

            <CurDav>
                {
                    date.getDay() === 0 ? "Sunday" 
                    : date.getDay() === 1 ? "Monday"
                    : date.getDay() === 2 ? "Tuesday"
                    : date.getDay() === 3 ? "Wednesday"
                    : date.getDay() === 4 ? "Thursday"
                    : date.getDay() === 5 ? "Fridya"
                    : "Saturday"
                }
            </CurDav>
            
            <CurTime>
                {date.toLocaleTimeString('en-US', options)}
            </CurTime>
        </Container>
    );

    

}



const Container = styled.div`
    margin-top: 40px;
    font-size: 40px;
    text-align: center;
`;
const CurDate = styled.div`
    font-size: 24px;
`;
const CurDav = styled.div`
    font-style: italic;
`;
const CurTime = styled.div`
    font-size: 55px;
    font-weight: 600;
`;

export default Clock;