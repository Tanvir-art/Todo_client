import { Link } from "react-router-dom";
import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <div>
      <footer className="footer footer-center p-10 bg-base-200 text-base-content rounded">
        
        <nav>
          <div className="grid grid-flow-col gap-4">

            <FaGithub size={26}  />
            
           
            <FaLinkedin size={26}  />
          
            <FaFacebook size={26} />
          
          </div>
        </nav>
        <aside>
          <p>Copyright © 2023 - All right reserved by Rajib.</p>
        </aside>
      </footer>
    </div>
  );
};

export default Footer;
