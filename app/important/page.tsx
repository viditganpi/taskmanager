"use client";
import React from 'react';
import { useGlobalContext } from '../context/globalProvider';
import Task from '../components/tasks/tasks';

const Important = () => {
  const {importantTasks} = useGlobalContext();
  return (
    <Task title="Important Tasks" tasks={importantTasks}/>
  );
};

export default Important;