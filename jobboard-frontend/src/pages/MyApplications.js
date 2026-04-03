import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { applicationsAPI } from '../api';

function MyApplications(){
    const[applications, setApplications] = useState([]);
    const[loading, setLoading] = useState(true);

    useEffect(()=> {
        fetchApplications();
    }, []);

    const fetchApplications = async() =>{
        try{
            const response = await applicationsAPI.getMine();
            setApplications(response.data);
        } catch(error){
            console.error('Error fetching applications:', error);
        } finally{
            setLoading(false);
        }
    };

    const getStatusColor=(status)=>{
        switch(status){
            case 'PENDING': return '#f39c12';
            case 'REVIEWED': return '#3498db';
            case 'SHORTLISTED': return '#9b59b6';
            case 'ACCEPTED': return '#27ae60';
            case 'REJECTED': return '#e74c3c';
            default: return '#95a5a6';
        }
    };

    if(loading){
        return <div style={styles.loading}> Loading application...</div>;
    }
    return(
        <div style={styles.container}>
            <h1 style={styles.title}>My applications</h1>

            {applications.length === 0 ? (
                <div style={styles.empty}>
                    <p> You haven't applied to any jobs yet.</p>
                    <Link to='/jobs' style={styles.browseLink}>Browse Jobs</Link>
                </div>
            ) : (
                <div style={styles.list}>
                    {applications.map((app) => (
                        <div key={app.id} style={styles.card}>
                            <div style={styles.cardHeader}>
                                <h3 style={styles.jobTitle}>{app.jobTitle}</h3>
                                <span style={{
                                    ...styles.status,
                                        backgroundColor: getStatusColor(app.status)
                                }}>
                                    {app.status}
                                </span>
                            </div>
                            <p style={styles.company}>{app.companyName}</p>
                            <p style={styles.date}>
                                Applied on: {new Date(app.appliedAt).toLocaleDateString()}
                            </p>
                            {app.coverLetter && (
                                <div style={styles.coverLetter}>
                                    <strong>Cover Letter</strong>
                                    <p>{app.coverLetter}</p>
                                </div>
                            )}
                            {app.employerNotes && (
                                <div style={styles.notes}>
                                    <strong>Employer Notes</strong>
                                    <p>{app.employerNotes}</p>
                                </div>
                            )}
                            <Link to={'/jobs/' + app.jobId} style={styles.viewJob}>
                                View Job →
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
const styles = {
    container: {
        padding: '40px',
        maxWidth: '900px',
        margin: '0 auto'
    },
    title: {
        color: '#2c3e50',
        marginBottom: '30px'
    },
    loading: {
        textAlign: 'center',
        padding: '50px',
        fontSize: '18px'
    },
    empty: {
        textAlign: 'center',
        padding: '50px',
        backgroundColor: 'white',
        borderRadius: '10px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
    },
    browseLink: {
        display: 'inline-block',
        marginTop: '20px',
        padding: '12px 24px',
        backgroundColor: '#3498db',
        color: 'white',
        textDecoration: 'none',
        borderRadius: '5px'
    },
    list: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
    },
    card: {
        backgroundColor: 'white',
        padding: '25px',
        borderRadius: '10px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
    },
    cardHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '10px'
    },
    jobTitle: {
        margin: 0,
        color: '#2c3e50'
    },
    status: {
        color: 'white',
        padding: '5px 15px',
        borderRadius: '20px',
        fontSize: '14px'
    },
    company: {
        color: '#3498db',
        fontWeight: 'bold',
        margin: '0 0 5px 0'
    },
    date: {
        color: '#7f8c8d',
        fontSize: '14px',
        margin: '0 0 15px 0'
    },
    coverLetter: {
        backgroundColor: '#f8f9fa',
        padding: '15px',
        borderRadius: '5px',
        marginBottom: '15px'
    },
    notes: {
        backgroundColor: '#e8f4f8',
        padding: '15px',
        borderRadius: '5px',
        marginBottom: '15px'
    },
    viewJob: {
        color: '#3498db',
        textDecoration: 'none'
    }
};

export default MyApplications;