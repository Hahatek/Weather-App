import { useEffect, useState } from "react";

function QuotesBox({currentQuote}) {
  return (
    <>

    <div className="bg-white w-78 h-100 rounded-xl shadow-xl flex flex-col justify-center
        place-items-center p-10 
        2xl:w-300 2xl:h-200">
        {currentQuote ? (
            <>
            <p>{currentQuote.quote}</p>
            <p className="mt-5">Author: {currentQuote.author}</p>
            </>
        ) : (
            <p>Click the button to draw a quote</p>
        )}
    </div>
    
    </>
  );
}

export default QuotesBox;
