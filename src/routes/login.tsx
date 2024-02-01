import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { Wrapper, Input, Switcher, Title, Error, Form } from "../component/auth-components";
import GithubButton from "../component/github-btn";

export default function Login() {

    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");
    
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {
          target: { name, value },
        } = e;
        if (name === "email") {
          setEmail(value);
        } else if (name === "password") {
          setPassword(value);
        }
      };

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        if(isLoading || email === "" || password === "") return;
        try {
            setIsLoading(true);
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/");
        } catch (e) {
            if(e instanceof FirebaseError){
                setError(e.message);
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Wrapper>
            <Title>Log Into 𝕏</Title>
            <Form onSubmit={onSubmit}>
                <Input 
                onChange={onChange} 
                name="email" 
                placeholder="Email" 
                type="email" 
                required 
                />
                <Input 
                onChange={onChange} 
                name="password" 
                placeholder="Password" 
                type="password" 
                required 
                />
                <Input 
                onChange={onChange} 
                type="submit" 
                value={isLoading ? "Loading..." : "Login"} 
                />
            </Form>
            {error !== "" ? <Error>{error}</Error> : null}
            <Switcher>
                Don`t you have an account?{" "}
                <Link to="/create-account">Sign On &rarr;</Link>
            </Switcher>
            <GithubButton />
        </Wrapper>
    )
}