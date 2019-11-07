// ACTION CREATORS 
// import axios from 'axios'
import axios from '../config/axios'


export const sendData = (_email, _password) =>{
    return (dispatch) => {
        if(_email.includes('@')){
          return  axios.post(
                '/users/login', 
                {
                    email: _email,
                    password : _password
                }
            ).then((res) => {
                if(res.data.error){
                    return alert(res.data.error)
                }
                // console.log(res.data)
                    let {id, username} = res.data
                    // kirim id dan username ke reducers
                        localStorage.setItem('userData',JSON.stringify({id, username}))
                        // Action
                        dispatch( {
                            type : "LOGIN_SUCCESS",
                            payload : {
                                id:id, 
                                username 
                            }
                        }
                        )
            })
        }else{
            return  axios.post(
                '/users/login', 
                {
                    username: _email,
                    password : _password
                }
            ).then((res) => {
                if(res.data.error){
                    return alert(res.data.error)
                }
                // console.log(res.data)
                    let {id, username} = res.data
                    // kirim id dan username ke reducers
                        localStorage.setItem('userData',JSON.stringify({id, username}))
                        // Action
                        dispatch( {
                            type : "LOGIN_SUCCESS",
                            payload : {
                                id:id, 
                                username 
                            }
                        }
                        )
            })
        }
    }
     
 }
 

export const logoutData = () =>{
    localStorage.removeItem('userData')
    return {
        type : "LOGOUT_SUCCESS",
    }
}

export const session = (userData) =>{
    return {
        type : 'LOGIN_SUCCESS',
        payload:{
            id : userData.id,
            username: userData.username
        }
    }
}

