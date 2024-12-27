import NearMeIcon from "@mui/icons-material/NearMe";
import axios from "axios";
import { useRef } from "react";
import { toast } from "react-toastify";

const Register = ({ isOpenRegister, setIsOpenLogin, setIsOpenRegister }) => {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newUser = {
      username: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    try {
      await axios.post("http://localhost:3010/api/users/register", newUser);
      setIsOpenRegister(false);
      toast.success("Kayıt işlemi başarılı giriş yapabilirsiniz");
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  const handleLogin = () => {
    setIsOpenRegister(false);
    setIsOpenLogin(true);
  };

  return (
    <div className="relative z-10">
      {/* Modal */}
      {isOpenRegister && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg w-1/3">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-4">
              <NearMeIcon className="text-purple-500" />
              <p className="font-bold text-xl text-purple-500">Register</p>
              <button
                onClick={() => setIsOpenRegister(false)}
                className="h-6 flex items-center justify-center text-white hover:bg-purple-400 bg-purple-500 rounded-md p-2"
              >
                ×
              </button>
            </div>
            {/* Modal Body */}
            <form
              onSubmit={handleSubmit}
              className="p-6 flex flex-col items-center gap-8 "
            >
              <input
                className="inputt"
                type="text"
                placeholder="username"
                ref={nameRef}
              />
              <input
                className="inputt"
                type="email"
                placeholder="email"
                ref={emailRef}
              />
              <input
                className="inputt"
                type="password"
                placeholder="password"
                ref={passwordRef}
              />
              <p className="text-sm">
                Do you have account?{" "}
                <button
                  onClick={handleLogin}
                  type="button"
                  className="text-blue-500"
                >
                  Log in
                </button>
              </p>
              <button className="w-full font-semibold p-2 bg-green-500 text-white rounded-lg hover:bg-green-400">
                Register
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Register;
