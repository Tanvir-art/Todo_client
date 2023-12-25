import { Link } from "react-router-dom";

const Banner = () => {
  return (
<div className="hero min-h-screen bg-base-200">
  <div className="hero-content text-center">
    <div className="max-w-md">
      <h1 className="text-5xl font-bold">Welcome To Our To Do List</h1>
      <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
      <Link to='/dashboard'>
      
      <button className="btn btn-primary">Get Started</button>
      </Link>
    </div>
  </div>
</div>
  );
};

export default Banner;
