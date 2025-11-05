import { useState } from "react";

function AvatarSection() {
  const [imageSrc, setImageSrc] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageSrc(URL.createObjectURL(file));
    }
  };

  return (
    <div className="flex flex-col place-items-center">
      <div className="relative group w-30 h-30 rounded-full shadow-xl mb-10 overflow-hidden">
        {imageSrc ? (
          <img
            src={imageSrc}
            alt="Avatar"
            className="w-full h-full object-cover"
          />
        ) : (
          <p className="text-xs text-center mt-10">Change avatar</p>
        )}
        <label className="absolute inset-0 bg-acent bg-opacity-50 opacity-0 group-hover:opacity-100 flex justify-center items-center text-white text-sm cursor-pointer transition-opacity">
          Change avatar
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </label>
      </div>

      <div>
        <p className="text-xl">Account Name</p>
        <p>Account Email</p>
      </div>
    </div>
  );
}

export default AvatarSection;
