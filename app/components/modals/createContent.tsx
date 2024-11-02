"use client";

import { useGlobalContext } from '@/app/context/globalProvider';
import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import styled from 'styled-components';
import Button from '../button/button';
import { plus } from '@/app/utils/icons';

const CreateContent = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [completed, setCompleted] = useState(false);
    const [important, setImportant] = useState(false);
	const {theme, getAllTasks, closeModal} = useGlobalContext();

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const task = {
            title,
            description,
            date,
            completed,
            important
        };
        try{
            const res = await axios.post('/api/tasks', task);
            if(res.data.error){
                // console.log(res.data.error);
                toast.error(res.data.error);
            }else{
                toast.success('Task created');
				getAllTasks();
				closeModal();
            }
        }catch(e){
            // console.log(e);
            toast.error('Error creating task');
        }

    }

    return (
        <CreateContentStyled onSubmit={handleSubmit} theme={theme}>
            <h1>Create Task</h1>
            <div className="input-control">
                <label htmlFor="title">Title</label>
                <input type="text" placeholder='e.g. Complete homework' id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className="input-control">
                <label htmlFor="description">Description</label>
                <textarea id="description" placeholder='e.g. read and write summary for the chapter' value={description} rows={4} onChange={(e) => setDescription(e.target.value)} />
            </div>
            <div className="input-control">
                <label htmlFor="date">Date</label>
                <input type="date" id="date" value={date} onChange={(e) => setDate(e.target.value)} />
            </div>
            <div className="input-control toggler">
                <label htmlFor="completed">Completed</label>
                <input type="checkbox" id="completed" checked={completed} onChange={(e) => {setCompleted(e.target.checked)}} />
            </div>
            <div className="input-control toggler">
                <label htmlFor="important">Important</label>
                <input type="checkbox" id="important" checked={important} onChange={(e) => setImportant(e.target.checked)} />
            </div>
            <div className="submit-btn flex justify-end">
                <Button
					type='submit'
					name='Create Task'
					icon={plus}
					padding='0.8rem 2rem'
					borderRadius='0.8rem'
					fw='500'
					fs='1.2rem'
					background={"rgb(0,163, 255)"}
				/>
            </div>
        </CreateContentStyled>
    );
};

const CreateContentStyled = styled.form`
	>h1{
		font-size: clamp(1.2rem, 5vw, 1.6rem);
		font-weight: 600
	}

	color: ${props => props.theme.colorGrey1};
	
	.input-control{
		position: relative;
		margin: 1rem 0;
		font-weight: 500;

		label{
			display: inline-block;
			margin-bottom: 0.8rem;
			font-size: clamp(1rem, 5vw, 1.2rem);

			span{
				color: ${props => props.theme.colorGrey3};
			}
		}
		
		input,
		textarea {
			width: 100%;
			padding: 1rem;

			resize: none;
			background-color: ${(props) => props.theme.colorGreyDark};
			color: ${(props) => props.theme.colorGrey2};
			border-radius: 0.5rem;
		}
	}

	.submit-btn button{
		transition: all 0.35s ease-in-out;
		i{
			color: ${(props) => props.theme.colorGrey0};
		}
			
		&:hover {
			background: ${(props) => props.theme.colorPrimaryGreen} !important;
			color: ${(props) => props.theme.colorWhite} !important;
		}
	}

	.toggler {
		display: flex;
		align-items: center;
		justify-content: space-between;

		cursor: pointer;

		label {
			flex: 1;
		}

		input {
			width: initial;
		}
	}

`;

export default CreateContent;