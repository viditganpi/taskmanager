"use client";
import React from 'react';
import Task from '../components/tasks/tasks';
import { useGlobalContext } from '../context/globalProvider';

function Completed() {
  const {completedTasks} = useGlobalContext();
  return (
    <Task title="Completed Tasks" tasks={completedTasks}/>
  );
};

export default Completed;