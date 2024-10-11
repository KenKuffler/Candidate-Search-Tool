import { useEffect, useState } from 'react';
import { Candidate } from '../interfaces/Candidate.interface';

const SavedCandidates = () => {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    const loadSavedCandidates = () => {
      const candidates = localStorage.getItem('savedCandidates');
      if (candidates) {
        setSavedCandidates(JSON.parse(candidates));
      } else {
        setMessage('No candidates have been accepted.');
      }
    };

    loadSavedCandidates();
  }, []);

  // Function to remove a candidate from the saved list
  const removeCandidate = (candidateId: number) => {
    const updatedCandidates = savedCandidates.filter((candidate) => candidate.id !== candidateId);
    setSavedCandidates(updatedCandidates);
    localStorage.setItem('savedCandidates', JSON.stringify(updatedCandidates));

    // Show a message if there are no saved candidates left
    if (updatedCandidates.length === 0) {
      setMessage('No candidates have been accepted.');
    }
  };

  return (
    <div>
      <h1>Potential Candidates</h1>
      {savedCandidates.length > 0 ? (
        <div className="candidates-list">
          {savedCandidates.map((candidate) => (
            <div key={candidate.id} className="candidate-card">
              {/* Top section for avatar */}
              <img
                src={candidate.avatar}
                alt={`${candidate.name}'s avatar`}
                className="candidate-avatar"
              />
              
              {/* Bottom section for candidate info */}
              <div className="candidate-info">
                <h2>{candidate.name}</h2>
                <p>{candidate.username}</p>
                <p>{candidate.location || "Location not provided"}</p>
                <p>{candidate.email || "Email not provided"}</p>
              </div>
              
              {/* Button to remove candidate */}
              <div className="button-container">
                <button className="button button-minus" onClick={() => removeCandidate(candidate.id)}>-</button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>{message}</p> // Show message if no candidates are saved
      )}
    </div>
  );
};

export default SavedCandidates;