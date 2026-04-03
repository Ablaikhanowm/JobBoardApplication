import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

const api = axios.create({
    baseURL: 'http://localhost:8080/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const authAPI = {
    register: (data) => api.post('/auth/register', data),
    login: (data) => api.post('/auth/login', data),
    getMe: () => api.get('/auth/me'),
};

export const jobsAPI = {
    getAll: () => api.get('/jobs'),
    getById: (id) => api.get('/jobs/' + id),
    getByCompany: (companyId) => api.get('/jobs/company/' + companyId),
    search: (params) => api.get('/jobs/search', { params }),
    create: (data) => api.post('/jobs', data),
};

export const companiesAPI = {
    getAll: () => api.get('/companies'),
    getById: (id) => api.get('/companies/' + id),
    getMine: () => api.get('/companies/my-companies'),
    create: (data) => api.post('/companies', data),
};

export const applicationsAPI = {
    apply: (data) => api.post('/applications', data),
    getMine: () => api.get('/applications/my-applications'),
    getForJob: (jobId) => api.get('/applications/job/' + jobId),
    getForEmployer: ()=> api.get('/applications/employer'),
    updateStatus:(id,data)=> api.patch('/applications/' + id +'/status', data),
};

export const profileAPI = {
    get: () => api.get('/profile'),
    update: (data) => api.post('/profile', data),
};

export const externalJobsAPI = {
    search:(keyword = '', location ='',page=1) =>
        api.get(`/external-jobs/search?keyword=${keyword}&location=${location}&page=${page}`)
};

export default api;