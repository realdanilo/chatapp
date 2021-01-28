let users =[ ]

//join user to chat
function userJoin(id, username, room){
    const user = {id, username, room}

    users.push(user)
    return user
}

//get current user
function getCurrentUser(id){
    return users.find(x => x.id === id)
}

//user leaves chat
function userLeave(id){
    let leftUser = users.find(x => x.id === id)
    users = users.filter(x => x.id != id)
    return leftUser
}


//get room users 
function getRoomUsers(room){
    return users.filter( u => u.room === room)
}

module.exports = {userJoin, getCurrentUser, userLeave, getRoomUsers}