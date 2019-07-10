import store from './store'

function login(sessionId,user,redirect = '/'){
    localStorage.setItem("sessionId",sessionId);
    store.set("user",user)
    if(!redirect)
    return;

    location.href = redirect;
}

function logout(redirect = '/'){
    localStorage.removeItem("sessionId");
    localStorage.removeItem("user");
    if(!redirect)
    return;

    location.href = redirect;
}

function loggedIn(){
    let userdata = {};
    userdata.sessionid = localStorage.getItem("sessionId");
    userdata.user= store.get("user");
   

    return userdata;


}

export default {
    login,
    logout,
    loggedIn
}