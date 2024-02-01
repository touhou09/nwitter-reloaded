import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import React from "react";
import { useState } from "react";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { Input, Switcher, Title, Wrapper, Error, Form } from "../component/auth-components";
import GithubButton from "../component/github-btn";

export default function CreateAccount() {

    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");
    
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {
          target: { name, value },
        } = e;
        if (name === "name") {
          setName(value);
        } else if (name === "email") {
          setEmail(value);
        } else if (name === "password") {
          setPassword(value);
        }
      };

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        if(isLoading || name === "" || email === "" || password === "") return;
        try {
            setIsLoading(true);
            const credentials = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(credentials.user, {
                displayName: name,
            })
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
            <Title>Create Account in 𝕏</Title>
            <Form onSubmit={onSubmit}>
                <Input 
                onChange={onChange} 
                name="name" 
                placeholder="Name" 
                type="text" 
                required 
                />
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
                value={isLoading ? "Loading..." : "Create Account"} 
                />
            </Form>
            {error !== "" ? <Error>{error}</Error> : null}
            <Switcher>
                Already have an account?{" "}
                <Link to="/login">Sign In &rarr;</Link>
            </Switcher>
            <GithubButton />
        </Wrapper>
    )
}