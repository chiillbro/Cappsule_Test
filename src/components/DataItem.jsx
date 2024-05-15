import { useEffect, useState } from "react";
import { tablet } from "../constants";
import MedicineSelection from "./F&S&P";

const DataItem = ({ item: { salt, available_forms, salt_forms_json } }) => {
  // separate states to toggle forms/strengths/packaging if length>4
  const [showAllForms, setShowAllForms] = useState(false);
  const [showAllStrengths, setShowAllStrengths] = useState(false);
  const [showAllPackings, setShowAllPackings] = useState(false);

  // states for selected form/strength/packaging
  const [selectedForm, setSelectedForm] = useState(available_forms[0]);
  const [selectedStrength, setSelectedStrength] = useState(
    selectedForm ? Object.keys(salt_forms_json[selectedForm])[0] : null
  );

  const [selectedPackaging, setSelectedPackaging] = useState(
    selectedStrength
      ? Object.keys(salt_forms_json[selectedForm][selectedStrength])[0]
      : null
  );

  // state for price
  const [price, setPrice] = useState("");

  // Selection functions for /forms/strengths/packaging

  const handleFormSelection = (form) => {
    setSelectedForm(form);
    const firstStrength = salt_forms_json[form]
      ? Object.keys(salt_forms_json[form])[0]
      : null;
    setSelectedStrength(firstStrength);
    const firstPackaging = firstStrength
      ? Object.keys(salt_forms_json[form][firstStrength])[0]
      : null;
    setSelectedPackaging(firstPackaging);

    getLowestPrice(form, firstStrength, firstPackaging);
  };

  const handleStrengthSelection = (strength) => {
    setSelectedStrength(strength);
    const firstPackaging = strength
      ? Object.keys(salt_forms_json[selectedForm][strength])[0]
      : null;
    setSelectedPackaging(firstPackaging);
    getLowestPrice(selectedForm, strength, firstPackaging);
  };

  // Get lowest price for selected form-strength-packaging

  const getLowestPrice = (form, strength, packaging) => {
    if (form && strength && packaging) {
      const lowestPriceArray = Object.values(
        salt_forms_json[form][strength][packaging]
      ).filter((item) => item !== null);

      const lowestPrice =
        lowestPriceArray.length > 0 &&
        lowestPriceArray
          .map((item) => item.map((obj) => Object.values(obj)))
          .flatMap((innerArray) => innerArray.map((subArray) => subArray[1]));

      const minPrice =
        lowestPriceArray.length > 0
          ? `From ₹${Math.min(...lowestPrice)}`
          : "No stores selling this product near you";

      setPrice(minPrice);
    }
  };

  // render getLowestPrice when component first mounts
  useEffect(() => {
    getLowestPrice(selectedForm, selectedStrength, selectedPackaging);
  }, []);

  // toggling functions for /forms/strengths/packaging
  const handleShowAllForms = () => {
    setShowAllForms(!showAllForms);
  };

  const handleShowALlStrengths = () => {
    setShowAllStrengths(!showAllStrengths);
  };

  const handleShowAllPackings = () => {
    setShowAllPackings(!showAllPackings);
  };

  return (
    <div className="lg:w-[1007px]  mx-auto px-8  py-6 rounded-3xl bg-gradient-to-r from-20% from-white to-[#E7F1F1] to-100% shadow-xl ">
      <div className="  flex justify-between items-center">
        {/* Display Medicine Selection and Information */}
        <MedicineSelection
          available_forms={available_forms}
          showAllForms={showAllForms}
          handleFormSelection={handleFormSelection}
          selectedForm={selectedForm}
          handleShowAllForms={handleShowAllForms}
          salt_forms_json={salt_forms_json}
          showAllStrengths={showAllStrengths}
          handleStrengthSelection={handleStrengthSelection}
          selectedStrength={selectedStrength}
          selectedPackaging={selectedPackaging}
          handleShowAllPackings={handleShowAllPackings}
          setSelectedPackaging={setSelectedPackaging}
          handleShowALlStrengths={handleShowALlStrengths}
          showAllPackings={showAllPackings}
          getLowestPrice={getLowestPrice}
        />

        {/* Tablet and Information  */}
        <div className="w-[40%] flex flex-col  items-center gap-4">
          <div className="flex items-center gap-1">
            <img className="w-[11.1px] h-[8.72px]" src={tablet} alt="tablet" />
            <span>{salt}</span>
          </div>
          <div className="text-[#204772] text-[12px]">
            <span id="bar">{selectedForm}</span>
            <span id="bar">{selectedStrength}</span>
            <span>{selectedPackaging}</span>
          </div>
        </div>

        {/* Price  */}
        <div
          className={`w-[20%] ${
            price === "No stores selling this product near you" &&
            "text-14px bg-white border border-[#A7D6D4] p-3 rounded-md"
          } text-[28px] text-center w-[200px]`}
        >
          <span>{price}</span>
        </div>
      </div>
    </div>
  );
};

export default DataItem;
