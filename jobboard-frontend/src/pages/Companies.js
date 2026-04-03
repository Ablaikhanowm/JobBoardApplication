import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { companiesAPI } from '../api';

function Companies(){
    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        fetchCompanies();
    }, []);

    const fetchCompanies = async ()=>{
        try{
            const response = await companiesAPI.getAll();
            setCompanies(response.data);
        } catch(err){
            console.error('Error fetching companies', err);
        } finally {
            setLoading(false);
        }
    };

    if(loading){
        return <div style={styles.loading}>Loading companies...</div>;
    }

    return(
        <div style={styles.container}>
            <h1 style={styles.title}>Companies</h1>

            {companies.length === 0 ? (
                <p style={styles.empty}>No Companies Found</p>
            ):(
                <div style={styles.grid}>
                    {companies.map((company)=>(
                        <div key={company.id} style={styles.card}>
                            <h3 style={styles.companyName}>{company.name}</h3>
                            <p style={styles.industry}>{company.industry}</p>
                            <p style={styles.location}>{company.location}</p>
                            <p style={styles.description}>{company.description}</p>
                            <Link to={'/companies/' +  company.id} style={styles.viewButton}>
                                View Company
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
        maxWidth: '1200px',
        margin: '0 auto'
    },
    title: {
        color: '#2c3e50',
        marginBottom: '30px',
        textAlign: 'center'
    },
    loading: {
        textAlign: 'center',
        padding: '50px',
        fontSize: '18px'
    },
    empty: {
        textAlign: 'center',
        color: '#7f8c8d'
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
    companyName: {
        margin: '0 0 10px 0',
        color: '#2c3e50',
        fontSize: '22px'
    },
    industry: {
        color: '#3498db',
        fontWeight: 'bold',
        margin: '0 0 5px 0'
    },
    location: {
        color: '#7f8c8d',
        margin: '0 0 15px 0'
    },
    description: {
        color: '#555',
        marginBottom: '20px'
    },
    viewButton: {
        display: 'inline-block',
        padding: '10px 20px',
        backgroundColor: '#3498db',
        color: 'white',
        textDecoration: 'none',
        borderRadius: '5px'
    }
};

export default Companies;