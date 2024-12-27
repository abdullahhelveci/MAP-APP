import { Popup } from "react-map-gl";
import { IoMdClose } from "react-icons/io";
import StarIcon from "@mui/icons-material/Star";
import { format } from "timeago.js";

const Popupp = ({ p, setCurrentPlaceId }) => {
  return (
    <div className="bg-red-200 w-[800px] h-[500px]">
      <Popup
        longitude={p?.long}
        latitude={p?.lat}
        closeButton={false}
        closeOnClick={false}
        anchor="left"
      >
        <div className=" flex justify-end ">
          <IoMdClose
            onClick={() => setCurrentPlaceId(null)}
            size={14}
            className="hover:bg-purple-400 bg-purple-500 text-white rounded-full cursor-pointer"
          />
        </div>
        <div className="w-48 h-[300px] max-h-[300px] flex flex-col gap-[3px] justify-around rounded-lg">
          <label className="label">Place</label>
          <h4 className="font-bold text-base">{p?.title}</h4>
          <label className="label">Review</label>
          <p className="text-xs">{p?.desc}</p>
          <label className="label">Rating</label>
          <div>
            {p?.rating
              ? Array.from({ length: p?.rating }).map((_, index) => (
                  <StarIcon key={index} className="text-yellow-400" />
                ))
              : ""}
          </div>
          <label className="label">Information</label>
          <span className="text-xs">
            added by <b>{p?.username}</b>
          </span>
          <span className="text-gray-400">{format(p?.createdAt)}</span>
        </div>
      </Popup>
    </div>
  );
};

export default Popupp;
