import React, {useState, useEffect} from 'react';
import {profileAPI} from '../api';

function Profile(){
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        headline: '',
        summary:'',
        skills: '',
        experinceLevel:'',
        phone:'',
        location:'',
        linkedinUrl:'',
        portfolioUrl:''
    });

    useEffect(()=>{
        fetchProfile();
    },[]);
    const fetchProfile = async()=>{
        try{
            const response = await profileAPI.get();
            const profile = response.data
            setFormData({
                headline: profile.headline ||'',
                summary: profile.summary ||'',
                skills: profile.skills ||'',
                experienceLevel: profile.experienceLevel ||'',
                phone: profile.phone ||'',
                location: profile.location ||'',
                linkedinUrl: profile.linkedinUrl ||'',
                portfolioUrl: profile.portfolioUrl ||'',
            });
        } catch(err){
            console.log('No Profile yet');
        } finally{
            setLoading(false);
        }
    };

    const handleChange = (e) =>{
        setFormData({ ...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) =>{
        e.preventDefault();
        setSaving(true);
        setError('');
        setMessage('');

        try{
            const dataToSend={
                ...formData,
                experienceYears: formData.experinceYears ? parseInt(formData.experinceYears) : null
            };
            await profileAPI.update(dataToSend);
            setMessage('Profile saved succesfully!');
        } catch(err){
            setError(err.response?.data?.message || 'Failed to save profile');
        } finally{
            setSaving(false);
        }
    };

    if(loading){
        return <div style={styles.loading}>Loading profile...</div>;
    }

    return(
        <div style={styles.container}>
            <form onSubmit={handleSubmit} style={styles.form}>
                <h2 style={styles.title}>My profile</h2>

                {message && <p style={styles.success}>{message}</p>}
                {error && <p style={styles.error}>{error}</p>}

                <div style={styles.field}>
                    <label>Professional Headline</label>
                    <input
                        type="text"
                        name="headline"
                        value={formData.headline}
                        onChange={handleChange}
                        placeholder="e.g. Senior Software Developer"
                        style={styles.input}
                        />
                </div>

                <div style={styles.field}>
                    <label>Summary</label>
                    <textarea
                        name="summary"
                        value={formData.summary}
                        onChange={handleChange}
                        placeholder="Tell employers about yourself..."
                        rows={4}
                        style={styles.textarea}
                    />
                </div>

                <div style={styles.field}>
                    <label>Skills</label>
                    <input
                        type="text"
                        name="skills"
                        value={formData.skills}
                        onChange={handleChange}
                        placeholder="e.g. Java, React, SQL, Python"
                        style={styles.input}
                    />
                </div>

                <div style={styles.row}>
                    <div style={styles.field}>
                        <label>Years Of Experience</label>
                        <input
                            type="number"
                            name="experienceYears"
                            value={formData.experinceYears}
                            onChange={handleChange}
                            placeholder="e.g. 5 years"
                            style={styles.input}
                        />
                    </div>

                    <div style={styles.field}>
                        <label>Location</label>
                        <input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            placeholder="e.g. New York, NY"
                            style={styles.input}
                        />
                    </div>
                </div>

                <div style={styles.field}>
                    <label>Phone</label>
                    <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="e.g. +1 234 567 8900"
                        style={styles.input}
                    />
                </div>

                <div style={styles.field}>
                    <label>Linkedin URL</label>
                    <input
                        type="url"
                        name="linkedinUrl"
                        value={formData.linkedinUrl}
                        onChange={handleChange}
                        placeholder="https://linkedin.com/in/yourprofile"
                        style={styles.input}
                    />
                </div>

                <div style={styles.field}>
                    <label>Portfolio URL</label>
                    <input
                        type="url"
                        name="portfolioUrl"
                        value={formData.portfolioUrl}
                        onChange={handleChange}
                        placeholder="https://yourportfolio.com"
                        style={styles.input}
                    />
                </div>

                <button type="submit" disabled={saving} style={styles.button}>
                    {saving ? 'Saving...' : 'Save Profile'}
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
    loading: {
        textAlign: 'center',
        padding: '50px',
        fontSize: '18px'
    },
    success: {
        color: '#27ae60',
        textAlign: 'center',
        marginBottom: '20px',
        padding: '10px',
        backgroundColor: '#d4edda',
        borderRadius: '5px'
    },
    error: {
        color: '#e74c3c',
        textAlign: 'center',
        marginBottom: '20px',
        padding: '10px',
        backgroundColor: '#f8d7da',
        borderRadius: '5px'
    }
};
 export default Profile;