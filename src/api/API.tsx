const searchGithub = async () => {
  try {
    const start = Math.floor(Math.random() * 100000000) + 1;

    // Log the entire environment variables for debugging
    console.log(import.meta.env);

    // Log the specific GitHub token for verification
    console.log("Token:", import.meta.env.VITE_GITHUB_TOKEN);

    const response = await fetch(
      `https://api.github.com/users?since=${start}`,
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
        },
      }
    );

    if (!response.ok) {
      const errorMessage = await response.text(); // Get error message from the response
      throw new Error(`API Error: ${response.status} - ${errorMessage}`);
    }

    const data = await response.json();
    console.log('Data:', data);
    return data;
  } catch (err) {
    if (err instanceof TypeError) {
      console.log('Network error occurred:', err);
      throw new Error('Network error: Unable to reach GitHub API. Please check your internet connection.');
    } else {
      console.log('Error occurred in searchGithub:', err);
      throw err; // Re-throw the error to be handled higher up
    }
  }
};

const searchGithubUser = async (username: string) => {
  try {
    const response = await fetch(`https://api.github.com/users/${username}`, {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
      },
    });

    if (!response.ok) {
      const errorMessage = await response.text(); // Get error message from the response
      throw new Error(`API Error: ${response.status} - ${errorMessage}`);
    }

    const data = await response.json();
    return data;
  } catch (err) {
    if (err instanceof TypeError) {
      console.log('Network error occurred:', err);
      throw new Error('Network error: Unable to reach GitHub API. Please check your internet connection.');
    } else {
      console.log('Error occurred in searchGithubUser:', err);
      throw err; // Re-throw the error for higher-level handling
    }
  }
};

export { searchGithub, searchGithubUser };
