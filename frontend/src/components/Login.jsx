import NearMeIcon from "@mui/icons-material/NearMe";
import axios from "axios";
import { useRef } from "react";
import { toast } from "react-toastify";
const Login = ({
  isOpenLogin,
  setIsOpenLogin,
  myStorage,
  setCurrentUser,
  setIsOpenRegister,
}) => {
  const nameRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = {
      username: nameRef.current.value,
      password: passwordRef.current.value,
    };

    try {
      const res = await axios.post(
        "http://localhost:3010/api/users/login",
        user
      );
      myStorage.setItem("user", res.data.username);
      toast.success("Giriş işlemi başarılı");
      setCurrentUser(res.data.username);
      setIsOpenLogin(false);
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  const handleRegister = () => {
    setIsOpenLogin(false);
    setIsOpenRegister(true);
  };

  return (
    <div className="relative z-10">
      {/* Modal */}
      {isOpenLogin && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg w-1/3">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-4">
              <NearMeIcon className="text-purple-500" />
              <p className="font-bold text-xl text-purple-500">Login</p>

              <button
                onClick={() => setIsOpenLogin(false)}
                className="h-6 flex items-center justify-center text-white hover:bg-purple-400 bg-purple-500 rounded-md p-2"
              >
                ×
              </button>
            </div>
            {/* Modal Body */}
            <form
              onSubmit={handleSubmit}
              className="p-4 flex flex-col items-center gap-8 "
            >
              <input
                className="inputt"
                type="text"
                placeholder="username"
                ref={nameRef}
              />
              <input
                className="inputt"
                type="password"
                placeholder="password"
                ref={passwordRef}
              />
              <p className="text-sm">
                Don't you have account?{" "}
                <button
                  type="button"
                  onClick={handleRegister}
                  className="text-blue-500"
                >
                  Register
                </button>
              </p>
              <button className="w-full font-bold p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-400">
                Login
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
