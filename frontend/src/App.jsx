import Map, { Marker } from "react-map-gl";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";
import Header from "./components/Header";
import Register from "./components/Register";
import Login from "./components/Login";
import Popupp from "./components/Popup";
import NewPlace from "./components/NewPlace";
import { toast } from "react-toastify";

const App = () => {
  const myStorage = window.localStorage;
  const [isOpenLogin, setIsOpenLogin] = useState(false);
  const [isOpenRegister, setIsOpenRegister] = useState(false);
  const [currentUser, setCurrentUser] = useState(myStorage.getItem("user"));
  const [pins, setPins] = useState([]);
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  const [newPlace, setNewPlace] = useState(null);
  const [title, setTitle] = useState(null);
  const [desc, setDesc] = useState(null);
  const [rating, setRating] = useState(0);

  useEffect(() => {
    const getPins = async () => {
      try {
        const res = await axios.get("http://localhost:3010/api/pins");
        setPins(res.data.pins);
      } catch (error) {
        console.log(error);
      }
    };
    getPins();
  }, []);

  const handleMarkerClick = (id) => {
    setCurrentPlaceId(id);
  };

  const handleAddClick = (e) => {
    const { lng, lat } = e.lngLat;
    const addingPlace = { lng, lat };
    setNewPlace(addingPlace);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPin = {
      username: currentUser,
      title,
      desc,
      rating,
      lat: newPlace.lat,
      long: newPlace.lng,
    };

    if (currentUser) {
      try {
        const res = await axios.post("http://localhost:3010/api/pins", newPin);
        console.log(res);
        setPins([...pins, res.data]);
        setNewPlace(null);
      } catch (error) {
        console.log(error);
      }
    } else {
      toast.error("Lütfen Giriş Yapınız.");
      setIsOpenLogin(true);
    }
  };

  return (
    <div className="-z-10">
      <Login
        isOpenLogin={isOpenLogin}
        setIsOpenLogin={setIsOpenLogin}
        myStorage={myStorage}
        setCurrentUser={setCurrentUser}
        setIsOpenRegister={setIsOpenRegister}
      />
      <Register
        isOpenRegister={isOpenRegister}
        setIsOpenRegister={setIsOpenRegister}
        setIsOpenLogin={setIsOpenLogin}
      />
      <Header
        setCurrentUser={setCurrentUser}
        myStorage={myStorage}
        setIsOpenLogin={setIsOpenLogin}
        setIsOpenRegister={setIsOpenRegister}
        currentUser={currentUser}
      />
      <div className="w-[100vw] h-[93.464vh] -z-20">
        <Map
          mapboxAccessToken={import.meta.env.VITE_MAPBOX_API_KEY}
          initialViewState={{
            longitude: 25,
            latitude: 45,
            zoom: 3,
          }}
          onDblClick={handleAddClick}
          mapStyle="mapbox://styles/mapbox/streets-v9"
        >
          {pins &&
            pins.map((p, i) => (
              <div key={i}>
                <Marker
                  longitude={p?.long || 0}
                  latitude={p?.lat || 0}
                  anchor="bottom"
                >
                  <FaMapMarkerAlt
                    style={{
                      color: p?.username === currentUser ? "tomato" : "purple",
                    }}
                    size={30}
                    onClick={() => handleMarkerClick(p._id)}
                  />
                </Marker>
                {p?._id === currentPlaceId ? (
                  <Popupp p={p} setCurrentPlaceId={setCurrentPlaceId} />
                ) : null}
              </div>
            ))}
          {newPlace && (
            <NewPlace
              currentUser={currentUser}
              setNewPlace={setNewPlace}
              setTitle={setTitle}
              setDesc={setDesc}
              setRating={setRating}
              newPlace={newPlace}
              handleSubmit={handleSubmit}
            />
          )}
        </Map>
      </div>
    </div>
  );
};

export default App;
