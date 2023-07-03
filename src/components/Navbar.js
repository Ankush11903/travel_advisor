import React, { useState, useEffect, useRef } from "react";
import { Autocomplete } from "@react-google-maps/api";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function Navbar({ onLoad, onPlaceChanged, setType, rating, setRating, arrivalDate, setArrivalDate }) {
  const [value, setValue] = useState("");
  const [selectedOption, setSelectedOption] = useState("restaurants");
  const [showOptions, setShowOptions] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showDates, setShowDates] = useState(false);
  

  const modalRef = useRef(null);


  useEffect (() => {
    if (arrivalDate){
      setShowDates(false);
    }
  },[arrivalDate])

  const toggleOption = (option) => {
    if("hotels" === option){
      toast.error("Please enter  arrival  date.", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000, // Close the toast after 3 seconds
        hideProgressBar: true, // Hide the progress bar
        pauseOnHover: false, // Do not pause the toast on hover
        draggable: false, // Do not allow dragging the toast
        closeOnClick: true, // Close the toast when clicked
        closeButton: false, // Do not show the close button
      });
    }
    setSelectedOption(option);
    setType(option);
    setShowOptions(false); // Hide the options after selection
  };

  const handleFilterClick = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleClickOutsideModal = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setShowModal(false);
    }
  };

  const handleDateClick = () => {
    setShowDates(true);
  };

  

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutsideModal);
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideModal);
     
    };
  }, []);

 

  return (
    <div className="flex justify-around items-center pt-2 h-[10vh]">
      {selectedOption === "hotels" && (
        <div>
          <button
            className="flex items-center h-10 px-4 bg-white border border-gray-300 shadow-sm rounded-full text-sm font-sans font-normal mr-4"
            onClick={handleDateClick}
          >
            {arrivalDate ? (
              <>
                <span>{arrivalDate}</span>
              </>
            ) : (
              // <div>
 <button className="flex items-center h-10 px-4  shadow-sm rounded-full text-sm font-sans font-normal ">
          <svg
            className="w-4 h-4 mr-2"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
          Enter Dates
        </button>
        // </div>
            )}
          </button>
          {showDates && (
            <div className="absolute z-50  bg-green-50 rounded-lg w-[15rem] py-5 px-6 mt-2">
              <input
                type="date"
                value={arrivalDate}
                onChange={(e) => {setArrivalDate(e.target.value)
                }}
                className="mb-2"
              />
              
              
            </div>
          )}
        </div>
      )}

<div className="flex">
        <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3"></div>
            <input
              className="h-10 border border-gray-300 shadow-sm w-[35rem] rounded-full focus:outline outline-blue-600 pl-10 z-50 placeholder-[#898989] text-sm font-sans font-normal"
              type="text"
              placeholder="Where to?"
              value={value}
              onChange={(e) => setValue(e.target.value)}

              
              
              style={{ paddingLeft: "2rem" }}
            />
          </div>
        </Autocomplete>
        <svg
          className="h-5 absolute z-50 ml-1.5 mt-[0.6rem]"
          viewBox="0 0 24 24"
          preserveAspectRatio="xMidYMid meet"
          focusable="false"
        >
          <g>
            <path d="M20.87,20.17l-5.59-5.59C16.35,13.35,17,11.75,17,10c0-3.87-3.13-7-7-7s-7,3.13-7,7s3.13,7,7,7c1.75,0,3.35-0.65,4.58-1.71 l5.59,5.59L20.87,20.17z M10,16c-3.31,0-6-2.69-6-6s2.69-6,6-6s6,2.69,6,6S13.31,16,10,16z"></path>
          </g>
        </svg>
      </div>

      <div className="flex">
        <button
          className="flex items-center h-10 px-4 bg-white border border-gray-300 shadow-sm rounded-full text-sm font-sans font-normal mr-4"
          onClick={handleFilterClick}
        >
          Filters
        </button>
        <button
          className="flex items-center h-10 px-4 bg-white border border-gray-300 shadow-sm rounded-full text-sm font-sans font-normal ml-2"
          onClick={() => setShowOptions(!showOptions)}
        >
          {selectedOption}
          <svg
            className="w-4 h-4 ml-2"
            viewBox="0 0 24 24"
            preserveAspectRatio="xMidYMid meet"
            focusable="false"
          >
            <g>
              <path d="M7 10l5 5 5-5z"></path>
            </g>
          </svg>
        </button>
        {showOptions && (
          <div className="absolute z-50 bg-white w-[10rem] mt-10 rounded-b-lg shadow-2xl">
            <button
              className="w-full py-2 px-4 hover:bg-gray-200"
              onClick={() => toggleOption("attractions")}
            >
              Attractions
            </button>
            <button
              className="w-full py-2 px-4 hover:bg-gray-200"
              onClick={() => toggleOption("hotels")}
            >
              Hotels
            </button>
            <button
              className="w-full py-2 px-4 hover:bg-gray-200"
              onClick={() => toggleOption("restaurants")}
            >
              Restaurants
            </button>
            
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
          <div className="absolute w-full h-full bg-gray-900 opacity-50"></div>
          <div className="relative bg-white rounded-lg w-[30rem] py-4 px-6" ref={modalRef}>
            <button
              className="absolute top-4 right-4 mt-4 text-gray-500 hover:text-gray-800"
              onClick={handleModalClose}
            >
              Close
            </button>
            <div className="p-4">
              <label className="font-blod text-xl mr-10">Rating</label>
              <select value={rating} onChange={(e) => {setRating(e.target.value),setShowModal(false)}}>
                <option value={0}>All</option>
                <option value={3}>Above 3.0</option>
                <option value={4}>Above 4.0</option>
                <option value={4.5}>Above 4.5</option>
              </select>
            </div>
            
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
