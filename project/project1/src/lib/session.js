
function login(sessionId){
    localStorage.setItem("sessionId",sessionId);
}

function logout(){
    localStorage.removeItem("sessionId");
}

export default {
    login,
    logout,
}