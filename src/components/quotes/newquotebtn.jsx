
import { useEffect, useState } from "react";

function QuotesBtnNew({handleClick}) {
  return (
    <>
      <div>
        <button onClick={handleClick}>
            <p className="bg-acent rounded-xl w-78 h-10 
            flex justify-center place-items-center mt-10
            shadow-xl
            2xl:w-180
            ">
                New Quote
            </p>
        </button>
      </div>
    </>
  );
}

export default QuotesBtnNew;
