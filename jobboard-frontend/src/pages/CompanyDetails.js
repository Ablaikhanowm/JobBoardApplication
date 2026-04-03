import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { companiesAPI, jobsAPI } from '../api';

function CompanyDetails(){
    const {id} = useParams();
    const [company,setCompany] = useState(null);
    const [jobs,setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        fetchData();
    }, [id]);

    const fetchData = async()=>{
        try{
            const companyRes = await companiesAPI.getById(id);
            setCompany(companyRes.data);

            const jobsRes = await jobsAPI.getByCompany(id);
            setJobs(jobsRes.data);
        } catch(err){
            console.error('Error fetching data:', err);
        } finally {
            setLoading(false);
        }
    };
    if(loading){
        return <div style={styles.loading}>Loading company...</div>;
    }
    if(!company){
        return <div style={styles.loading}>Company not found</div>;
    }

    return(
        <div style={styles.container}>
            <div style={styles.header}>
                <h1 style={styles.name}>{company.name}</h1>
                <p style={styles.industry}>{company.industry}</p>
                <p style={styles.location}>{company.location}</p>
            </div>
            <div style={styles.section}>
                <h2>About</h2>
                <p style={styles.description}>{company.description}</p>
            </div>
            <div style={styles.section}>
                <h2>Open Positions ({jobs.length})</h2>
                {jobs.length === 0 ? (
                    <p style={styles.noJobs}>No open posiitions at this time.</p>
                ): (
                    <div style={styles.jobsList}>
                        {jobs.map((job)=> (
                            <div key={job.id} style={styles.jobCard}>
                                <h3 style={styles.jobTitle}>{job.title}</h3>
                                <p style={styles.jobLocation}>{job.location}</p>
                                <div style={styles.tags}>
                                    <span style={styles.tag}>{job.jobType}</span>
                                    <span style={styles.tag}>{job.experienceLevel}</span>
                                </div>
                                <p style={styles.salary}>
                                    ${job.salaryMin?.toLocaleString()} - ${job.salaryMax?.toLocaleString()}
                                </p>
                                <Link to={'/jobs/' + job.id} style={styles.viewJob}>
                                    View Job
                                </Link>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <Link to="/companies" style={styles.backButton}>
                Back to Companies
            </Link>
        </div>
    );
}

const styles = {
    container: {
        padding: '40px',
        maxWidth: '900px',
        margin: '0 auto'
    },
    loading: {
        textAlign: 'center',
        padding: '50px',
        fontSize: '18px'
    },
    header: {
        backgroundColor: 'white',
        padding: '40px',
        borderRadius: '10px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        marginBottom: '30px'
    },
    name: {
        margin: '0 0 10px 0',
        color: '#2c3e50',
        fontSize: '36px'
    },
    industry: {
        color: '#3498db',
        fontSize: '20px',
        fontWeight: 'bold',
        margin: '0 0 5px 0'
    },
    location: {
        color: '#7f8c8d',
        fontSize: '18px',
        margin: 0
    },
    section: {
        backgroundColor: 'white',
        padding: '30px',
        borderRadius: '10px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        marginBottom: '30px'
    },
    description: {
        color: '#555',
        lineHeight: '1.6'
    },
    noJobs: {
        color: '#7f8c8d',
        textAlign: 'center',
        padding: '20px'
    },
    jobsList: {
        display: 'flex',
        flexDirection: 'column',
        gap: '15px'
    },
    jobCard: {
        padding: '20px',
        backgroundColor: '#f8f9fa',
        borderRadius: '8px'
    },
    jobTitle: {
        margin: '0 0 10px 0',
        color: '#2c3e50'
    },
    jobLocation: {
        color: '#7f8c8d',
        margin: '0 0 10px 0'
    },
    tags: {
        display: 'flex',
        gap: '10px',
        marginBottom: '10px'
    },
    tag: {
        backgroundColor: '#ecf0f1',
        padding: '5px 10px',
        borderRadius: '3px',
        fontSize: '12px',
        color: '#2c3e50'
    },
    salary: {
        color: '#27ae60',
        fontWeight: 'bold',
        marginBottom: '15px'
    },
    viewJob: {
        color: '#3498db',
        textDecoration: 'none'
    },
    backButton: {
        display: 'inline-block',
        padding: '10px 20px',
        color: '#3498db',
        textDecoration: 'none',
        border: '1px solid #3498db',
        borderRadius: '5px'
    }
};

export default CompanyDetails;