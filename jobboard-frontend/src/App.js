import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Jobs from './pages/Jobs';
import JobDetails from './pages/JobDetails';
import MyApplications from './pages/MyApplications';
import EmployerDashboard from './pages/EmployerDashboard';
import Companies from './pages/Companies';
import CompanyDetails from './pages/CompanyDetails';
import CreateCompany from './pages/CreateCompany';
import CreateJob from './pages/CreateJob';
import Profile from "./pages/Profile";
import ExternalJobs from "./pages/ExternalJobs";

function App() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
    }, []);

    return (
        <Router>
            <div>
                <Navbar user={user} setUser={setUser} />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login setUser={setUser} />} />
                    <Route path="/register" element={<Register setUser={setUser} />} />
                    <Route path="/jobs" element={<Jobs />} />
                    <Route path="/jobs/:id" element={<JobDetails user={user} />} />
                    <Route path="/my-applications" element={<MyApplications />} />
                    <Route path="/employer/dashboard" element={<EmployerDashboard />} />
                    <Route path="/companies" element={<Companies />} />
                    <Route path="/companies/:id" element={<CompanyDetails />} />
                    <Route path="/create-company" element={<CreateCompany />} />
                    <Route path="/create-job" element={<CreateJob />} />
                    <Route path="/create-job/:companyId" element={<CreateJob />} />
                    <Route path="/profile" element={<Profile />}/>
                    <Route path="/external-jobs" element={<ExternalJobs />}/>
                </Routes>
            </div>
        </Router>
    );
}

export default App;