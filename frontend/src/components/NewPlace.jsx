import { IoMdClose } from "react-icons/io";
import { Popup } from "react-map-gl";

const NewPlace = ({
  setNewPlace,
  setTitle,
  setDesc,
  setRating,
  newPlace,
  handleSubmit,
}) => {
  return (
    <Popup
      longitude={newPlace.lng}
      latitude={newPlace.lat}
      closeButton={false}
      closeOnClick={false}
      anchor="left"
    >
      <div className=" flex justify-end items-center">
        <IoMdClose
          onClick={() => setNewPlace(null)}
          size={14}
          className="hover:bg-purple-400 text-white rounded-md cursor-pointer bg-purple-500 "
        />
      </div>
      <div className="w-54 h-54">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-around gap-2"
        >
          <label className="label">Title</label>
          <input
            onChange={(e) => setTitle(e.target.value)}
            className="outline-none bg-gray-50 rounded-md border-r-2 border-b-2 focus:shadow-md p-[2px]"
            placeholder="enter a title.."
          />
          <label className="label">Review</label>
          <textarea
            onChange={(e) => setDesc(e.target.value)}
            className="w-44 outline-none bg-gray-50 rounded-md border-r-2 border-b-2 focus:shadow-md p-[2px]"
            placeholder="say us someting about this place"
          />
          <label className="label">Rating</label>
          <select
            onChange={(e) => setRating(e.target.value)}
            className="w-10 outline-none bg-gray-50 rounded-md border-r-2 border-b-2 focus:shadow-md p-[2px]"
            name=""
            defaultValue="3"
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          <button
            type="submit"
            className="bg-purple-500 hover:bg-purple-400 p-1 rounded-md text-white font-bold"
          >
            Add Pin
          </button>
        </form>
      </div>
    </Popup>
  );
};

export default NewPlace;
