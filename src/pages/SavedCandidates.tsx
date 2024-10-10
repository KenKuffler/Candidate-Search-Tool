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
    <>
      <h1>Potential Candidates</h1>
      {savedCandidates.length > 0 ? (
        <ul>
          {savedCandidates.map((candidate) => (
            <li key={candidate.id}>
              <h2>{candidate.name}</h2>
              <p>{candidate.username}</p>
              <p>{candidate.location}</p>
              <p>{candidate.email}</p>
              <img src={candidate.avatar} alt={`${candidate.name}'s avatar`} />
              <button onClick={() => removeCandidate(candidate.id)}>-</button> {/* Remove candidate button */}
            </li>
          ))}
        </ul>
      ) : (
        <p>{message}</p> // Show message if no candidates are saved
      )}
    </>
  );
};

export default SavedCandidates;