import React, { Component } from "react";
import styled from "styled-components";
export default class LogInForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            isValidemail: true,
            emailRegax: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
            pass: "",
            isValidpass: true,
            passRegax: /^(?!\s*$).+/,
            ServerError: false
        };
        // This binding is necessary to make `this` work in the callback
        this.isValid = this.isValid.bind(this);
        this.LogIn = this.LogIn.bind(this);
    }
    isValid(name, value) {
        var newState = {};
        var test = this.state[name + "Regax"].test(value);
        newState["isValid" + name] = test;
        this.setState(newState);
        return test;
    }
    LogIn(event) {
        event.preventDefault();

        if (
            this.isValid("email", this.state.email) &&
            this.isValid("pass", this.state.pass)
        ) {
            jQuery.ajax({
                url: "/access/logIn",
                type: "post",
                data: {
                    email: this.state.email,
                    pass: this.state.pass,
                    _token: $('meta[name="csrf-token"]').attr("content") // ! important for laravel
                },
                success: data => {
                    var data = JSON.parse(data);
                    this.props.setLogIn(data.logIn);
                },
                error: error =>
                    this.setState({
                        ServerError: true
                    })
            });
        }
    }
    render() {
        return (
            <form className="col-12 col-sm-6 mt-auto mb-auto pl-5 pr-5">
                <div className="form-group">
                    <label for="exampleInputEmail1">Email address</label>
                    <input
                        type="email"
                        style={{
                            border: this.state.isValidemail
                                ? "1px solid #eee"
                                : "1px solid red"
                        }}
                        onChange={e => {
                            this.isValid("email", e.target.value);
                            this.setState({ email: e.target.value });
                        }}
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                    />
                    <small id="emailHelp" className="form-text text-muted">
                        We'll never share your email with anyone else.
                    </small>
                </div>
                <div className="form-group">
                    <label for="exampleInputPassword1">Password</label>
                    <input
                        type="password"
                        style={{
                            border: this.state.isValidpass
                                ? "1px solid #eee"
                                : "1px solid red"
                        }}
                        onChange={e => {
                            this.isValid("pass", e.target.value);
                            this.setState({ pass: e.target.value });
                        }}
                        className="form-control"
                        id="exampleInputPassword1"
                    />
                </div>
                <div className="form-group form-check">
                    <label
                        className="form-check-label text-danger"
                        for="exampleCheck1"
                    >
                        {this.state.ServerError
                            ? "Server is not avalible now!, try later."
                            : ""}
                    </label>
                </div>
                <button
                    type="submit"
                    onClick={this.LogIn}
                    className="btn btn-primary"
                >
                    LogIn
                </button>
            </form>
        );
    }
}
