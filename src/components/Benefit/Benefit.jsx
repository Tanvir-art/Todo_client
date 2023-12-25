const Benefit = () => {
  return (
    <div className="my-8 space-y-6">
        <h2 className="text-xl md:text-3xl font-semibold mb-6 text-center">
          Who Can Benefit from Our Task Management Project?
        </h2>
      <div className="flex justify-between items-center gap-8 flex-col md:flex-row">
        <div className="card  bg-base-100 shadow-xl image-full h-[300px]">
          <figure>
            <img className="h-full object-cover w-full"
              src={"https://i.ibb.co/NFzpBMm/banker.webp"}
              alt="Bankers"
            />
          </figure>
        
          <div className="card-body absolute top-[25%] justify-center items-center">
            <h2 className="card-title">Bankers</h2>
            <p>Effectively manage financial tasks, track transactions, and prioritize important banking activities seamlessly.</p>
            
            
          </div>
          
        </div>

        <div className="card  bg-base-100 shadow-xl image-full h-[300px]">
          <figure>
            <img className="h-full object-cover w-full"
              src="https://i.ibb.co/mbJd0qs/student.jpg"
              alt="Students"
            />
          </figure>
          <div  className="card-body absolute top-[25%] justify-center items-center">
            <h2 className="card-title">Students</h2>
            <p>Organize study schedules, manage assignments, and keep track of academic deadlines for a successful academic journey.</p>
            
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center gap-8 flex-col md:flex-row">
        <div className="card  bg-base-100 shadow-xl image-full h-[300px] max-w-[530px] md:max-w-[350px] lg:max-w-[530px]">
          <figure>
            <img className="object-cover h-full w-full"
              src="https://i.ibb.co/x5V28R6/developer.jpg"
              alt="Developers"
            />
          </figure>
        
          <div className="card-body absolute top-[25%] justify-center items-center">
            <h2 className="card-title">Developers</h2>
            <p>Streamline your project tasks, collaborate with team members, and stay organized with our powerful task management tools.</p>
            
            
          </div>
          
        </div>

        <div className="card  bg-base-100 shadow-xl image-full h-[300px]">
          <figure>
            <img className="h-full object-cover w-full"
              src="https://i.ibb.co/ct0YmnT/corporate.jpg"
              alt="Corporate Professionals"
            />
          </figure>
          <div  className="card-body absolute top-[25%] justify-center items-center">
            <h2 className="card-title">Corporate Professionals</h2>
            <p>Enhance productivity, manage deadlines, and ensure efficient task execution within your corporate environment.</p>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Benefit;
