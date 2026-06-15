import { useContext, useReducer } from "react";

const AuthContext = useContext();
const state = {
    User:null,
    IsAuthenticated:false
}
function reducer(state,action) {
        switch (action.type) {
            case "login": {
                return {...state,User:action.payload,IsAuthenticated:true}
            }
            case "logout":{
                return {
                    ...state,User:null,IsAuthenticated:false
                }
            }
            default: throw new Error("unknown type ")
        }
}
const AuthProvider({children}) {
    const [{User,IsAuthenticated},dispatch] = useReducer(state, reducer)
    function login(email,password) {}
    function logout() {

    }
    
    return <AuthContext.Provider>{children}</AuthContext.Provider>;
}

const useAuth() {
    const context = useContext(AuthContext)
    if (context===undefined) throw new Error("AuthContext was used outside the Auth Provider")
}