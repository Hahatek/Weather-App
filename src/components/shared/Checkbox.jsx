import check from "../../assets/icons/check.svg";

function Checkbox({ text }) {
  return (
    <div className="flex items-center mt-2 relative">
      <input
        type="checkbox"
        name="remember"
        id="remember"
        className="peer w-5 h-5 appearance-none border-2 border-acent rounded-sm accent-acent
                   "
      />
      <img
        src={check}
        alt="check"
        className="w-7 h-7 absolute -left-[9.6px] -top-[3.7px] mt-[2px] ml-[6px] 
        pointer-events-none 
        opacity-0 
        peer-checked:opacity-100 
        transition-opacity
        duration-150"
      />
      <label htmlFor="remember" className="ml-3 text-[15px]">
        {text}
      </label>
    </div>
  );
}

export default Checkbox;
