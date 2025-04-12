import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import { Signup } from "./components/Signup";
import { Signin } from "./components/Signin";

import { Home } from "./pages/home.jsx";
import { useSetRecoilState } from "recoil";
import { getUserInfo } from "./service/restApi.js";
import { userAtomState } from "./store/user/userAtom.js";
import { useEffect } from "react";
import "./App.css";
import { axiosInterceptor } from "./service/apiInterceptor.js";

function App() {
  useEffect(() => {
    axiosInterceptor(); // Setup once when app starts
  }, []);
  return (
    <div className="bg-background min-h-screen text-lightText">
      <Router>
        <AppContent />
      </Router>
    </div>
  );
}

// const AppContent = () => {
//   const setCurrentUser = useSetRecoilState(userAtomState);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const storedCurrentUserInfo = localStorage.getItem("userInfo");

//         if (storedCurrentUserInfo) {
//           setCurrentUser(JSON.parse(storedCurrentUserInfo));
//         } else {
//           const res = await getUserInfo();
//           setCurrentUser(res.data.data);
//           localStorage.setItem("userInfo", JSON.stringify(res.data.data));
//         }
//       } catch (error) {
//         console.log("Error fetching user data", error);

//         // Redirect only if the user is on a protected route (not on signup/signin)
//         if (!["/sign_in", "/sign_up"].includes(window.location.pathname)) {
//           navigate("/sign_in");
//         }
//       }
//     };

//     fetchData();
//   }, [navigate, setCurrentUser]);

//   return (
//     <Routes>
//       <Route path="/sign_in" element={<Signin />} />
//       <Route path="/sign_up" element={<Signup />} />
//       <Route path="/" element={<Home />} />
//     </Routes>
//   );
// };

const AppContent = () => {
  const setCurrentUser = useSetRecoilState(userAtomState);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedCurrentUserInfo = localStorage.getItem("userInfo");

        if (storedCurrentUserInfo) {
          setCurrentUser(JSON.parse(storedCurrentUserInfo));
        } else {
          const res = await getUserInfo();
          setCurrentUser(res.data.data);
          localStorage.setItem("userInfo", JSON.stringify(res.data.data));
        }
      } catch (error) {
        console.log("Error fetching user data", error);

        // Only redirect if not on sign_in or sign_up pages
        const currentPath = window.location.pathname;
        if (!["/sign_in", "/sign_up"].includes(currentPath)) {
          navigate("/sign_in");
        }
      }
    };

    fetchData();
  }, [navigate, setCurrentUser]);

  return (
    <Routes>
      <Route path="/sign_in" element={<Signin />} />
      <Route path="/sign_up" element={<Signup />} />
      <Route path="/" element={<Home />} />
    </Routes>
  );
};

export default App;
