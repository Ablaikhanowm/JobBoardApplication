import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { companiesAPI, jobsAPI, applicationsAPI } from '../api';

function EmployerDashboard() {
    const [companies, setCompanies] = useState([]);
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('companies');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const companiesRes = await companiesAPI.getMine();
            setCompanies(companiesRes.data);

            const appsRes = await applicationsAPI.getForEmployer();
            setApplications(appsRes.data);
        } catch (err) {
            console.error('Error fetching data:', err);
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (applicationId, status) => {
        try {
            await applicationsAPI.updateStatus(applicationId, { status: status });
            fetchData();
        } catch (err) {
            console.error('Error updating status:', err);
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'PENDING': return '#f39c12';
            case 'REVIEWED': return '#3498db';
            case 'SHORTLISTED': return '#9b59b6';
            case 'ACCEPTED': return '#27ae60';
            case 'REJECTED': return '#e74c3c';
            default: return '#95a5a6';
        }
    };

    if (loading) {
        return <div style={styles.loading}>Loading dashboard...</div>;
    }

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Employer Dashboard</h1>

            <div style={styles.tabs}>
                <button
                    style={activeTab === 'companies' ? styles.activeTab : styles.tab}
                    onClick={() => setActiveTab('companies')}
                >
                    My Companies ({companies.length})
                </button>
                <button
                    style={activeTab === 'applications' ? styles.activeTab : styles.tab}
                    onClick={() => setActiveTab('applications')}
                >
                    Applications ({applications.length})
                </button>
            </div>

            {activeTab === 'companies' && (
                <div style={styles.section}>
                    <div style={styles.sectionHeader}>
                        <h2>My Companies</h2>
                        <Link to="/create-company" style={styles.createButton}>
                            + Create Company
                        </Link>
                    </div>

                    {companies.length === 0 ? (
                        <p style={styles.empty}>You haven't created any companies yet.</p>
                    ) : (
                        <div style={styles.grid}>
                            {companies.map((company) => (
                                <div key={company.id} style={styles.card}>
                                    <h3 style={styles.cardTitle}>{company.name}</h3>
                                    <p style={styles.cardText}>{company.industry}</p>
                                    <p style={styles.cardText}>{company.location}</p>
                                    <Link to={'/create-job/' + company.id} style={styles.postJobButton}>
                                        Post a Job
                                    </Link>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {activeTab === 'applications' && (
                <div style={styles.section}>
                    <h2>Job Applications</h2>

                    {applications.length === 0 ? (
                        <p style={styles.empty}>No applications yet.</p>
                    ) : (
                        <div style={styles.applicationsList}>
                            {applications.map((app) => (
                                <div key={app.id} style={styles.applicationCard}>
                                    <div style={styles.applicationHeader}>
                                        <div>
                                            <h3 style={styles.applicantName}>{app.applicantName}</h3>
                                            <p style={styles.applicantEmail}>{app.applicantEmail}</p>
                                        </div>
                                        <span style={{
                                            ...styles.status,
                                            backgroundColor: getStatusColor(app.status)
                                        }}>
                                            {app.status}
                                        </span>
                                    </div>

                                    <div style={styles.jobInfo}>
                                        <strong>Applied for:</strong> {app.jobTitle} at {app.companyName}
                                    </div>

                                    <div style={styles.appliedDate}>
                                        Applied: {new Date(app.appliedAt).toLocaleDateString()}
                                    </div>

                                    {app.coverLetter && (
                                        <div style={styles.coverLetter}>
                                            <strong>Cover Letter:</strong>
                                            <p>{app.coverLetter}</p>
                                        </div>
                                    )}

                                    <div style={styles.actions}>
                                        <button
                                            onClick={() => updateStatus(app.id, 'REVIEWED')}
                                            style={styles.reviewButton}
                                        >
                                            Mark Reviewed
                                        </button>
                                        <button
                                            onClick={() => updateStatus(app.id, 'SHORTLISTED')}
                                            style={styles.shortlistButton}
                                        >
                                            Shortlist
                                        </button>
                                        <button
                                            onClick={() => updateStatus(app.id, 'ACCEPTED')}
                                            style={styles.acceptButton}
                                        >
                                            Accept
                                        </button>
                                        <button
                                            onClick={() => updateStatus(app.id, 'REJECTED')}
                                            style={styles.rejectButton}
                                        >
                                            Reject
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

const styles = {
    container: {
        padding: '40px',
        maxWidth: '1200px',
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
    tabs: {
        display: 'flex',
        gap: '10px',
        marginBottom: '30px'
    },
    tab: {
        padding: '12px 24px',
        border: '1px solid #ddd',
        backgroundColor: 'white',
        cursor: 'pointer',
        borderRadius: '5px',
        fontSize: '16px'
    },
    activeTab: {
        padding: '12px 24px',
        border: '1px solid #3498db',
        backgroundColor: '#3498db',
        color: 'white',
        cursor: 'pointer',
        borderRadius: '5px',
        fontSize: '16px'
    },
    section: {
        marginTop: '20px'
    },
    sectionHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px'
    },
    createButton: {
        padding: '10px 20px',
        backgroundColor: '#27ae60',
        color: 'white',
        textDecoration: 'none',
        borderRadius: '5px'
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '20px'
    },
    card: {
        backgroundColor: 'white',
        padding: '25px',
        borderRadius: '10px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
    },
    cardTitle: {
        margin: '0 0 10px 0',
        color: '#2c3e50'
    },
    cardText: {
        margin: '5px 0',
        color: '#7f8c8d'
    },
    postJobButton: {
        display: 'inline-block',
        marginTop: '15px',
        padding: '8px 16px',
        backgroundColor: '#3498db',
        color: 'white',
        textDecoration: 'none',
        borderRadius: '5px'
    },
    empty: {
        textAlign: 'center',
        color: '#7f8c8d',
        padding: '40px'
    },
    applicationsList: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
    },
    applicationCard: {
        backgroundColor: 'white',
        padding: '25px',
        borderRadius: '10px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
    },
    applicationHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: '15px'
    },
    applicantName: {
        margin: '0 0 5px 0',
        color: '#2c3e50'
    },
    applicantEmail: {
        margin: 0,
        color: '#7f8c8d'
    },
    status: {
        padding: '5px 15px',
        borderRadius: '20px',
        color: 'white',
        fontSize: '14px'
    },
    jobInfo: {
        marginBottom: '10px',
        color: '#2c3e50'
    },
    appliedDate: {
        color: '#7f8c8d',
        fontSize: '14px',
        marginBottom: '15px'
    },
    coverLetter: {
        backgroundColor: '#f8f9fa',
        padding: '15px',
        borderRadius: '5px',
        marginBottom: '15px'
    },
    actions: {
        display: 'flex',
        gap: '10px',
        flexWrap: 'wrap'
    },
    reviewButton: {
        padding: '8px 16px',
        backgroundColor: '#3498db',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer'
    },
    shortlistButton: {
        padding: '8px 16px',
        backgroundColor: '#9b59b6',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer'
    },
    acceptButton: {
        padding: '8px 16px',
        backgroundColor: '#27ae60',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer'
    },
    rejectButton: {
        padding: '8px 16px',
        backgroundColor: '#e74c3c',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer'
    }
};

export default EmployerDashboard;