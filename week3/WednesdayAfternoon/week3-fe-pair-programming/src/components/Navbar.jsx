import { pageLinks } from '../data'
import PageLinks from './PageLinks'
import SocialLinks from './SocialLinks'

const Navbar = () => {
  return (
    <div>
      <nav className="navbar">
        <div className="nav-center">
          <div className="nav-header">
            <img src="images/logo.svg" className="nav-logo" alt="backroads" />
            <button type="button" className="nav-toggle" id="nav-toggle">
              <i className="fas fa-bars" />
            </button>
          </div>
          <PageLinks parentClass="nav-links" itemClass="nav-link" />
          <SocialLinks parentClass="nav-icons" itemClass="nav-icon" />
        </div>
      </nav>
    </div>

  );
};

export default Navbar;
