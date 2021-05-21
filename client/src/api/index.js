import axios from 'axios';

const API = axios.create({ baseURL : "http://localhost:5000"});
API.interceptors.request.use((req) => {
    if(localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
    return req;
})
export const signIn = (formData) => API.post('/users/signin', formData);
export const signUp = (formData) => API.post('/users/signup', formData);

export const fetchFriends = (formData) => API.post('/profile/search', formData)
export const fetchUserProfile = (id) => API.get(`/profile/${id}`);

export const fetchConversations = () => API.get('/chats/conversations');
export const fetchConversation = (id) => API.get(`/chats/conversation/${id}`);
export const updateConversation = (id, conversation) => API.patch(`/chats/conversation/${id}`, conversation);

export const fetchMessages = (id) => API.get(`/chats/messages/${id}`);
export const createFirstMessage = (formData) => API.post('/chats/message', formData);
