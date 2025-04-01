// // import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// // import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

// // import "./reserve.css";
// // import useFetch from "../../hooks/useFetch";
// // import { useContext, useState } from "react";
// // import { SearchContext } from "../../context/SearchContext";
// // import axios from "axios";
// // import { useNavigate } from "react-router-dom";
// // import { nextDay } from "date-fns";

// // const Reserve = ({ setOpen, hotelId }) => {
// //   const [selectedRooms, setSelectedRooms] = useState([]);
// //   const { data, loading, error } = useFetch(`/hotels/room/${hotelId}`);
// //   const { dates } = useContext(SearchContext);

// //   const getDatesInRange = (startDate, endDate) => {
// //     const start = new Date(startDate);
// //     const end = new Date(endDate);

// //     const date = new Date(start.getTime());

// //     const dates = [];

// //     while (date <= end) {
// //       dates.push(new Date(date).getTime());
// //       date.setDate(date.getDate() + 1);
// //     }

// //     return dates;
// //   };

// //   console.log(data)

// //   const alldates = getDatesInRange(dates[0].startDate, dates[0].endDate);

// //   const isAvailable = (roomNumber) => {
// //     const isFound = roomNumber.unavailableDates.some((date) =>
// //       alldates.includes(new Date(date).getTime())
// //     );

// //     return !isFound;
// //   };

// //   const handleSelect = (e) => {
// //     const checked = e.target.checked;
// //     const value = e.target.value;
// //     setSelectedRooms((prev) => {
// //       const updatedRooms = checked
// //         ? [...prev, value]
// //         : prev.filter((item) => item !== value);
  
// //       console.log("Updated Selected Rooms:", updatedRooms); // Debugging
// //       return updatedRooms;
// //     });
// //   };

// //   const navigate = useNavigate();

// //   const handleClick = async () => {
// //     try {
// //       await Promise.all(
// //         selectedRooms.map(async (roomId) => {
// //           const res = await axios.put(`/rooms/availability/${roomId}`, {
// //             dates: alldates,
// //           });
// //           return res.data;
// //         })
// //       );
// //       setOpen(false);
// //       navigate("/");
// //     } catch (err) {
// //       console.log(err)
// //     }
// //   };
// //   return (
// //     <div className="reserve">
// //       <div className="rContainer">
// //         <FontAwesomeIcon
// //           icon={faCircleXmark}
// //           className="rClose"
// //           onClick={() => setOpen(false)}
// //         />
// //         <span>Select your rooms:</span>
// //         {data.map((item) => (
// //           <div className="rItem" key={item._id}>
// //             <div className="rItemInfo">
// //               <div className="rTitle">{item.title}</div>
// //               <div className="rDesc">{item.desc}</div>
// //               <div className="rMax">
// //                 Max people: <b>{item.maxPeople}</b>
// //               </div>
// //               <div className="rPrice">{item.price}</div>
// //             </div>
// //             <div className="rSelectRooms">
// //               {item.roomNumbers.map((roomNumber) => (
// //                 <div className="room">
// //                   <label>{roomNumber.number}</label>
// //                   <input
// //                     type="checkbox"
// //                     value={roomNumber._id}
// //                     onChange={handleSelect}
// //                     disabled={!isAvailable(roomNumber)}
// //                   />
// //                 </div>
// //               ))}
// //             </div>
// //           </div>
// //         ))}
// //         <button onClick={handleClick} className="rButton">
// //           Reserve Now!
// //         </button>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Reserve;

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
// import "./reserve.css";
// import useFetch from "../../hooks/useFetch";
// import { useContext, useState } from "react";
// import { SearchContext } from "../../context/SearchContext";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const Reserve = ({ setOpen, hotelId }) => {
//   const [selectedRooms, setSelectedRooms] = useState([]);
//   const { data, loading, error } = useFetch(`/hotels/room/${hotelId}`);
//   const { dates } = useContext(SearchContext);

//   // Debugging: Log fetched data
//   console.log("Fetched Data:", data);

//   // Function to get all dates in a range
//   const getDatesInRange = (startDate, endDate) => {
//     const start = new Date(startDate);
//     const end = new Date(endDate);
//     const date = new Date(start.getTime());
//     const dates = [];

//     while (date <= end) {
//       dates.push(new Date(date).getTime());
//       date.setDate(date.getDate() + 1);
//     }

//     return dates;
//   };

//   // Get all dates in the selected range
//   const alldates = getDatesInRange(dates[0].startDate, dates[0].endDate);

//   // Check if a room is available for the selected dates
//   const isAvailable = (roomNumber) => {
//     const isFound = roomNumber.unavailableDates.some((date) =>
//       alldates.includes(new Date(date).getTime())
//     );
//     return !isFound;
//   };

//   // Handle room selection
//   const handleSelect = (e) => {
//     const checked = e.target.checked;
//     const value = e.target.value;
//     setSelectedRooms((prev) => {
//       const updatedRooms = checked
//         ? [...prev, value]
//         : prev.filter((item) => item !== value);
//       console.log("Updated Selected Rooms:", updatedRooms); // Debugging
//       return updatedRooms;
//     });
//   };

//   const navigate = useNavigate();

//   // Handle reservation submission
//   const handleClick = async () => {
//     try {
//       if (selectedRooms.length === 0) {
//         alert("Please select at least one room.");
//         return;
//       }

//       await Promise.all(
//         selectedRooms.map(async (roomId) => {
//           const res = await axios.put(`/rooms/availability/${roomId}`, {
//             dates: alldates,
//           });
//           return res.data;
//         })
//       );
//       setOpen(false);
//       navigate("/");
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   return (
//     <div className="reserve">
//       <div className="rContainer">
//         {/* Close button */}
//         <FontAwesomeIcon
//           icon={faCircleXmark}
//           className="rClose"
//           onClick={() => setOpen(false)}
//         />
//         <span>Select your rooms:</span>

//         {/* Display loading or error messages */}
//         {loading ? (
//           <div>Loading rooms...</div>
//         ) : error ? (
//           <div>Error: {error.message}</div>
//         ) : (
//           // Map through the fetched room data
//           data.map((item) => (
//             <div className="rItem" key={item._id}>
//               <div className="rItemInfo">
//                 <div className="rTitle">{item.title}</div>
//                 <div className="rDesc">{item.desc}</div>
//                 <div className="rMax">
//                   Max people: <b>{item.maxPeople}</b>
//                 </div>
//                 <div className="rPrice">{item.price}</div>
//               </div>
//               <div className="rSelectRooms">
//                 {/* Map through room numbers */}
//                 {item.roomNumbers.map((roomNumber) => (
//                   <div className="room" key={roomNumber._id}>
//                     <label>{roomNumber.number}</label>
//                     <input
//                       type="checkbox"
//                       value={roomNumber._id}
//                       onChange={handleSelect}
//                       disabled={!isAvailable(roomNumber)}
//                     />
//                   </div>
//                 ))}
//               </div>
//             </div>
//           ))
//         )}

//         {/* Reserve button */}
//         <button onClick={handleClick} className="rButton">
//           Reserve Now!
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Reserve;

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import "./reserve.css";
import useFetch from "../../hooks/useFetch";
import { useContext, useState } from "react";
import { SearchContext } from "../../context/SearchContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Reserve = ({ setOpen, hotelId }) => {
  const [selectedRooms, setSelectedRooms] = useState([]);
  const { data, loading, error } = useFetch(`/hotels/room/${hotelId}`);
  const { dates } = useContext(SearchContext);

  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const date = new Date(start.getTime());
    const dates = [];

    while (date <= end) {
      dates.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }

    return dates;
  };

  const alldates = getDatesInRange(dates[0].startDate, dates[0].endDate);

  const isAvailable = (roomNumber) => {
    const isFound = roomNumber.unavailableDates.some((date) =>
      alldates.includes(new Date(date).getTime())
    );
    return !isFound;
  };

  const handleSelect = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;
    setSelectedRooms((prev) => {
      const updatedRooms = checked
        ? [...prev, value]
        : prev.filter((item) => item !== value);
      return updatedRooms;
    });
  };

  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      if (selectedRooms.length === 0) {
        alert("Please select at least one room.");
        return;
      }

      await Promise.all(
        selectedRooms.map(async (roomId) => {
          const res = await axios.put(`/rooms/availability/${roomId}`, {
            dates: alldates,
          });
          return res.data;
        })
      );
      setOpen(false);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="reserve">
      <div className="rContainer">
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="rClose"
          onClick={() => setOpen(false)}
        />
        <span>Select your rooms:</span>
        {loading ? (
          <div>Loading rooms...</div>
        ) : error ? (
          <div>Error: {error.message}</div>
        ) : (
          data.map((item) => (
            <div className="rItem" key={item._id}>
              <div className="rItemInfo">
                <div className="rTitle">{item.title}</div>
                <div className="rDesc">{item.desc}</div>
                <div className="rMax">
                  Max people: <b>{item.maxPeople}</b>
                </div>
                <div className="rPrice">{item.price}</div>
              </div>
              <div className="rSelectRooms">
                {item.roomNumbers.map((roomNumber) => (
                  <div className="room" key={roomNumber._id}>
                    <label>{roomNumber.number}</label>
                    <input
                      type="checkbox"
                      value={roomNumber._id}
                      onChange={handleSelect}
                      disabled={!isAvailable(roomNumber)}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
        <button onClick={handleClick} className="rButton">
          Reserve Now!
        </button>
      </div>
    </div>
  );
};

export default Reserve;