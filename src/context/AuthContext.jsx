import { onAuthStateChanged, signOut } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../config/firebase";

const authContext = createContext();

export function useAuthContext() {
    return useContext(authContext);
}

function AuthContext({ children }) {
    const [user, setUser] = useState();
    const [userId, setUserId] = useState();

    const isLoggedIn = user !== null;
    // const auth = getAuth();
    useEffect(() => {
        onAuthStateChanged(auth, async(u) => {
            setUserId(await u.uid)
            let userUid=await u.uid;
            localStorage.setItem('uid',userUid+'')
            setUser(u);
        });
    }, []);

    const logout = () => {
        signOut(auth);
    }


    return <authContext.Provider value={{ user,userId, isLoggedIn, logout }}>
        {children}
    </authContext.Provider>
}

export default AuthContext;