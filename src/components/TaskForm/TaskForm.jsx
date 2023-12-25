/* eslint-disable no-unused-vars */

// import { useContext } from 'react';
// import { useForm } from 'react-hook-form';
// import { AuthContext } from '../../Provider/AuthProvider';
// import axios from 'axios';
// import toast, { Toaster } from 'react-hot-toast';

// import { useQuery } from "@tanstack/react-query";

// const TaskForm = () => {
//   const { register, handleSubmit,reset } = useForm();
//   const {user} = useContext(AuthContext)

//   const { data:tasks = [], refetch } = useQuery({
//     queryKey: ["tasks"],
//     queryFn: async () => {
//       const res = await axios.get("https://backend-task-cejnmn6ow-tanvir-haans-projects.vercel.app/tasks");
//       return res.data;
//     },
//   });

//   const onSubmit = (data) => {
//     console.log(data);
//     const tasks = {
//         title: data.title,
//         description : data.description,
//         priority: data.priority,
//         deadline: data.deadline,
//         email: user.email
//     }
//     axios.post("https://backend-task-cejnmn6ow-tanvir-haans-projects.vercel.app/tasks",tasks)
//     .then(res=>{
//         if(res.data.insertedId){
//             toast.success("Task added successfully..")
//             refetch()
//             reset()
//         }
//     })
//   };

//   return (
//     <>
//    <div className='w-[60%] mx-auto  '>
//      <form onSubmit={handleSubmit(onSubmit)} className='rounded-xl bg-base-300 p-8 space-y-4'>

//         {/* Task Title  */}
//       <div>
//         <label htmlFor="title" className="block text-sm font-medium text-gray-700">
//           Task Title
//         </label>
//         <input
//           required
//           type="text"
//           id="title"
//           name="title"
//           placeholder="Task Title"
//           {...register('title', { required: true })}
//           className="w-full px-4 py-3 rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 focus:dark:border-violet-400"
//         />
//       </div>

//         {/* description  */}

//       <div>
//         <label className="block text-sm font-medium text-gray-700">
//           Description
//         </label>
//         <textarea
//           required
//           id="description"
//           name="description"
//           placeholder="Description"
//           rows="2"
//           className="w-full px-4 py-3 rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 focus:dark:border-violet-400"
//           {...register('description', { required: true })}
//         />
//       </div>

//     <div className="mb-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
//       {/* Priority (one column) */}
//       <div>
//         <label htmlFor="priority" className="block text-sm font-medium text-gray-700">
//           Priority
//         </label>
//         <select
//           required
//           id="priority"
//           name="priority"
//           className="w-full px-4 py-3 rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 focus:dark:border-violet-400"
//           {...register('priority', { required: true })}
//         >
//           <option value="" disabled>Select Priority</option>
//           <option value="low">Low</option>
//           <option value="moderate">Moderate</option>
//           <option value="high">High</option>
//         </select>
//       </div>

//       {/* Deadline (one column) */}
//       <div>
//         <label htmlFor="deadline" className="block text-sm font-medium text-gray-700">
//           Deadline
//         </label>
//         <input
//           required
//           type="date"
//           id="deadline"
//           name="deadline"
//           className="w-full px-3 py-3 rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 focus:dark:border-violet-400"
//           {...register('deadline', { required: true })}
//         />
//       </div>
//     </div>

//     <button type="submit" className="btn btn-primary">
//       Add Task
//     </button>
//   </form>

//    </div>
//    <div className='grid grid-cols-1 lg:grid-cols-3'>
//            {/* todo  */}
//            <div>
//             <h1>todo</h1>
//            {
//                 tasks?.map((task,idx)=><div key={task._id}>
//                     <h1>{idx+1}.{task.title}</h1>

//                 </div>)
//             }
//            </div>

//            {/* ongoing  */}
//            <div>ongoing</div>
//            {/* complete  */}

//            <div>complete</div>

//         </div>
//   <Toaster />
//    </>
//   );
// };

import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../Provider/AuthProvider";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useDrag, useDrop } from "react-dnd";
import TaskFormCard from "./TaskFormCard";
import Ongoing from "./Ongoing";
import Profile from "../Profile/Profile";
import Complete from "./Complete";

const TaskForm = () => {
  const [tasks, setTasks] = useState([]);
  const [ongoing, setOngoing] = useState([]);
  const [completed, setCompleted] = useState([]);
  const { register, handleSubmit, reset } = useForm();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    axios
      .get("https://backend-task-cejnmn6ow-tanvir-haans-projects.vercel.app/tasks")
      .then((res) => {
        const filteredData = res.data.filter(
          (task) => task.email === user.email
        );
        setTasks(filteredData);
      });
  }, [user.email]);

  const onSubmit = (data) => {
    const taskData = {
      title: data.title,
      description: data.description,
      priority: data.priority,
      deadline: data.deadline,
      email: user.email,
      status: "Todo",
    };

    axios
      .post(
        "https://backend-task-cejnmn6ow-tanvir-haans-projects.vercel.app/tasks",
        taskData
      )
      .then((res) => {
        if (res.data.insertedId) {
          toast.success("Task added successfully..");
          axios
            .get("https://backend-task-cejnmn6ow-tanvir-haans-projects.vercel.app/tasks")
            .then((res) => {
              const filteredData = res.data.filter(
                (task) => task.email === user.email
              );
              setTasks(filteredData);
            });
          reset();
        }
      });
  };

  const [{ isOver: isOverOngoing }, dropOngoing] = useDrop(() => ({
    accept: "todo",
    drop: (item) =>
      addOngoing(
        item.id,
        item.title,
        item.description,
        item.deadline,
        item.priority
      ),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const [{ isOver: isOverCompleted }, dropCompleted] = useDrop(() => ({
    accept: "todo",
    drop: (item) =>
      addCompleted(
        item.id,
        item.title,
        item.description,
        item.deadline,
        item.priority
      ),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const addOngoing = (id, title, description, deadline, priority) => {
    const moveTask = tasks.filter((task) => id === task._id);
    setOngoing((ongoing) => [
      ...ongoing,
      { ...moveTask, id, title, description, deadline, priority },
    ]);
  };

  const addCompleted = (id, title, description, deadline, priority) => {
    const moveTask = tasks.filter((task) => id === task._id);
    setCompleted((completed) => [
      ...completed,
      { ...moveTask, id, title, description, deadline, priority },
    ]);
  };

  return (
    <>
      <Profile />
      <div className="w-[100%] lg:w-[60%] mx-auto">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="rounded-xl bg-base-300 p-8 space-y-4"
        >
          {/* Task Title */}
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Task Title
            </label>
            <input
              required
              type="text"
              id="title"
              name="title"
              placeholder="Task Title"
              {...register("title", { required: true })}
              className="w-full px-4 py-3 rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 focus:dark:border-violet-400"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              required
              id="description"
              name="description"
              placeholder="Description"
              rows="2"
              className="w-full px-4 py-3 rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 focus:dark:border-violet-400"
              {...register("description", { required: true })}
            />
          </div>

          <div className="mb-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Priority (one column) */}
            <div>
              <label
                htmlFor="priority"
                className="block text-sm font-medium text-gray-700"
              >
                Priority
              </label>
              <select
                required
                id="priority"
                name="priority"
                className="w-full px-4 py-3 rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 focus:dark:border-violet-400"
                {...register("priority", { required: true })}
              >
                <option value="" disabled>
                  Select Priority
                </option>
                <option value="low">Low</option>
                <option value="moderate">Moderate</option>
                <option value="high">High</option>
              </select>
            </div>

            {/* Deadline (one column) */}
            <div>
              <label
                htmlFor="deadline"
                className="block text-sm font-medium text-gray-700"
              >
                Deadline
              </label>
              <input
                required
                type="date"
                id="deadline"
                name="deadline"
                className="w-full px-3 py-3 rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 focus:dark:border-violet-400"
                {...register("deadline", { required: true })}
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary">
            Add Task
          </button>
        </form>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 my-6 gap-6">
        <div>
          <h1 className="text-2xl font-bold bg-base-300 p-2 text-center">
            Todo
          </h1>
          {tasks?.map((task, i) => (
            <TaskFormCard
              key={task._id}
              tasks={tasks}
              setTasks={setTasks}
              index={task._id}
              task={task}
            />
          ))}
        </div>

        <div ref={dropOngoing}>
          <h1 className="text-2xl font-bold bg-base-300 p-2 text-center">
            Ongoing
          </h1>
          <div>
            {ongoing?.map((task) => (
              <Ongoing
                tasks={ongoing}
                setTasks={setOngoing}
                key={task._id}
                index={task._id}
                task={task}
              />
            ))}
          </div>
        </div>

        <div>
          <h1 className="text-2xl font-bold bg-base-300 p-2 text-center">
            Completed
          </h1>
          <div>
            {completed?.map((task) => (
              <Complete key={task._id} index={task._id} task={task} />
            ))}
          </div>
        </div>
      </div>

      <Toaster />
    </>
  );
};

export default TaskForm;
