import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { jobsAPI, companiesAPI } from '../api';

function CreateJob(){
    const navigate = useNavigate();
    const params = useParams();
    const companyId = params.companyId || '';
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [companies, setCompanies] = useState([]);
    const [formData, setFormData] = useState({
        companyId: companyId || '',
        title: '',
        description: '',
        requirements: '',
        salaryMin:'',
        salaryMax:'',
        location:'',
        jobType:'FULL_TIME',
        experienceLevel: 'MID'
    });

    useEffect(()=>{
        fetchCompanies();
    }, []);

    const fetchCompanies = async () => {
        try {
            const response = await companiesAPI.getMine();
            setCompanies(response.data);
            if (companyId) {
                setFormData(prev => ({ ...prev, companyId: companyId }));
            }
        } catch (err) {
            console.error('Error fetching companies:', err);
        }
    };

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try{
            const jobData = {
                ...formData,
                companyId: parseInt(formData.companyId),
                salaryMin: parseInt(formData.salaryMin),
                salaryMax: parseInt(formData.salaryMax)
            };
            await jobsAPI.create(jobData);
            navigate('/employer/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to create job');
        } finally{
            setLoading(false);
        }
    };

    return(
        <div style={styles.container}>
            <form onSubmit={handleSubmit} style={styles.form}>
                <h2 style={styles.title}>Post a Job</h2>

                {error && <p style={styles.error}>{error}</p>}

                <div style={styles.field}>
                    <label>Company *</label>
                    <select
                        name="companyId"
                        value={formData.companyId}
                        onChange={handleChange}
                        required
                        style={styles.input}
                        >
                        <option value=""> Select a company</option>
                        {companies.map((company)=> (
                            <option key={company.id} value={company.id}>
                                {company.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div style={styles.field}>
                    <label> Job Title *</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.value}
                        onChange={handleChange}
                        required
                        placeholder="e.g. Software Developer"
                        style={styles.input}
                        />
                </div>
                <div style={styles.field}>
                    <label> Location *</label>
                    <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        required
                        placeholder="e.g. New York, NY"
                        style={styles.input}
                        />
                </div>

                <div styles={styles.row}>
                    <div style={styles.field}>
                        <label>Job Type *</label>
                        <select
                            name="jobType"
                            value={formData.jobType}
                            onChange={handleChange}
                            style={styles.input}
                            >
                            <option value="FULL_TIME">Full Time</option>
                            <option value="PART_TIME">Part Time</option>
                            <option value="CONTRACT">Contract</option>
                            <option value="INTERNSHIP">Internship</option>
                            <option value="REMOTE">Remote</option>
                        </select>
                    </div>

                    <div style={styles.field}>
                        <label>Experience Level*</label>
                        <select
                            name="experienceLevel"
                            value={formData.experienceLevel}
                            onChange={handleChange}
                            style={styles.input}
                        >
                            <option value="ENTRY">Entry Level</option>
                            <option value="MID">Mid Level</option>
                            <option value="SENIOR">Senior Level</option>
                            <option value="LEAD">Lead</option>
                            <option value="EXECUTIVE">Executive</option>
                        </select>
                    </div>
                </div>

                <div styles={styles.row}>
                    <div style={styles.field}>
                        <label>Minimum Salary *</label>
                        <input
                            type="number"
                            name="salaryMin"
                            value={formData.salaryMin}
                            onChange={handleChange}
                            required
                            placeholder={50000}
                            style={styles.input}
                            />
                    </div>
                    <div style={styles.field}>
                        <label>Maximum Salary *</label>
                        <input
                            type="number"
                            name="salaryMax"
                            value={formData.salaryMax}
                            onChange={handleChange}
                            required
                            placeholder={80000}
                            style={styles.input}
                        />
                    </div>
                </div>

                <div style={styles.field}>
                    <label>Job Description *</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        rows={4}
                        placeholder="Describe the role..."
                        style={styles.textarea}
                    />
                </div>

                <div style={styles.field}>
                    <label>Requirement *</label>
                    <textarea
                        name="requirements"
                        value={formData.requirements}
                        onChange={handleChange}
                        required
                        rows={4}
                        placeholder="List the requirements"
                        style={styles.textarea}
                    />
                </div>

                <button type="submit" disabled={loading} style={styles.button}>
                    {loading ? 'Posting...' : 'Post Job'}
                </button>
            </form>
        </div>
    );
}

const styles = {
    container: {
        padding: '40px',
        maxWidth: '700px',
        margin: '0 auto'
    },
    form: {
        backgroundColor: 'white',
        padding: '40px',
        borderRadius: '10px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
    },
    title: {
        textAlign: 'center',
        marginBottom: '30px',
        color: '#2c3e50'
    },
    field: {
        marginBottom: '20px',
        flex: 1
    },
    row: {
        display: 'flex',
        gap: '20px'
    },
    input: {
        width: '100%',
        padding: '12px',
        border: '1px solid #ddd',
        borderRadius: '5px',
        fontSize: '16px',
        marginTop: '5px',
        boxSizing: 'border-box'
    },
    textarea: {
        width: '100%',
        padding: '12px',
        border: '1px solid #ddd',
        borderRadius: '5px',
        fontSize: '16px',
        marginTop: '5px',
        boxSizing: 'border-box'
    },
    button: {
        width: '100%',
        padding: '12px',
        backgroundColor: '#3498db',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        fontSize: '16px',
        cursor: 'pointer'
    },
    error: {
        color: '#e74c3c',
        textAlign: 'center',
        marginBottom: '20px'
    }
};

export default CreateJob;