import NearMeIcon from "@mui/icons-material/NearMe";

const Header = ({
  myStorage,
  currentUser,
  setCurrentUser,
  setIsOpenLogin,
  setIsOpenRegister,
}) => {
  const handleLogout = () => {
    setCurrentUser(null);
    myStorage.removeItem("user");
  };

  return (
    <div className="flex justify-between items-center p-2">
      <div className="border shadow p-1 rounded-md text-center flex items-center gap-1 justify-centertext-2xl font-bold hover:bg-gray-100 cursor-pointer">
        <NearMeIcon className="text-purple-500" />
        <span className="text-xl text-purple-500">Map App</span>
      </div>

      <div className="text-xl font-semibold text-gray-500 hover:underline">
        Register and Bookmark a Pin
      </div>

      <div className="flex gap-2">
        {currentUser ? (
          <div className="flex items-center justify-center gap-3">
            <p>
              Welcome <span className="font-bold">{currentUser}</span>
            </p>
            <button
              onClick={handleLogout}
              className="text-white bg-red-500 p-2 rounded-md hover:bg-red-400"
            >
              Log Out
            </button>
          </div>
        ) : (
          <>
            <button
              onClick={() => setIsOpenRegister(true)}
              className="text-white bg-green-500 p-2 rounded-md hover:bg-green-400"
            >
              Register
            </button>
            <button
              onClick={() => setIsOpenLogin(true)}
              className="text-white bg-blue-500 p-2 rounded-md hover:bg-blue-400"
            >
              Login
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
