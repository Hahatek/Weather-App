// import { useEffect, useState } from "react";
import cakeIcon from "../../assets/icons/cake.svg";

function  BirthdayBtn() {
  return (
    <>

    <div className="bg-white w-78 h-5 rounded-xl shadow-xl flex justify-center
        place-items-center p-10 
        2xl:w-300 2xl:h-200">
            <p>Change birthday</p>
            <img className="w-7 ml-6" src={cakeIcon} alt="cake icon" />
    </div>
    
    </>
  );
}

export default BirthdayBtn;
