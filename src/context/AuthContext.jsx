import { createContext, useContext, useState, useEffect } from 'react'
import { auth, signInWithGoogle, signOutUser } from '../lib/firebase'
import { onAuthStateChanged } from 'firebase/auth'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            if (firebaseUser) {
                setUser({
                    name: firebaseUser.displayName,
                    email: firebaseUser.email,
                    photoURL: firebaseUser.photoURL,
                    uid: firebaseUser.uid
                })
            } else {
                setUser(null)
            }
            setLoading(false)
        })
        return () => unsubscribe()
    }, [])

    const login = (userData) => setUser(userData)

    const logout = async () => {
        await signOutUser()
        setUser(null)
    }

    const googleLogin = async () => {
        const result = await signInWithGoogle()
        return result
    }

    return (
        <AuthContext.Provider value={{ user, loading, login, logout, googleLogin }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)