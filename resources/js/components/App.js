import React, { Component, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import LogInForm from "./assets/LogInForm";
import WelcomeScreen from "./assets/welcomeScreen";
import Chat from "./Chat";

const Context = React.createContext();

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            logIn: false,
            setLogIn: v => {
                this.setState({
                    logIn: v
                });
            }
        };
        this.isLogInFun = this.isLogInFun.bind(this);
    }
    async isLogInFun() {
        return await jQuery.ajax({
            url: "/access/isLogIn",
            type: "post",
            data: {
                _token: $('meta[name="csrf-token"]').attr("content") // ! important for laravel
            },
            success: data => {
                data = JSON.parse(data);
                this.state.setLogIn(data.isLogIn);
                return data.isLogIn;
            },
            error: error =>
                this.setState({
                    ServerError: true
                })
        });
    }
    async componentWillMount() {
        await this.isLogInFun();
    }

    render() {
        return (
            <Context.Provider
                value={{ state: this.state, setState: this.setState }}
            >
                <div className="m-0 p-0 w-100 h-100">
                    {this.state.logIn ? (
                        <Chat Context={Context} />
                    ) : (
                        <div className="row m-0 p-0 w-100 h-100">
                            <WelcomeScreen />
                            <LogInForm
                                Context={Context}
                                setLogIn={this.state.setLogIn}
                            />
                        </div>
                    )}
                </div>
            </Context.Provider>
        );
    }
}

if (document.getElementById("app")) {
    ReactDOM.render(<App />, document.getElementById("app"));
}
