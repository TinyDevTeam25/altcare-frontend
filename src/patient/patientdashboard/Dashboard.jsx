import "./dashboard.css";
import Nav2 from "../../components/PeterComponents/Nav2/Nav2";
import Top from "../../components/PeterComponents/Top/Top";
import Menu from "../../components/PeterComponents/Menu/Menu";
import Activity from "../../components/PeterComponents/Activity/Activity";
import Footer from "../../components/PeterComponents/Footer2/Footer2";
function dashboard() {
  return (
    <>
      <body>
        
        <main className="dashboard">
         <Top/>
         <Menu />
         <Activity/>
        </main>

        <Footer />
      </body>
    </>
  );
}
export default dashboard;