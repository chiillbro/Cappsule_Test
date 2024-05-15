import Buttons from "./Buttons";

const MedicineSelection = ({
  available_forms,
  showAllForms,
  handleFormSelection,
  selectedForm,
  handleShowAllForms,
  salt_forms_json,
  showAllStrengths,
  handleStrengthSelection,
  selectedStrength,
  selectedPackaging,
  handleShowAllPackings,
  setSelectedPackaging,
  handleShowALlStrengths,
  showAllPackings,
  getLowestPrice,
}) => {
  return (
    <div className="w-[35%] flex flex-col gap-[15px]">
      {/* Form Section starts here  */}
      <div className="flex gap-[4vw] ">
        <span className="text-[15px]">Form: </span>
        <div className="flex gap-2 flex-wrap">
          {available_forms
            .slice(0, showAllForms ? available_forms.length : 4)
            .map((form, index) => (
              <div
                className="flex gap-2"
                key={index}
                onClick={() => handleFormSelection(form)}
              >
                <span
                  className={`p-[4px] cursor-pointer text-[13px] rounded-lg border-2 text-[#555555]  ${
                    selectedForm === form
                      ? "border-[#112D31] border-[3px] drop-shadow-[0px_0px_0px_rgba(0,197,161)]   shadow-[0px_0px_0px_5px_rgba(0,197,161,0.1)]"
                      : "border-[#ABABAB] "
                  }`}
                >
                  {form}
                </span>
              </div>
            ))}
          <Buttons
            array={available_forms}
            showAll={showAllForms}
            handleShowAll={handleShowAllForms}
          />
        </div>
      </div>

      {/* Form Section ends here  */}

      {/* Strength Section starts here  */}
      {selectedForm && (
        <div className=" flex gap-[2vw]">
          <div className="text-[15px]">Strength: </div>
          <div className="flex gap-2 flex-wrap">
            {salt_forms_json[selectedForm] &&
              Object.keys(salt_forms_json[selectedForm])
                .slice(
                  0,
                  showAllStrengths
                    ? Object.keys(salt_forms_json[selectedForm]).length
                    : 4
                )
                .map((strength, index) => {
                  const allNull = Object.values(
                    salt_forms_json[selectedForm][strength]
                  )
                    .map((item) => Object.values(item))
                    .every((item) => item.every((id) => id === null));

                  return (
                    <div
                      key={index}
                      className={`flex gap-2 `}
                      onClick={() => handleStrengthSelection(strength)}
                    >
                      <span
                        className={`p-[4px] cursor-pointer text-[13px] rounded-lg  border-2 text-[#555555] ${
                          allNull ? "border-dashed" : ""
                        } ${
                          selectedStrength === strength
                            ? "border-[#112D31] border-[3px]"
                            : "border-[#ABABAB] "
                        } ${
                          !allNull & (selectedStrength === strength) &&
                          "drop-shadow-[0px_0px_0px_rgba(0,197,161)]   shadow-[0px_0px_0px_5px_rgba(0,197,161,0.1)]"
                        }`}
                      >
                        {strength}
                      </span>
                    </div>
                  );
                })}

            <Buttons
              array={Object.keys(salt_forms_json[selectedForm])}
              showAll={showAllStrengths}
              handleShowAll={handleShowALlStrengths}
            />
          </div>
        </div>
      )}
      {/* Strength Section ends here  */}

      {/* Packaging Section starts here  */}
      {selectedStrength && (
        <div className="flex gap-[1.2vw] ">
          <span className="text-[15px]">Packaging: </span>
          <div className="flex gap-2 flex-wrap">
            {salt_forms_json[selectedForm] &&
              salt_forms_json[selectedForm][selectedStrength] &&
              Object.entries(salt_forms_json[selectedForm][selectedStrength])
                .slice(
                  0,
                  showAllPackings
                    ? Object.keys(
                        salt_forms_json[selectedForm][selectedStrength]
                      ).length
                    : 4
                )
                .map(([packaging, values], index) => {
                  const allNull = Object.values(values).every(
                    (id) => id === null
                  );

                  return (
                    <div
                      key={index}
                      className={`flex gap-2 `}
                      onClick={() => {
                        setSelectedPackaging(packaging);

                        getLowestPrice(
                          selectedForm,
                          selectedStrength,
                          packaging
                        );
                      }}
                    >
                      <span
                        className={`p-[4px] cursor-pointer text-[13px] rounded-lg border-2 text-[#555555] ${
                          allNull ? "border-dashed" : ""
                        } ${
                          selectedPackaging === packaging
                            ? "border-[#112D31] border-[3px]"
                            : "border-[#ABABAB] "
                        }
                    ${
                      !allNull & (selectedPackaging === packaging) &&
                      "drop-shadow-[0px_0px_0px_rgba(0,197,161)]   shadow-[0px_0px_0px_5px_rgba(0,197,161,0.1)]"
                    }
                    `}
                      >
                        {packaging}
                      </span>
                    </div>
                  );
                })}

            <Buttons
              array={Object.keys(
                salt_forms_json[selectedForm][selectedStrength]
              )}
              showAll={showAllPackings}
              handleShowAll={handleShowAllPackings}
            />
          </div>
        </div>
      )}
      {/* Packaging Section ends here  */}
    </div>
  );
};

export default MedicineSelection;
