// import { useEffect, useState } from "react";
import mailIcon from "../../assets/icons/mail.svg";

function  EmailBtn() {
  return (
    <>

    <div className="bg-white w-78 h-10 rounded-xl shadow-xl flex justify-center
        place-items-center p-10 mt-5
        2xl:w-300 2xl:h-200">
            <p>Change email</p>
            <img className="w-7 ml-6" src={mailIcon} alt="mail icon" />
    </div>
    
    </>
  );
}

export default EmailBtn;
