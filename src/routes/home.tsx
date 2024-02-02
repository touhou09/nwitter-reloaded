import styled from "styled-components";
import { auth } from "../firebase"
import PostTweetForm from "../component/post-tweet-form";

const Wrapper = styled.div``;

export default function Home(){
    return (
        <Wrapper>
            <PostTweetForm />
        </Wrapper>
    )
}