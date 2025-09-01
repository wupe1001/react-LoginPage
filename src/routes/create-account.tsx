import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from "react";
import { auth } from "./firebase";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
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
  const [name, setN] = useState("");
  const [email, setE] = useState("");
  const [pwd, setP] = useState("");
  const [error, sete] = useState("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;
    if (name === "name") {
      setN(value);
    } else if (name === "email") {
      setE(value);
    } else if (name === "pwd") {
      setP(value);
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sete("");
    if (load || name === "" || email === "" || pwd === "") {
      return;
    }
    try {
      setL(true);
      const credentials = await createUserWithEmailAndPassword(
        auth,
        email,
        pwd
      );
      await updateProfile(credentials.user, { displayName: name });
      navigate("/");
    } catch (e) {
      if (e instanceof FirebaseError) {
        sete(e.message);
      }
    } finally {
      setL(false);
    }
    console.log(name, email, pwd);
  };

  return (
    <Wrapper>
      <Title>Join X</Title>
      <Form onSubmit={onSubmit}>
        <Input
          onChange={onChange}
          name="name"
          value={name}
          placeholder="Name"
          type="text"
          required
        />
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
        <Input type="submit" value={load ? "Loading..." : "CreateAccount"} />
      </Form>
      {error !== "" ? <Error>{error}</Error> : null}
      <Switcher>
        Already have an account? <Link to="/login">Log in &rarr;</Link>
      </Switcher>
      <GithubButton />
    </Wrapper>
  );
}
