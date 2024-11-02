
"use client";

import Image from "next/image";
import Task from "./components/tasks/tasks";
import { useGlobalContext } from "./context/globalProvider";

export default function Home() {
  const {tasks} = useGlobalContext();
  console.log("Printing tasks ", tasks);
  return (
      <Task title="All Tasks" tasks={tasks}/>
  );
}
