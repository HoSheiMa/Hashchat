import React, { Component } from "react";
import styled from "styled-components";
import ChatBox from "./assets/ChatBox";

const GroupIcon = styled.div`
    border-radius: 8px;
    background-image: url(${props => props.image});
    width: 100%;
    height: 60px;
    background-size: contain;
    background-color: #ffffff;
    background-repeat: no-repeat;
    background-position: center;
    border: 1px solid #f6f9f8;
    margin-top: 6px;
    transition: 0.4s;
    &:hover {
        background-color: #f6f9f8;
    }
`;
const GroupTag = styled.div`
    cursor: pointer;
`;

export default class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ServerError: false,
            groups: [],
            activeGroup: null,
            activeTag: null,
            tagData: [],
            GroupTags: []
        };
        this.getUserGroups = this.getUserGroups.bind(this);
        this.groupIconClick = this.groupIconClick.bind(this);
        this.getTagChatData = this.getTagChatData.bind(this);
        this.tagClick = this.tagClick.bind(this);

        const Context = this.props.Context;
    }
    async getUserGroups() {
        return await jQuery.ajax({
            url: "/access/getUserGroups",
            type: "post",
            data: {
                _token: $('meta[name="csrf-token"]').attr("content") // ! important for laravel
            },
            success: data => {
                return data;
            },
            error: error =>
                this.setState({
                    ServerError: true
                })
        });
    }
    async getTagChatData(groupId, tagName) {
        return await jQuery.ajax({
            url: "/access/getTagChatData",
            type: "post",
            data: {
                tagName: tagName,
                groupId: groupId,
                _token: $('meta[name="csrf-token"]').attr("content") // ! important for laravel
            },
            success: data => {
                return data;
            },
            error: error =>
                this.setState({
                    ServerError: true
                })
        });
    }
    async groupIconClick(id) {
        for (var i in this.state.groups) {
            if (this.state.groups[i].id == id) {
                var tags = JSON.parse(this.state.groups[i].tags);
                this.setState({
                    GroupTags: tags,
                    activeGroup: id
                });
                break;
            }
        }
    }
    async tagClick(id) {
        console.log(id);
        var chatData = await this.getTagChatData(this.state.activeGroup, id);
        this.setState({
            activeTag: id,
            tagData: JSON.parse(chatData)
        });
    }
    async componentWillMount() {
        var data = await this.getUserGroups();
        this.setState({
            groups: data
        });
    }

    render() {
        return (
            <div className="row m-0 p-0 w-100 h-100">
                <div
                    style={{
                        maxWidth: 80
                    }}
                    className="col d-flex flex-column p-1 border-right align-items-center"
                >
                    <a href="#" className="badge badge-primary">
                        Groups
                        {this.state.groups.length
                            ? ` (${this.state.groups.length})`
                            : ""}
                    </a>
                    {this.state.groups.map((v, i) => {
                        return (
                            <GroupIcon
                                key={i}
                                onClick={() => this.groupIconClick(v.id)}
                                {...v}
                            ></GroupIcon>
                        );
                    })}
                </div>

                {coverOfChatBox(this.state, this.props)}

                <div
                    style={{
                        maxWidth: 160
                    }}
                    className="col d-flex flex-column p-1 border-left align-items-center"
                ></div>
            </div>
        );
    }
}

function coverOfChatBox(state, props) {
    return (
        <ChatBox
            Context={props.Context}
            GroupTags={state.GroupTags}
            activeGroup={state.activeGroup}
            activeTag={props.activeTag}
        />
    );
}
