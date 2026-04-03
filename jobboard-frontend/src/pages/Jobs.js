import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { jobsAPI } from '../api';

function Jobs() {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        keyword: '',
        location:'',
        jobType:'',
        experienceLevel:''
    });
    const [currentPage, setCurrentPage] = useState(1);
    const jobsPerPage = 5;

    useEffect(() => {
        fetchJobs();
    }, []);

    const fetchJobs = async () => {
        try {
            const response = await jobsAPI.getAll();
            setJobs(response.data);
        } catch (error) {
            console.error('Error fetching jobs:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleFilterChange=(e) => {
        setFilters({...filters, [e.target.name]: e.target.value});
    };
    const handleSearch = async (e)=> {
        e.preventDefault();
        setLoading(true);
        try{
            const params = {};
            if(filters.keyword) params.keyword = filters.keyword;
            if(filters.location) params.location = filters.location;
            if(filters.jobType) params.jobType = filters.jobType;
            if(filters.experienceLevel) params.experienceLevel = filters.experienceLevel;

            const response = await jobsAPI.search(params);
            setJobs(response.data);
        } catch(error){
            console.error('Error searching jobs: ', error);
        } finally {
            setLoading(false);
        }
    };

    const clearFiters=()=>{
        setFilters({
            keyword:'',
            location:'',
            jobType:'',
            experienceLevel: ''
        });
        fetchJobs();
    };
    if(loading){
        return <div style={styles.loading}>Loading</div>;
    }

    const indexOfLastJob = currentPage * jobsPerPage;
    const indexOfFirstJob = indexOfLastJob - jobsPerPage;
    const currentJobs= jobs.slice(indexOfFirstJob, indexOfLastJob);
    const totalPages= Math.ceil(jobs.length/jobsPerPage);

    const goToPage=(page)=>{
        setCurrentPage(page);
        window.scrollTo(0,0);
    };
    return(
        <div style={styles.container}>
            <h1 style={styles.title}>Find Your Dream Job</h1>
            <form onSubmit={handleSearch} style={styles.filterForm}>
                <div style={styles.filterRow}>
                    <input
                        type="text"
                        name="keyword"
                        value={filters.keyword}
                        onChange={handleFilterChange}
                        placeholder="Job title or keyword"
                        style={styles.filterInput}
                        />
                    <input
                        type="text"
                        name="location"
                        value={filters.location}
                        onChange={handleFilterChange}
                        placeholder="Location"
                        style={styles.filterInput}
                    />
                    <select
                        name="jobType"
                        value={filters.JobType}
                        onChange={handleFilterChange}
                        style={styles.filterSelect}
                    >
                        <option value="">All Job Types</option>
                        <option value="FULL_TIME">Full Time</option>
                        <option value="PART_TIME">Part Time</option>
                        <option value="CONTRACT">Contract</option>
                        <option value="INTERNSHIP">Internship</option>
                        <option value="REMOTE">Remote</option>
                    </select>

                    <select
                        name="experienceLevel"
                        value={filters.experienceLevel}
                        onChange={handleFilterChange}
                        style={styles.filterSelect}
                    >
                        <option value="">All Experience Levels</option>
                        <option value="ENTRY">Entry Level</option>
                        <option value="MID">Mid Level</option>
                        <option value="SENIOR">Senior</option>
                        <option value="LEAD">Lead</option>
                        <option value="EXECUTIVE">Executive</option>
                    </select>
                </div>
                <div style={styles.filterButtons}>
                    <button type="submit" style={styles.searchButton}>Search</button>
                    <button type="button" onClick={clearFiters} style={styles.clearButton}>Clear</button>
                </div>
            </form>

            <p style={styles.resultCount}>{jobs.length} jobs found</p>

            <div style={styles.jobList}>
                {jobs.length===0 ? (
                    <p style={styles.noJobs}>No Jobs Found. Try different filters.</p>
                ) : (
                    currentJobs.map((job) =>(
                        <div key={job.id} style={styles.jobCard}>
                            <div style={styles.jobHeader}>
                                <div>
                                    <h3 style={styles.jobTitle}>{job.title}</h3>
                                    <p style={styles.company}>{job.companyName}</p>
                                </div>
                                <div style={styles.salary}>
                                    ${job.salaryMin?.toLocaleString()} - ${job.salaryMax.toLocaleString()}
                                </div>
                            </div>
                            <p style={styles.location}>{job.location}</p>
                                <div style={styles.tags}>
                                    <span style={styles.tag}>{job.jobType}</span>
                                    <span style={styles.tag}>{job.experienceLevel}</span>
                                </div>
                                <p style={styles.description}>
                                    {job.description?.substring(0,150)}...
                                </p>
                                <Link to={'/jobs/' + job.id} style={styles.viewButton}>
                                    View Details
                                </Link>
                        </div>
                    ))
                )}
            </div>
            {totalPages > 1 && (
                <div style={styles.pagination}>
                    <button
                        onClick={()=> goToPage(currentPage-1)}
                        disabled={currentPage ===1}
                        style={currentPage===1 ? styles.pageButtonDisabled : styles.pageButton}
                        >
                        Previous
                    </button>
                    {Array.from({length: totalPages}, (_,i) => i+1).map((page)=>(
                        <button
                            key={page}
                            onClick={()=>goToPage(page)}
                            style={currentPage === page ? styles.pageButtonActive : styles.pageButton}
                        >
                            {page}
                        </button>
                    ))}
                    <button
                        onClick={()=>goToPage(currentPage+1)}
                        disabled={currentPage === totalPages}
                        style={currentPage === totalPages ? styles.pageButtonDisabled : styles.pageButton}
                        >
                        Next
                    </button>
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
        textAlign: 'center',
        marginBottom: '30px',
        color: '#2c3e50'
    },
    filterForm: {
        backgroundColor: 'white',
        padding: '25px',
        borderRadius: '10px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        marginBottom: '30px'
    },
    filterRow: {
        display: 'flex',
        gap: '15px',
        flexWrap: 'wrap',
        marginBottom: '15px'
    },
    filterInput: {
        flex: 1,
        minWidth: '200px',
        padding: '12px',
        border: '1px solid #ddd',
        borderRadius: '5px',
        fontSize: '16px'
    },
    filterSelect: {
        flex: 1,
        minWidth: '150px',
        padding: '12px',
        border: '1px solid #ddd',
        borderRadius: '5px',
        fontSize: '16px',
        backgroundColor: 'white'
    },
    filterButtons: {
        display: 'flex',
        gap: '10px'
    },
    searchButton: {
        padding: '12px 30px',
        backgroundColor: '#3498db',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        fontSize: '16px',
        cursor: 'pointer'
    },
    clearButton: {
        padding: '12px 30px',
        backgroundColor: '#95a5a6',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        fontSize: '16px',
        cursor: 'pointer'
    },
    resultCount: {
        color: '#7f8c8d',
        marginBottom: '20px'
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
        marginBottom: '10px'
    },
    jobTitle: {
        margin: '0 0 5px 0',
        color: '#2c3e50',
        fontSize: '22px'
    },
    company: {
        color: '#3498db',
        fontWeight: 'bold',
        margin: 0
    },
    salary: {
        color: '#27ae60',
        fontWeight: 'bold',
        fontSize: '18px'
    },
    location: {
        color: '#7f8c8d',
        margin: '0 0 15px 0'
    },
    tags: {
        display: 'flex',
        gap: '10px',
        marginBottom: '15px'
    },
    tag: {
        backgroundColor: '#ecf0f1',
        padding: '5px 12px',
        borderRadius: '3px',
        fontSize: '14px',
        color: '#2c3e50'
    },
    description: {
        color: '#555',
        marginBottom: '15px',
        lineHeight: '1.5'
    },
    viewButton: {
        display: 'inline-block',
        padding: '10px 20px',
        backgroundColor: '#3498db',
        color: 'white',
        textDecoration: 'none',
        borderRadius: '5px'
    },
    loading: {
        textAlign: 'center',
        padding: '50px',
        fontSize: '18px'
    },
    noJobs: {
        textAlign: 'center',
        color: '#7f8c8d',
        padding: '40px'
    },
    pagination: {
        display: 'flex',
        justifyContent: 'center',
        gap: '10px',
        marginTop: '30px'
    },
    pageButton: {
        padding: '10px 15px',
        border: '1px solid #3498db',
        backgroundColor: 'white',
        color: '#3498db',
        borderRadius: '5px',
        cursor: 'pointer'
    },
    pageButtonActive: {
        padding: '10px 15px',
        border: '1px solid #3498db',
        backgroundColor: '#3498db',
        color: 'white',
        borderRadius: '5px',
        cursor: 'pointer'
    },
    pageButtonDisabled: {
        padding: '10px 15px',
        border: '1px solid #ddd',
        backgroundColor: '#f5f5f5',
        color: '#999',
        borderRadius: '5px',
        cursor: 'not-allowed'
    }
};

export default Jobs;
