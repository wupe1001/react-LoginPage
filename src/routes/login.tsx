import { useState } from "react";
import { auth } from "./firebase";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";
import {
  Form,
  Error,
  Input,
  Switcher,
  Title,
  Wrapper,
} from "../components/auth-components";
import GithubButton from "../components/github-btn";

export default function CreateAccount() {
  const navigate = useNavigate();
  const [load, setL] = useState(false);
  const [email, setE] = useState("");
  const [pwd, setP] = useState("");
  const [error, sete] = useState("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;
    if (name === "email") {
      setE(value);
    } else if (name === "pwd") {
      setP(value);
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sete("");
    if (load || email === "" || pwd === "") {
      return;
    }
    try {
      setL(true);
      await signInWithEmailAndPassword(auth, email, pwd);
      navigate("/");
    } catch (e) {
      if (e instanceof FirebaseError) {
        sete(e.message);
      }
    } finally {
      setL(false);
    }
  };

  return (
    <Wrapper>
      <Title>Log in X</Title>
      <Form onSubmit={onSubmit}>
        <Input
          onChange={onChange}
          name="email"
          value={email}
          placeholder="Email"
          type="email"
          required
        />
        <Input
          onChange={onChange}
          value={pwd}
          name="pwd"
          placeholder="Password"
          type="password"
          required
        />
        <Input type="submit" value={load ? "Loading..." : "Login"} />
      </Form>
      {error !== "" ? <Error>{error}</Error> : null}
      <Switcher>
        Don't have an account?{" "}
        <Link to="/create-account">Create one &rarr;</Link>
      </Switcher>
      <Switcher>
        You forgot the password? <Link to="/repwd">reset password &rarr;</Link>
      </Switcher>
      <GithubButton />
    </Wrapper>
  );
}
