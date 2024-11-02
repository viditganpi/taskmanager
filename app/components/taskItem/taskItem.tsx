"use client";
import { useGlobalContext } from '@/app/context/globalProvider';
import formatDate from '@/app/utils/formatDate';
import { edit, trash } from '@/app/utils/icons';
import React from 'react';
import styled from 'styled-components';

interface Props {
    title: string;
    description: string;
    date: string;
    isCompleted: boolean;
    isImportant: boolean;
	id: string;
}

const TaskItem = ({title, description, date, isCompleted, id}: Props) => {

	const {theme, deleteTask} = useGlobalContext();
	const {updateTask} = useGlobalContext();
	
    return (
        <TaskItemStyled theme={theme}>
            <h1>{title}</h1>
            <p>{description}</p>
            <p className='date'>{formatDate(date)}</p>
            <div className="task-footer">
                {isCompleted ? <button className='completed' onClick={() => updateTask({
					id,
					isCompleted
				})} >
					Completed
					</button> : <button className='incomplete' onClick={()=> updateTask({
					id,
					isCompleted
				})}>Incomplete</button>}
                <button className="edit">{edit}</button>    
                <button className="delete" onClick={() => deleteTask(id)}>{trash}</button>    
            </div>
        </TaskItemStyled>
    );
};

const TaskItemStyled = styled.div`
	padding: 1.2rem 1rem;
	border-radius: 1rem;
	background-color: ${(props) => props.theme.borderColor2};
	box-shadow: ${(props) => props.theme.shadow7};
	border: 2px solid ${(props) => props.theme.borderColor2};

	height: 16rem;
	display: flex;
	flex-direction: column;
	gap: 0.5 rem;

	.date{
		margin-top: auto;
	}
	
	> h1{
		font-size: 1.5rem;
		font-weight: 800;
	}

	.task-footer{
		display: flex;
		gap: 1.2rem;
		align-items: center;

		button{
			border: none;
			outlint: none;
			cursor: pointer;

			i{
				font-size: 1.4rem;
				color: ${(props) => props.theme.colorGrey2};
			}
		}

		.edit{
			margin-left: auto;
		}

		.completed, .incomplete{
			display: inline-block;
			padding: 0.5rem 1rem;
			border-radius: 30px;
			background: ${(props) => props.theme.colorDanger};
		}

		.completed{
			background: ${(props) => props.theme.colorGreenDark};
		}
	}
`;

export default TaskItem;