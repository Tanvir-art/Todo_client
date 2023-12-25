/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import axios from "axios";
import { useDrag } from "react-dnd";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { MdOutlineLowPriority,MdDateRange } from "react-icons/md";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";



const TaskFormCard = ({ task, index , tasks,setTasks}) => {
  const {user} = useContext(AuthContext)
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

 

  
 

  return (
    <div className="my-4">
      <div ref={drag}>
        <div className="card  bg-base-300 ">
          <div className="card-body ">
            
            <h2 className="card-title mr-6">{task?.title}<span className="bg-blue-500 p-2 rounded-xl text-white">{task?.status}</span></h2>

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
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskFormCard;
