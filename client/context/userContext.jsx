import axios from 'axios'
import { createContext ,useEffect,useState} from 'react'

export const UserContext=createContext({});

export function UserContextProvider({children})
{
    const[user,setUser]=useState(null);
    useEffect(()=>
    {
        if(!user)
            {
                const token = localStorage.getItem('token')
                
                axios.get('/profile?token=' + token).then(({data})=>
                {
                    setUser(data)
                })
            }
    },[])
    return (
        <UserContext.Provider value={{setUser,user}}>
            {children}
        </UserContext.Provider>
    )
}