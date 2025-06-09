import axios from 'axios'

const api = axios.create({
  baseURL:'http://localhost:5008'
})

export const loginAPI = (data)=> api.post('/user/login',data)
export const signupAPI = (data)=> api.post('/user/signup',data)
export const logoutAPI = ()=> api.post('/user/logout')

// api/auth.js
export const getCurrentUserAPI = () => {
  const token = localStorage.getItem("token");
  return api.get("/user/current-user", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};




