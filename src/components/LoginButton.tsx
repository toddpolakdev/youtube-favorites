import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import { FaGoogle } from "react-icons/fa";
import styled from "styled-components";

export default function LoginButton() {
  const handleLogin = async () => {
    await signInWithPopup(auth, googleProvider);
  };

  const LoginButton = styled.button`
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 6px;
    background: ${({ theme }) => theme.buttonBg};
    color: #fff;
    cursor: pointer;

    &:hover {
      background: ${({ theme }) => theme.buttonHover};
    }
  `;

  return (
    <LoginButton onClick={handleLogin}>
      <FaGoogle />
      <span> Login</span>
    </LoginButton>
  );
}
