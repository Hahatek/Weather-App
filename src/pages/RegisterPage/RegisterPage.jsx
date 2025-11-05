import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Input from "../../components/shared/Input.jsx";
import Button from "../../components/shared/Button.jsx";
import Title from "../../components/shared/Title.jsx";

function registerPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function moveLoginPage() {
    navigate("/logins");
  }

  function addUser() {
    fetch('https://dummyjson.com/users/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName: email,
        password: password
      })
    })
      .then(res => res.json())
      .then(data => {
        console.log("Użytkownik dodany:", data);
        localStorage.setItem("user", JSON.stringify(data));
        navigate("/logins");
      })
      .catch(error => {
        console.error("Błąd rejestracji:", error);
      });
  }

  return (
    <div className="flex flex-col">
      <Title text='Register' />

      <Input
        type="text"
        label="Username"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <Input
        type="password"
        label="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <Button onClick={addUser} text="Register now" />

      <div className="flex flex-row justify-center gap-2 mt-5">
        <p>Already have an account?</p>
        <button
          type="button"
          onClick={moveLoginPage}
          className="text-acent font-bold"
        >
          Log in
        </button>
      </div>
    </div>
  );
}

export default registerPage;
