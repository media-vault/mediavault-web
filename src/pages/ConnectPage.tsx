import React, { useState } from 'react';

function ConnectPage() {
  const [serverUrl, setServerUrl] = useState('');

  const handleConnect = () => {
    // Save the server URL somewhere (global state, localStorage, etc.)
    localStorage.setItem('mediavault_server_url', serverUrl);

    // Redirect user to login page or homepage after setting server
    window.location.href = "/login";  // or your desired flow
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h1>Connect to MediaVault Server</h1>
      <input
        type="text"
        placeholder="Enter server URL (e.g. http://localhost:8080)"
        value={serverUrl}
        onChange={(e) => setServerUrl(e.target.value)}
        style={{ width: '300px', padding: '10px', margin: '10px' }}
      />
      <br />
      <button onClick={handleConnect} style={{ padding: '10px 20px' }}>
        Connect
      </button>
    </div>
  );
}

export default ConnectPage;

