import Topbar from '../Topbar';
import Navbar from '../Navbar';
import Footer from '../Footer';
import SocialSidebar from '../SocialSidebar';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Topbar />
      <Navbar />
      <SocialSidebar />

      <main className="flex-1">
        {children}
      </main>

      <Footer />
    </div>
  );
};

export default Layout;
