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
    <div className="saved-candidates-container">
      <h1>Potential Candidates</h1>
      <div className="saved-candidates-grid">
        {/* Header Row */}
        <div className="saved-grid-row saved-grid-header">
          <div className="saved-grid-cell">Avatar</div>
          <div className="saved-grid-cell">Name & GitHub</div>
          <div className="saved-grid-cell">Location</div>
          <div className="saved-grid-cell">E-Mail</div>
          <div className="saved-grid-cell">Company</div>
          <div className="saved-grid-cell">Reject Candidate</div>
        </div>

        {savedCandidates.length > 0 ? (
          savedCandidates.map((candidate) => (
            <div className="saved-grid-row" key={candidate.id}>
              <div className="saved-grid-cell">
                <img src={candidate.avatar} alt={`${candidate.name}'s avatar`} className="saved-candidate-avatar" />
              </div>
              <div className="saved-grid-cell">
                <h2>{candidate.name}</h2>
                <p>
                  <a href={candidate.html_url} target="_blank" rel="noopener noreferrer">
                    View GitHub Profile
                  </a>
                </p>
              </div>
              <div className="saved-grid-cell">{candidate.location || "Location not provided"}</div>
              <div className="saved-grid-cell">{candidate.email || "Email not provided"}</div>
              <div className="saved-grid-cell">{candidate.company || "Company not provided"}</div>
              <div className="saved-grid-cell">
                <button onClick={() => removeCandidate(candidate.id)}>-</button>
              </div>
            </div>
          ))
        ) : (
          <p>{message}</p> // Show message if no candidates are saved
        )}
      </div>
    </div>
  );
};

export default SavedCandidates