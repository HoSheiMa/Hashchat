<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App;

class chat extends Controller
{
    public function getUserGroups(Request $request)
    {
        // get user groups ids;
        $users = new App\Users;
        $users = $users->where('id',  $request->session()->get('userId'))->get()->first();
        $userGroupsIds = json_decode($users->chat_groups, true);

        // get groups data by id 

        $chatsGroups = new App\ChatsGroups;

        $list = array();
        for ($i = 0; $i < sizeof($userGroupsIds); $i++) {
            // get info of chatGroup
            $chatGroupData = $chatsGroups->where('id', $userGroupsIds[$i])->get()->first();
            array_push($list, $chatGroupData);
        }


        return $list;
    }
    public function getTagChatData(Request $request)
    {
        $values = $request->validate([
            "tagName" => 'required',
            "groupId" => 'required'
        ]);

        $tagName = $values['tagName'];

        $groupId = $values['groupId'];

        $chatData = new App\chatsData;

        $chatData = $chatData->where('tag', $tagName)->where('group', $groupId)->get()->first();

        return json_encode($chatData, true);
    }
}