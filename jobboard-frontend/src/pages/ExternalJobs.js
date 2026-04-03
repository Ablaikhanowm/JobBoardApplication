import React, {useState} from 'react';
import {externalJobsAPI} from '../api'

function ExternalJobs(){
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] =   useState(false);
    const [searched,setSearched] = useState(false);
    const [filters, setFilters] = useState({
        keyword:'',
        location:''
    });
    const [currentPage, setCurrentPage] = useState(1);

    const handleFilterChange = (e)=>{
        setFilters({ ...filters, [e.target.name]: e.target.value});
    };
    const handleSearch = async (e) =>{
        e.preventDefault();
        setLoading(true);
        setSearched(true);

        try{
            const response = await externalJobsAPI.search(
                filters.keyword,
                filters.location,
                currentPage
            );
            setJobs(response.data.results || []);
        } catch (err) {
            console.error('Error fetching external jobs: ', err);
            setJobs([]);
        } finally {
            setLoading(false);
        }
    };

    const loadMore = async() =>{
        const nextPage = currentPage - 1;
        setCurrentPage(nextPage);
        setLoading(true);
        try{
            const response=await externalJobsAPI.search(
                filters.keyword,
                filters.location,
                nextPage
            );
            setJobs([...jobs, ...(response.data.results || [])]);
        } catch(err){
            console.error('Error loading more jobs:', err);
        } finally{
            setLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>External Job Listings</h1>
            <p style={styles.subtitle}>Real jobs from Adzuna - thousands of opportunities worldwide</p>

            <form onSubmit={handleSearch} style={styles.searchForm}>
                <input
                    type="text"
                    name="keyword"
                    value={filters.keyword}
                    onChange={handleFilterChange}
                    placeholder="Job title or keyword (e.g. Developer)"
                    style={styles.input}
                />
                <input
                    type="text"
                    name="location"
                    value={filters.location}
                    onChange={handleFilterChange}
                    placeholder="Locaiton (e.g. Prague)"
                    style={styles.input}
                />
                <button type="submit" style={styles.searchButton}>
                    Search Jobs
                </button>
            </form>

            {loading && <p style={styles.loading}>Loading jobs...</p>}
            {!loading && searched && jobs.length === 0 && (
                <p style={styles.noJobs}>No Jobs Found. Try different keywords.</p>
                )}
            <div style={styles.jobList}>
                {jobs.map((job,index) =>(
                    <div key={index} style={styles.jobCard}>
                        <div style={styles.jobHeader}>
                            <h3 style={styles.jobTitle}>{job.title}</h3>
                            {job.salary_min && job.salary_max && (
                                <span style={styles.salary}>
                                    ${job.salary_min.toLocaleString()} - ${job.salary_max.toLocaleString()}
                                </span>
                            )}
                        </div>
                        <p style={styles.company}>{job.company?.display_name}</p>
                        <p style={styles.location}>{job.location?.display_name}</p>
                        <p style={styles.description}>{job.description?.substring(0,200)}...</p>
                        <div style={styles.cardFooter}>
                            <span style={styles.date}>
                                Posted: {new Date(job.created).toLocaleString()}
                            </span>
                            <a
                            href={job.redirect_url}
                            target="_blank"
                            rel="nooopener noreferrer"
                            style={styles.applyButton}
                            >
                                Apply on Adzuna
                            </a>
                        </div>
                    </div>
                ))}
            </div>
            {jobs.length === 0 &&(
                <div style={styles.loadMoreContainer}>
                    <button onClick={loadMore} style={styles.loadMoreButton} disabled={loading}>
                        {loading ? 'Loading...' : 'Load More Jobs'}
                    </button>
                </div>
            )}
        </div>
    );
}
const styles = {
    container: {
        padding: '40px',
        maxWidth: '1000px',
        margin: '0 auto'
    },
    title: {
        textAlign: 'center',
        marginBottom: '10px',
        color: '#2c3e50'
    },
    subtitle: {
        textAlign: 'center',
        color: '#7f8c8d',
        marginBottom: '30px'
    },
    searchForm: {
        display: 'flex',
        gap: '15px',
        marginBottom: '30px',
        flexWrap: 'wrap'
    },
    input: {
        flex: 1,
        minWidth: '200px',
        padding: '15px',
        border: '1px solid #ddd',
        borderRadius: '5px',
        fontSize: '16px'
    },
    searchButton: {
        padding: '15px 30px',
        backgroundColor: '#3498db',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        fontSize: '16px',
        cursor: 'pointer'
    },
    loading: {
        textAlign: 'center',
        color: '#7f8c8d',
        padding: '20px'
    },
    noJobs: {
        textAlign: 'center',
        color: '#7f8c8d',
        padding: '40px'
    },
    jobList: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
    },
    jobCard: {
        backgroundColor: 'white',
        padding: '25px',
        borderRadius: '10px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
    },
    jobHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: '10px',
        flexWrap: 'wrap',
        gap: '10px'
    },
    jobTitle: {
        margin: 0,
        color: '#2c3e50',
        fontSize: '20px'
    },
    salary: {
        color: '#27ae60',
        fontWeight: 'bold'
    },
    company: {
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
        lineHeight: '1.6',
        marginBottom: '15px'
    },
    cardFooter: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '10px'
    },
    date: {
        color: '#95a5a6',
        fontSize: '14px'
    },
    applyButton: {
        padding: '10px 20px',
        backgroundColor: '#27ae60',
        color: 'white',
        textDecoration: 'none',
        borderRadius: '5px'
    },
    loadMoreContainer: {
        textAlign: 'center',
        marginTop: '30px'
    },
    loadMoreButton: {
        padding: '15px 40px',
        backgroundColor: '#3498db',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        fontSize: '16px',
        cursor: 'pointer'
    }
};

export default ExternalJobs;