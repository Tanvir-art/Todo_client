import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";

const UpdateTask = () => {
  const [task, setTask] = useState({});
  const { title, description, priority, deadline } = task || " ";
  const { register, handleSubmit, reset } = useForm();
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/tasks/${id}`)
      .then((res) => {
        setTask(res.data);
      });
  }, [id]);

  const onSubmit = (data) => {
    const taskData = {
      title: data.title,
      description: data.description,
      priority: data.priority,
      deadline: data.deadline,
      email: user?.email,
    };

    axios
      .put(
        `http://localhost:5000/tasks/${id}`,
        taskData
      )
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          toast.success("Task updated successfully..");
          reset();
        }
      });
  };
  return (
    <div>
      <div className="w-[60%] mx-auto">
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
              defaultValue={title}
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
              defaultValue={description}
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
                defaultValue={priority}
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
                defaultValue={deadline}
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
            Update Task
          </button>
        </form>
      </div>
      <Toaster />
    </div>
  );
};

export default UpdateTask;
