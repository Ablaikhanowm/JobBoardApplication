import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { companiesAPI } from '../api';

function CreateCompany(){
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error,setError] = useState('');
    const [formData,setFormData] = useState({
        name: '',
        description: '',
        industry: '',
        location: '',
        website:''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) =>{
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await companiesAPI.create(formData);
            navigate('/employer/dashboard');
        } catch(err){
            setError(err.response?.data?.message || 'Failed To Create Company');
        } finally{
            setLoading(false);
        }
    };

    return(
        <div style={styles.container}>
            <form onSubmit={handleSubmit} style={styles.form}>
                <h2 style={styles.title}>Create Company</h2>
                {error && <p style={styles.error}>{error}</p>}

                <div style={styles.field}>
                    <label>Company Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        style={styles.input}
                        />
                </div>
                <div style={styles.field}>
                    <label>Industry</label>
                    <input
                        type="text"
                        name="industry"
                        value={formData.industry}
                        onChange={handleChange}
                        required
                        placeholder="e.g. Technology, Finance, Healthcare"
                        style={styles.input}
                    />
                </div>

                <div style={styles.field}>
                    <label>Location Name</label>
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
                <div style={styles.field}>
                    <label>Website</label>
                    <input
                        type="url"
                        name="website"
                        value={formData.website}
                        onChange={handleChange}
                        placeholder="https://example.com"
                        style={styles.input}
                    />
                </div>
                <div style={styles.field}>
                    <label>Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        rows={4}
                        placeholder="Tell us about your company..."
                        style={styles.input}
                    />
                </div>
                <button type="submit" disabled={loading} style={styles.button}>
                    {loading ? "Creating..." : "Create company"}
                </button>
            </form>
        </div>
    );
}

const styles = {
    container: {
        padding: '40px',
        maxWidth: '600px',
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
        marginBottom: '20px'
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
        backgroundColor: '#27ae60',
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

export default CreateCompany;
