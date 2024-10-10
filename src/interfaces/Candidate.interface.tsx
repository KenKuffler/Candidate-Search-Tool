// interfaces/Candidate.interface.tsx
export interface Candidate {
    id: number; // Unique identifier for the candidate
    name: string; // Candidate's name
    username: string; // Candidate's GitHub username
    location: string | null; // Candidate's location (can be null if not provided)
    avatar: string; // URL to the candidate's avatar image
    email: string | null; // Candidate's email (can be null if not provided)
    html_url: string; // URL to the candidate's GitHub profile
    company: string | null; // Candidate's company (can be null if not provided)
}
