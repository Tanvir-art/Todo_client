/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import axios from "axios";
import { useDrag } from "react-dnd";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { MdOutlineLowPriority, MdDateRange } from "react-icons/md";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";

const TaskFormCard = ({ task, index, tasks, setTasks }) => {
  const { user } = useContext(AuthContext);
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "todo",
    item: {
      id: index,
      title: task.title,
      description: task.description,
      deadline: task.deadline,
      priority: task.priority,
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(
            `http://localhost:5000/tasks/${id}`
          )
          .then((res) => {
            if (res.data.deletedCount > 0) {
              const filteredTask = tasks.filter((task) => task._id !== id);
              setTasks(filteredTask);
              Swal.fire({
                title: "Deleted!",
                text: "Your task has been deleted.",
                icon: "success",
              });
            }
          });
      }
    });
  };

  const handleOngoing = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "To Ongoing this Task",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Ongoing It!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .patch(
            `http://localhost:5000/tasks/ongoing/${id}`
          )
          .then((res) => {
            if (res.data.modifiedCount > 0) {
              axios
                .get(
                  "http://localhost:5000/tasks"
                )
                .then((res) => {
                  const filteredTask = res.data.filter(
                    (task) => task.email === user?.email
                  );
                  setTasks(filteredTask);
                });

              Swal.fire({
                position: "top-end",
                icon: "success",
                title: `Update task status successfully.`,
                showConfirmButton: false,
                timer: 1000,
              });
            }
            console.log(res.data);
          });
      }
    });
  };

  const handleComplete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "To complete this Task",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Complete It!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .patch(
            `http://localhost:5000/tasks/complete/${id}`
          )
          .then((res) => {
            if (res.data.modifiedCount > 0) {
              axios
                .get(
                  "http://localhost:5000/tasks"
                )
                .then((res) => {
                  const filteredTask = res.data.filter(
                    (task) => task.email === user?.email
                  );
                  setTasks(filteredTask);
                });

              Swal.fire({
                position: "top-end",
                icon: "success",
                title: `Update task status successfully.`,
                showConfirmButton: false,
                timer: 1000,
              });
            }
            console.log(res.data);
          });
      }
    });
  };

  return (
    <div className="my-4">
      <div ref={drag}>
        <div className="card  bg-base-300 ">
          <div className="card-body ">
            <h2 className="card-title mr-6">
              {task?.title}
              <span className="bg-blue-500 p-2 rounded-xl text-white">
                {task?.status}
              </span>
            </h2>

            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <MdDateRange size={24} />
                <p>{task?.deadline}</p>
              </div>
              <div className="flex items-center gap-2">
                <MdOutlineLowPriority size={24} />
                <p>{task?.priority}</p>
              </div>
            </div>

            <p>{task?.description}</p>
            <div className="flex justify-between items-center">
              <div className="card-actions items-center">
                <Link to={`/update/${task?._id}`}>
                  <button>
                    <FaEdit size={26} />
                  </button>
                </Link>
                <button onClick={() => handleDelete(task?._id)}>
                  <FaTrashAlt size={26} />
                </button>
              </div>
              <div className="space-x-3">
                <button
                  onClick={() => handleOngoing(task?._id)}
                  title="Ongoing"
                >
                  <FaArrowAltCircleRight size={26} />
                </button>
                <button
                  onClick={() => handleComplete(task?._id)}
                  title="Completed"
                >
                  <FaArrowAltCircleRight size={26} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskFormCard;
