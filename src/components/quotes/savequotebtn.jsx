
import { useEffect, useState } from "react";

function QuotesBtnSave({handleDownload, isDisabled}) {
  return (
    <>
      <div>
        <button onClick={handleDownload}
              disabled={isDisabled}
             className={isDisabled ? "opacity-25 cursor-not-allowed" : ""}>
            <p className="bg-btn rounded-xl w-60 h-10 
            flex justify-center place-items-center mt-7 shadow-xl
            2xl:w-100
            ">
                Save Quote
            </p>
        </button>
      </div>
    </>
  );
}

export default QuotesBtnSave;
