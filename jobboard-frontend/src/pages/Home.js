import React from 'react';
import {Link} from "react-router-dom";

function Home() {
    return (
        <div>
            <div style={styles.hero}>
                <div style={styles.heroContent}>
                    <h1 style={styles.heroTitle}>Find Your Dream Job Today</h1>
                    <p style={styles.heroSubtitle}>
                        Connect with top employers and discover thousands of opportunities
                    </p>
                    <div style={styles.heroButtons}>
                        <Link to="/jobs" style={styles.primaryButton}>Browse Jobs</Link>
                        <Link to="/register" style={styles.secondaryButton}>Create Account</Link>
                    </div>
                </div>
            </div>

            <div style={styles.features}>
                <div style={styles.feature}>
                    <div style={styles.featureIcon}>🔍</div>
                    <h3 style={styles.featureTitle}>Search Jobs</h3>
                    <p style={styles.featureText}>
                        Find jobs that match your skills with powerful search filters.
                    </p>
                </div>
                <div style={styles.feature}>
                    <div style={styles.featureIcon}>📝</div>
                    <h3 style={styles.featureTitle}>Easy Apply</h3>
                    <p style={styles.featureText}>
                        Apply to jobs with one click. Track applications in real-time.
                    </p>
                </div>
                <div style={styles.feature}>
                    <div style={styles.featureIcon}>🏢</div>
                    <h3 style={styles.featureTitle}>Top Companies</h3>
                    <p style={styles.featureText}>
                        Connect with leading companies looking for talent like you.
                    </p>
                </div>
            </div>

            <div style={styles.stats}>
                <div style={styles.stat}>
                    <div style={styles.statNumber}>1000+</div>
                    <div style={styles.statLabel}>Jobs Posted</div>
                </div>
                <div style={styles.stat}>
                    <div style={styles.statNumber}>500+</div>
                    <div style={styles.statLabel}>Companies</div>
                </div>
                <div style={styles.stat}>
                    <div style={styles.statNumber}>10000+</div>
                    <div style={styles.statLabel}>Job Seekers</div>
                </div>
            </div>

            <div style={styles.cta}>
                <h2 style={styles.ctaTitle}>Ready to Get Started?</h2>
                <p style={styles.ctaText}>Join thousands of professionals finding their dream jobs</p>
                <Link to="/register" style={styles.ctaButton}>Sign Up Now</Link>
            </div>

            <footer style={styles.footer}>
                <p>© 2026 JobBoard. All rights reserved.</p>
            </footer>
        </div>
    );
}

const styles = {
    hero: {
        background: 'linear-gradient(135deg, #2c3e50 0%, #3498db 100%)',
        color: 'white',
        padding: '100px 20px',
        textAlign: 'center'
    },
    heroContent: {
        maxWidth: '800px',
        margin: '0 auto'
    },
    heroTitle: {
        fontSize: '48px',
        marginBottom: '20px',
        fontWeight: 'bold'
    },
    heroSubtitle: {
        fontSize: '20px',
        marginBottom: '40px',
        opacity: 0.9
    },
    heroButtons: {
        display: 'flex',
        justifyContent: 'center',
        gap: '20px',
        flexWrap: 'wrap'
    },
    primaryButton: {
        backgroundColor: '#27ae60',
        color: 'white',
        padding: '15px 40px',
        borderRadius: '5px',
        fontSize: '18px',
        fontWeight: 'bold'
    },
    secondaryButton: {
        backgroundColor: 'transparent',
        color: 'white',
        padding: '15px 40px',
        borderRadius: '5px',
        fontSize: '18px',
        border: '2px solid white'
    },
    features: {
        display: 'flex',
        justifyContent: 'center',
        gap: '40px',
        padding: '80px 20px',
        flexWrap: 'wrap',
        maxWidth: '1200px',
        margin: '0 auto'
    },
    feature: {
        textAlign: 'center',
        maxWidth: '300px',
        padding: '30px',
        backgroundColor: 'white',
        borderRadius: '10px',
        boxShadow: '0 5px 20px rgba(0,0,0,0.1)'
    },
    featureIcon: {
        fontSize: '50px',
        marginBottom: '20px'
    },
    featureTitle: {
        fontSize: '22px',
        marginBottom: '15px',
        color: '#2c3e50'
    },
    featureText: {
        color: '#7f8c8d',
        lineHeight: '1.6'
    },
    stats: {
        display: 'flex',
        justifyContent: 'center',
        gap: '60px',
        padding: '60px 20px',
        backgroundColor: '#2c3e50',
        color: 'white',
        flexWrap: 'wrap'
    },
    stat: {
        textAlign: 'center'
    },
    statNumber: {
        fontSize: '48px',
        fontWeight: 'bold',
        color: '#3498db'
    },
    statLabel: {
        fontSize: '18px',
        opacity: 0.8
    },
    cta: {
        textAlign: 'center',
        padding: '80px 20px',
        backgroundColor: 'white'
    },
    ctaTitle: {
        fontSize: '36px',
        marginBottom: '15px',
        color: '#2c3e50'
    },
    ctaText: {
        fontSize: '18px',
        color: '#7f8c8d',
        marginBottom: '30px'
    },
    ctaButton: {
        display: 'inline-block',
        backgroundColor: '#3498db',
        color: 'white',
        padding: '15px 50px',
        borderRadius: '5px',
        fontSize: '18px',
        fontWeight: 'bold'
    },
    footer: {
        textAlign: 'center',
        padding: '30px',
        backgroundColor: '#2c3e50',
        color: 'white'
    }
};

export default Home;