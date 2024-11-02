"use client";

import { useGlobalContext } from '@/app/context/globalProvider';
import React from 'react';
import styled from 'styled-components';
import CreateContent from '../modals/createContent';
import TaskItem from '../taskItem/taskItem';
import { plus } from '@/app/utils/icons';
import Modal from '../modals/modal';

interface Props{
    title: string;
    tasks: any[];
}

const Task = ({title, tasks}: Props) => {
    const {theme, isLoading, openModal, modal} = useGlobalContext();
    return (
        <TaskStyled theme={theme}>
            <h1>{title}</h1>
			{modal && <Modal content={<CreateContent />} />}
			<div className="tasks grid">
				{
					!isLoading && tasks.map((task) => {
						return <TaskItem key={task.id} title={task.title} description={task.description} date={task.date} isCompleted={task.isCompleted} isImportant={task.isImportant} id={task.id} />;
					})
				} 
				<button className="create-task" onClick={()=>openModal()}>
					{plus}
					Create new task
				</button>
			</div>
		{/* <CreateContent /> */}
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

	.tasks{
		margin: 4rem 0;
	}

    > h1{
        font-size: clamp(1.5rem, 2vw, 2rem);
        font-weight: 800;
        position: relative;

        &::after{
			content: "";
			position: absolute;
			bottom: 0.5rem;
			left: 0;
			width: 3rem;
			height: 0.2rem;
			background-color: ${(props) => props.theme.colorPrimaryGreen};
			border-radius: 0.5rem;
        }
    }
	
	.create-task{
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		height: 16rem;
		color: ${(props) => props.theme.colorGrey2};
		font-weight: 600;
		cursor: pointer;
		border-radius: 1rem;
		border: 3px dashed ${(props) => props.theme.colorGrey5};
		transition: all 0.3s ease;

		&:hover{
			color: ${(props) => props.theme.colorGrey5};
			background-color: ${(props) => props.theme.colorGrey0};
		}
	}
}`;

export default Task;