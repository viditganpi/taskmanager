"use client";
import React from 'react';
import { useGlobalContext } from '../context/globalProvider';
import Task from '../components/tasks/tasks';

const Incomplete = () => {
	const {incompleteTasks} = useGlobalContext();
  return (
    <Task title="Incomplete Tasks" tasks={incompleteTasks}/>
  );
};

export default Incomplete;