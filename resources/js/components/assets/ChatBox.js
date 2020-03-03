import React, { Component } from "react";
import styled from "styled-components";

export default class ChatBox extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activeGroup: this.props.activeGroup,
            activeTag: this.props.activeTag,
            GroupTags: this.props.GroupTags
        };
    }

    render() {
        const Context = this.props.Context;

        return (
            <div className="col row">
                <Context.Consumer>
                    {contxt => {
                        console.log("this", contxt);
                        return <div>ddd</div>;
                    }}
                </Context.Consumer>

                {this.state.activeGroup ? (
                    <div className="col-2 border border-info">
                        <div className="text-center web-color-black-1 p-1 pt-2">
                            Tags
                        </div>
                        {this.state.GroupTags.map((v, i) => {
                            return (
                                <GroupTag
                                    key={i}
                                    onClick={() => this.tagClick(v)}
                                    className={
                                        this.state.activeTag == v
                                            ? "text-center web-color-blue-0 p-1 pt-2"
                                            : "text-center text-black-50 p-1 pt-2"
                                    }
                                >
                                    #{v}
                                </GroupTag>
                            );
                        })}
                    </div>
                ) : (
                    <div className="d-flex flex-column w-100 h-100 justify-content-center align-items-center">
                        <img
                            style={{
                                width: 300,
                                height: 300
                            }}
                            src="/assets/empty.png"
                        />
                        <h2 className="web-color-black-1">
                            The Page is empty!
                        </h2>
                        <p className="web-color-black-0">
                            press on groups icon or join one.
                        </p>
                    </div>
                )}
            </div>
        );
    }
}
