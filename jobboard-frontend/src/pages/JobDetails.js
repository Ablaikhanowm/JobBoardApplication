import React, {useState, useEffect} from 'react';
import {useParams, useNavigate, Link} from 'react-router-dom';
import {jobsAPI, applicationsAPI} from '../api';

function JobDetails({ user}){
    const {id} = useParams();
    const navigate = useNavigate();
    const [job, setJob] = useState(null);
    const [loading,setLoading] = useState(true);
    const [applying, setApplying] = useState(false);
    const[applied, setApplied] = useState(false);
    const [coverLetter, setCoverLetter] = useState('');
    const[showApplyForm, setShowApplyForm] = useState(false);
    const [error, setError] = useState('');

    useEffect(()=> {
        fetchJob();
    }, [id]);

    const fetchJob = async() => {
        try {
            const response = await jobsAPI.getById(id);
            setJob(response.data);
        } catch(error){
            console.error('Error fetching jobs:', error);
        } finally{
            setLoading(false);
        }
    };

    const handleApply = async(e) => {
        e.preventDefault();
        setApplying(true);
        setError('');

        try{
            await applicationsAPI.apply({
                jobId: parseInt(id),
                coverLetter: coverLetter
            });
            setApplied(true);
            setShowApplyForm(false);
        } catch(err) {
            setError(err.response?.data?.message || 'Failed To Apply');
        } finally{
            setApplying(false);
        }
    };

    if(loading) {
        return <div style={styles.loading}>Loading job details...</div>;
    }
    if(!job){
        return <div style={styles.loading}>Job not found</div>;
    }

    return(
        <div style={styles.container}>
            <div style={styles.card}>
                <div style={styles.header}>
                    <h1 style={styles.title}>{job.title}</h1>
                    <p style={styles.company}>{job.companyName}</p>
                    <p style={styles.location}>{job.location}</p>
                </div>

                <div style={styles.tags}>
                    <span style={styles.tag}>{job.jobType}</span>
                    <span style={styles.tag}>{job.experienceLevel}</span>
                    <span style={styles.tag}>{job.status}</span>
                </div>
                <div styles={styles.salary}>
                    ${job.salaryMin?.toLocaleString()} - ${job.salaryMax?.toLocaleString()} per year
                </div>

                <div style={styles.section}>
                     <h3>Description</h3>
                    <p>{job.description}</p>
            </div>

            <div style={styles.section}>
                <h3>Requirements</h3>
                <p>{job.requirements}</p>
            </div>
            {user && user.role === 'JOB_SEEKER' && !applied &&(
                <div style={styles.applySection}>
                    {!showApplyForm ? (
                        <button
                            onClick={() => setShowApplyForm(true)}
                            style={styles.applyButton}
                        >
                            Apply Now
                        </button>
                    ) : (
                        <form onSubmit={handleApply} style={styles.form}>
                            <h3>Apply for this position</h3>
                            {error && <p style={styles.error}>{error}</p>}
                            <textarea
                                placeholder = "Write a cover letter..."
                                value={coverLetter}
                                onChange={(e)=> setCoverLetter(e.target.value)}
                                style={styles.textarea}
                                rows={6}
                                />
                            <div style={styles.formButtons}>
                                <button
                                    type= "submit"
                                    disabled={applying}
                                    style={styles.submitButton}
                                    >
                                    {applying ? "Submitting ..." : "Submit Application"}
                                </button>
                                <button
                                    type= "button"
                                    onClick={() => setShowApplyForm(false)}
                                    style={styles.cancelButton}
                                    >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            )}

            {applied && (
                <div styles={styles.successMessage}>
                    ✓ Application submitted succesfully!
                </div>
            )}

            {!user && (
                <div style={styles.loginPrompt}>
                    <p> Please <a href="/login"> login</a> as a job seeker to apply for this position.</p>
                </div>
            )}
                <button onClick={()=> navigate('/jobs')} style={styles.backButton}>
                    ← Back to Jobs
                </button>
        </div>
        </div>
    );
}

const styles={
    container:{
        padding:'40px',
        maxWidth:'800px',
        margin:'0 auto'
    },
    card:{
        backgroundColor:'white',
        padding:'40px',
        borderRadius:'10px',
        boxShadow:'0 2px 10px rgba(0,0,0,0,1)'
    },
    header:{
        marginBottom:'20px'
    },
    title:{
        margin:'0 0 10px 0',
        color:"#2c3e50",
        fontsize:'32px'
    },
    company:{
        color:'#3498bx',
        fontSize:'20px',
        fontWeight:'bold',
        margin:'0 0 5px 0'
    },
    location: {
        color: '#7f8c8d',
        fontSize: '16px',
        margin: 0
    },
    tags:{
        display: 'flex',
        gap:'10px',
        marginBottom:'20px'
    },
    tag:{
        backgroundColor:'#ecf0f1',
        padding:'8px 16px',
        borderRadius:'5px',
        fontSize:'14px',
        color:'#2c3e50'
    },
    salary:{
        fontSize:'24px',
        color:'#27ae60',
        fontWeight: 'bold',
        marginBottom:'30px'
    },
    section:{
        marginBottom:'25px'
    },
    applySection:{
        marginTop:'30px',
        paddingTop:'30px',
        borderTop:'1px solid #ecf0f1'
    },
    applyButton:{
        backgroundColor:'#27ae60',
        color:'white',
        padding:'15px 40px',
        border:'none',
        borderRadius:'5px',
        fontSize:'18px',
        cursor:'pointer'
        },
    form:{
        marginTop:'20px'
    },
    textarea:{
        width:'100%',
        padding:'15px',
        border:'1px solid #ddd',
        borderRadius:'5px',
        fontSize:'16px',
        marginTop:'10px',
        boxSizing:'border-box'
    },
    formButtons:{
        display:'flex',
        gap:'10px',
        marginTop:'15px'
    },
    submitButton: {
        backgroundColor: '#27ae60',
        color: 'white',
        padding: '12px 30px',
        border: 'none',
        borderRadius: '5px',
        fontSize: '16px',
        cursor: 'pointer'
    },
    cancelButton: {
        backgroundColor: '#95a5a6',
        color: 'white',
        padding: '12px 30px',
        border: 'none',
        borderRadius: '5px',
        fontSize: '16px',
        cursor: 'pointer'
    },
    successMessage: {
        backgroundColor: '#d4edda',
        color: '#155724',
        padding: '20px',
        borderRadius: '5px',
        marginTop: '30px',
        textAlign: 'center',
        fontSize: '18px'
    },
    error: {
        color: '#e74c3c',
        marginBottom: '10px'
    },
    loginPrompt: {
        marginTop: '30px',
        padding: '20px',
        backgroundColor: '#f8f9fa',
        borderRadius: '5px',
        textAlign: 'center'
    },
    successMessage: {
        backgroundColor: '#d4edda',
        color: '#155724',
        padding: '20px',
        borderRadius: '5px',
        marginTop: '30px',
        textAlign: 'center',
        fontSize: '18px'
    },
    error: {
        color: '#e74c3c',
        marginBottom: '10px'
    },
    loginPrompt: {
        marginTop: '30px',
        padding: '20px',
        backgroundColor: '#f8f9fa',
        borderRadius: '5px',
        textAlign: 'center'
    },
    backButton: {
        marginTop: '30px',
        padding: '10px 20px',
        backgroundColor: 'transparent',
        color: '#3498db',
        border: '1px solid #3498db',
        borderRadius: '5px',
        cursor: 'pointer'
    },
    loading: {
        textAlign: 'center',
        padding: '50px',
        fontSize: '18px'
    }
};

export default JobDetails;
