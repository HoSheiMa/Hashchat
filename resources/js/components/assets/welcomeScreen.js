import React, { Component } from "react";

import styled from "styled-components";

const Wrap = styled.div`
    /* @media (max-width: 576px) {
        height: 50vh !important;
    } */
`;

const Title = styled.h1`
    text-shadow: 1px 1px 10px black;
    color: #ffffff;
`;
const LinearGCover = styled.div`
    background: -webkit-linear-gradient(to right, #89fffd85, #ef32d947);
    background: linear-gradient(to right, #89fffd85, #ef32d947);
`;
export default class WelcomeScreen extends Component {
    render() {
        return (
            <Wrap className="img-1 m-0 p-0 h-auto col-12 col-sm-6 ">
                <LinearGCover className="d-flex w-100 h-100 justify-content-center align-items-center">
                    <Title className="text-center">
                        Welcome <br /> In HashChat
                    </Title>
                </LinearGCover>
            </Wrap>
        );
    }
}
