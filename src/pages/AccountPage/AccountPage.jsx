// import { useEffect, useState } from "react";
import Navbar from "../../components/layout/Navbar.jsx";
import BirthdayBtn from "../../components/accounts/changebirthdaybtn.jsx";
import EmailBtn from "../../components/accounts/changeemialbtn.jsx";
import PersonalText from "../../components/accounts/accimg.jsx"
import AvatarSection from "../../components/accounts/avatarsection.jsx"


function AccountPage() {
  return (
    <>
      <Navbar />
      <AvatarSection />
      <PersonalText />
      <BirthdayBtn />
      <EmailBtn />
    </>
  );
}

export default AccountPage;
