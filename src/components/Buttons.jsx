const Buttons = ({
  array,

  showAll,
  handleShowAll,
}) => {
  return (
    <div>
      {array.length > 4 && !showAll && (
        <button
          onClick={handleShowAll}
          className="p-1 text-[14px] font-bold   text-[#204772]  "
        >
          more...
        </button>
      )}

      {array.length > 4 && showAll && (
        <button
          onClick={handleShowAll}
          className="p-1 text-[14px] font-bold  text-[#204772]  "
        >
          hide
        </button>
      )}
    </div>
  );
};

export default Buttons;
