import { GithubAuthProvider, signInWithPopup } from "firebase/auth";
import styled from "styled-components";
import { auth } from "../routes/firebase";
import { useNavigate } from "react-router-dom";

const Button = styled.span`
  background-color: white;
  margin-top: 50px;
  font-weight: 500;
  padding: 10px 20px;
  border-radius: 50px;
  width: 100%;
  color: black;
  border: 0;
  display: flex;
  gap: 5px;
  align-items: center;
  cursor: pointer;
  justify-content: center;
`;

const Logo = styled.img`
  height: 25px;
`;

export default function GithubButton() {
  const navigate = useNavigate();
  const onClick = async () => {
    try {
      const provider = new GithubAuthProvider();
      await signInWithPopup(auth, provider);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Button onClick={onClick}>
      <Logo src="public\github-mark-c791e9551fe4\github-mark\github-mark.png" />
      Continue with Github
    </Button>
  );
}
