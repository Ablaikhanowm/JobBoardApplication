import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar({ user, setUser }) {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        navigate('/');
    };

    return (
        <nav style={styles.nav}>
            <div style={styles.logo}>
                <Link to="/" style={styles.logoLink}>JobBoard</Link>
            </div>
            <div style={styles.links}>
                <Link to="/jobs" style={styles.link}>Jobs</Link>
                <Link to="/external-jobs" style={styles.link}>External Jobs</Link>
                <Link to="/companies" style={styles.link}>Companies</Link>

                {user ? (
                    <>
                        {user.role === 'EMPLOYER' && (
                            <Link to="/employer/dashboard" style={styles.link}>Dashboard</Link>
                        )}
                        {user.role === 'JOB_SEEKER' && (
                            <>
                            <Link to="/my-applications" style={styles.link}>My Applications</Link>
                                <Link to="/profile" style={styles.link}>Profile</Link>
                            </>
                        )}
                        <span style={styles.userName}>Hi, {user.firstName}</span>
                        <button onClick={handleLogout} style={styles.button}>Logout</button>
                    </>
                ) : (
                    <>
                        <Link to="/login" style={styles.link}>Login</Link>
                        <Link to="/register" style={styles.buttonLink}>Register</Link>
                    </>
                )}
            </div>
        </nav>
    );
}

const styles = {
    nav: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '15px 30px',
        backgroundColor: '#2c3e50',
        color: 'white'
    },
    logo: {
        fontSize: '24px',
        fontWeight: 'bold'
    },
    logoLink: {
        color: 'white',
        textDecoration: 'none'
    },
    links: {
        display: 'flex',
        alignItems: 'center',
        gap: '20px'
    },
    link: {
        color: 'white',
        textDecoration: 'none'
    },
    buttonLink: {
        backgroundColor: '#3498db',
        color: 'white',
        padding: '8px 16px',
        borderRadius: '5px',
        textDecoration: 'none'
    },
    button: {
        backgroundColor: '#e74c3c',
        color: 'white',
        padding: '8px 16px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer'
    },
    userName: {
        color: '#bdc3c7'
    }
};

export default Navbar;