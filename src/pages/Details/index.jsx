import  { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from '../../components/Button';
import "./Details.css";

const Details = () => {
    const { id } = useParams();
    const [repoDetails, setRepoDetails] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRepoDetails = async () => {
            try {
                const urlsearchType = `https://api.github.com/users/${id}`;
                const response = await axios.get(urlsearchType);
                setRepoDetails(response.data);
            } catch (error) {
                console.error(error);
                alert('A ocurrido un error.');
            }
        };

        fetchRepoDetails();
    }, [id]);

    const goBackToResults = () => {
        navigate('/results');
    };

    const goToGitHubRepository = () => {
        if (repoDetails && repoDetails.html_url) {
            window.open(repoDetails.html_url, '_blank');
        }
    };

    if (!repoDetails) {
        return null;
    }

    return (
        <div className='Details'>
            <h2>DETALLES</h2>
            {repoDetails.owner && (
                <div className="single-avatar">
                    <img src={repoDetails.owner.avatar_url} alt={`${repoDetails.owner.login}'s avatar`} className="avatar" />
                </div>
            )}
            <h3>{repoDetails.name}</h3>
            <p>{repoDetails.description}</p>
            <p>Stars: {repoDetails.stargazers_count}</p>
            <Button onClick={goBackToResults}> Volver</Button>
            <Button onClick={goToGitHubRepository}> Ir a GitHub</Button>
        </div>
    );
};

export default Details;