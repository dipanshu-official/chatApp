import axios from 'axios'

const api = axios.create({
  baseURL:'http://localhost:5008'
})

export const loginAPI = (data)=> api.post('/user/login',data)
export const signupAPI = (data)=> api.post('/user/signup',data)
export const logoutAPI = ()=> api.post('/user/logout')
export const getallusersAPI = () => {
  const token = localStorage.getItem("token");
  return api.get("/user/allusers", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};



