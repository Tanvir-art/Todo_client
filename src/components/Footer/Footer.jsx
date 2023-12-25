import { Link } from "react-router-dom";
import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <div>
      <footer className="footer footer-center p-10 bg-base-200 text-base-content rounded">
        
        <nav>
          <div className="grid grid-flow-col gap-4">
            <Link to="https://github.com/Rajib-10" target="_blank">
            <FaGithub size={26}  />
            </Link>
            <Link to="https://www.linkedin.com/in/md-atiqul-islam-rajib-013a92298/" target="_blank">
            <FaLinkedin size={26}  />
            </Link>
            <Link to="https://www.facebook.com/atikul.rajib" target="_blank">
            <FaFacebook size={26} />
            </Link>
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
