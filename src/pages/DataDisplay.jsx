import { useSelector } from "react-redux";
import DataItem from "../components/DataItem";
import { IoReturnUpBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const DataDisplay = () => {
  // Destructuring the fetchedData from the Redux state
  const { fetchedData } = useSelector((state) => state.data);

  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/");
  };

  const data = [];

  if (fetchedData !== null) {
    fetchedData.data.saltSuggestions.forEach((item) => {
      data.push(item);
    });

    // sorting salts by salt frequency
    data.sort((a, b) => b.salt_frequency - a.salt_frequency);
  }
  return (
    <div className="flex flex-col relative ">
      <div className="absolute top-[5vh] md:left-[8vw] lg:left=[12vw] xl:left-[17vw] flex gap-2 items-center">
        <IoReturnUpBackOutline
          onClick={handleBack}
          className="text-[#204772] text-[2vw] cursor-pointer hover:-translate-y-1 transition-all"
        />
        <span>Back to Search</span>
      </div>

      <div className="lg:mx-auto md:mx-10 lg:w-full flex flex-col gap-4 my-[10vh]  h-auto">
        {data.map((item) => (
          <DataItem item={item} key={item.id} />
        ))}
      </div>
    </div>
  );
};

export default DataDisplay;
