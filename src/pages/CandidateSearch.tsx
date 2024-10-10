import { useState, useEffect } from 'react';
import { searchGithub } from '../api/API';
import { Candidate } from '../interfaces/Candidate.interface';

const CandidateSearch = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0); // Track the current candidate index
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const data = await searchGithub();
        const formattedCandidates: Candidate[] = data.map((item: any) => ({
          id: item.id,
          name: item.login, // Use 'login' for name as per your API response
          username: item.login,
          location: item.location || null, // Handle null values
          avatar: item.avatar_url, // Correctly map the avatar URL
          email: null, // Assuming email is not provided in the API response
          html_url: item.html_url, // Map HTML URL
          company: null, // Assuming company is not provided in the API response
        }));
        setCandidates(formattedCandidates);
      } catch (err) {
        setError('Failed to fetch candidates.');
      } finally {
        setLoading(false);
      }
    };

    fetchCandidates();
  }, []);

  const saveCandidate = () => {
    const candidateToSave = candidates[currentIndex];
    const savedCandidates = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
    savedCandidates.push(candidateToSave);
    localStorage.setItem('savedCandidates', JSON.stringify(savedCandidates));
    nextCandidate();
  };

  const removeCandidate = () => {
    const savedCandidates = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
    const updatedCandidates = savedCandidates.filter(
      (candidate: Candidate) => candidate.id !== candidates[currentIndex].id
    );
    localStorage.setItem('savedCandidates', JSON.stringify(updatedCandidates));
    nextCandidate();
  };

  const nextCandidate = () => {
    if (currentIndex < candidates.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      alert('No more candidates available.');
    }
  };

  if (loading) {
    return <h2>Loading candidates...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  const currentCandidate = candidates[currentIndex];

  return (
    <div>
      <h1>Candidate Search</h1>
      {currentCandidate ? (
        <div key={currentCandidate.id}>
          <h2>{currentCandidate.name}</h2>
          <p>
            <a href={currentCandidate.html_url} target="_blank" rel="noopener noreferrer">
              View GitHub Profile
            </a>
          </p>
          <p>{currentCandidate.location || "Location not provided"}</p>
          <p>{currentCandidate.email || "Email not provided"}</p>
          <img src={currentCandidate.avatar} alt={`${currentCandidate.name}'s avatar`} />
          <button onClick={saveCandidate}>+</button>
          <button onClick={removeCandidate}>-</button>
        </div>
      ) : (
        <p>No candidates found.</p>
      )}
    </div>
  );
};

export default CandidateSearch;
