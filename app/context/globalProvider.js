"use client";

import React, { createContext, useContext, useEffect, useReducer, useState } from "react";
import themes from "./themes";
import toast from "react-hot-toast";
import axios from "axios";
import { useUser } from "@clerk/nextjs";

const GlobalContext = createContext();
const GlobalContextUpdate = createContext();

export const GlobalProvider = ({ children }) => {
  console.log("GlobalProvider");

  const [selectedTheme, setSelectedTheme] = useState(0);
  const [isLoading, setLoading] = useState(false);
  const [tasks, setTasks] = useState([]);
  const theme = themes[selectedTheme];
  const [modal, setModal] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const { user } = useUser();

  const openModal = () => {
	setModal(true);
  }

  const closeModal = () => {
	setModal(false);
  }

  const getAllTasks = async () => {
    setLoading(true);
    console.log("fetching task data"); 
    try{
      const response = await axios.get("/api/tasks");
	  const sortedTasks = response.data.sort((a, b) => {
		return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
	  });
      setTasks(sortedTasks);
    }catch(error){
      console.log(error);
      toast.error("Failed to fetch tasks");
    }
    
    setLoading(false);
  };

  const deleteTask = async (id) => {
	try {
	  await axios.delete(`/api/tasks/${id}`);
	  getAllTasks();
	  toast.success("Task deleted successfully");
	} catch (error) {
	  console.log(error);
	  toast.error("Failed to delete task");
	}
  };

  const closeSidebar = () => {
	setCollapsed(!collapsed);
  }

  const completedTasks = tasks.filter((task) => task.isCompleted === true);
  const importantTasks = tasks.filter((task) => task.isImportant === true);
  const incompleteTasks = tasks.filter((task) => task.isCompleted === false);
  const updateTask = async (task) => {
	try {
	  await axios.put(`/api/tasks`, {
		id: task.id,
		isCompleted: !task.isCompleted,
	   });
	  getAllTasks();
	  toast.success("Task updated successfully");
	} catch (error) {
	  console.log(error);
	  toast.error("Failed to update task");
	}
  }

  useEffect(() => {
    user && getAllTasks();
  }, [user]);

return (
	<GlobalContext.Provider
		value={{
			theme,
			tasks,
			isLoading,
			deleteTask,
			completedTasks,
			importantTasks,
			incompleteTasks,
			updateTask,
			modal,
			openModal,
			closeModal,
			getAllTasks,
			collapsed,
			closeSidebar
		}}
	>
		<GlobalContextUpdate.Provider value={setSelectedTheme}>
			{children}
		</GlobalContextUpdate.Provider>
	</GlobalContext.Provider>
);
}

export const useGlobalContext = () => useContext(GlobalContext);
export const useGlobalContextUpdate = () => useContext(GlobalContextUpdate);