"use client";

import { useGlobalContext } from '@/app/context/globalProvider';
import React from 'react';
import styled from 'styled-components';

const Task = () => {
    const theme = useGlobalContext();

    return (
        <TaskStyled theme={theme}>
            Tasks
        </TaskStyled>
    );
};

const TaskStyled = styled.main`
    width: 100%;
    padding: 2rem;
    background-color: ${(props) => props.theme.colorBg2};
    border: 2px solid ${(props) => props.theme.borderColor2};
    border-radius: 1rem;
    height: 100%;
    
    overflow-y: auto;
    &::-webkit-scrollbar{
        width: 0.5rem;
    }
}`;

export default Task;