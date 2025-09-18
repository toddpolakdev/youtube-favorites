import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { FaGoogle } from "react-icons/fa";
import styled from "styled-components";

export default function LogoutButton() {
  const handleLogout = async () => {
    await signOut(auth);
  };

  const LogoutButton = styled.button`
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
    <LogoutButton onClick={handleLogout}>
      <FaGoogle />
      <span> Logout</span>
    </LogoutButton>
  );
}
