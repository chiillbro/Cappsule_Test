import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { setData } from "../redux/dataSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BASE_URL, { logo } from "../constants";

const SearchBar = () => {
  const [input, setInput] = useState("");

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (input === "") {
      alert("Please enter a search term");
      return;
    }

    try {
      const response = await axios.get(
        `${BASE_URL}/new_search?q=${input}&pharmacyIds=1,2,3`
      );

      dispatch(setData(response.data));
      navigate("/results");
    } catch (error) {
      console.log("Error fetching data: ", error);
      alert("An error occurred while fetching data. Please try again later.");
    }
  };

  return (
    <section className="flex flex-col items-center justify-center  h-auto w-screen sm:gap-[10vh] gap-[7vh] lg:gap-[20vh]">
      <div className="flex flex-col items-center gap-[8vh]  text-center mt-[20vh] ">
        <div className="flex items-center ">
          <img src={logo} alt="logo" className="w-10" />
          <h1 className="lg:text-2xl sm:text-xl">
            Capsule Web Development Test
          </h1>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex xl:w-[1002px] lg:w-[800px] sm:w-[400px] md:w-[600px]     h-[60px] items-center justify-between gap-6  px-8 shadow   rounded-full "
        >
          <div className="flex items-center gap-4">
            <FiSearch className="text-xl" />

            <input
              type="text"
              name="search"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="outline-none xl:w-[800px] lg:w-[600px]"
              placeholder="Type your medicine here..."
            />
          </div>
          <button className="text-[#2A527A] font-semibold">Search</button>
        </form>
        <hr className="xl:w-[1017px] lg:w-[810px] md:w-[610px] sm:w-[410px] w-[350px] -mt-6 h-[1.5px] bg-gray-300 " />
      </div>
      <div
        className="font-semibold text-[#888888]"
        dangerouslySetInnerHTML={{
          __html: `" Find Medicines With Amazing Content "`,
        }}
      ></div>
    </section>
  );
};

export default SearchBar;
