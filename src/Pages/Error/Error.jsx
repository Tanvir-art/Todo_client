import errorImg from "../../../src/assets/error.avif"
import { Link } from "react-router-dom";


const Error = () => {
  return (
    <div className="flex justify-center items-center h-[70vh] text-center md:my-10">
      <div>
       <img src={errorImg} alt="" />
        <Link to="/">
          <button
            type="button"
            className=" btn btn-primary "
          >
            Back Home
          </button>
        </Link>
      </div>
     
    </div>
  );
};

export default Error;