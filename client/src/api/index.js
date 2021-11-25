import axios from 'axios';

const API = axios.create({ baseURL : process.env.REACT_APP_SERVER_URL_TEST});
API.interceptors.request.use((req) => {
    if(localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
    return req;
})
export const signIn = (formData) => API.post('/auth/signin', formData);
export const signUp = (formData) => API.post('/auth/signup', formData);
export const signInWithGoogle = (tokenId) => API.post('/auth/google', { tokenId});
export const signInWithFacebook = (accessToken) => API.post('/auth/facebook', { accessToken});

export const fetchFriends = (formData) => API.post('/profile/search', formData)
export const fetchMembers = (formData) => API.post('/profile/member/search', formData)
export const updateAvatar = (id, formData) => API.post(`/profile/update-avatar/${id}`, formData);
export const updateProfile = (id,formData) => API.patch(`/profile/update/${id}`, formData);

export const updateConversation = (conversation) => API.patch(`/chats/conversation`, conversation);
export const getConversationByUserIds = (userId) => API.get(`/chats/conversation/${userId}`);
