import axios from 'axios';
import { Container, Navbar, Alert } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { FileTable } from './components/FileTable';

function App() {
  const [files, setFiles] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    // URL de tu API
    const API_URL = 'http://localhost:3002/files/data';

    axios
      .get(API_URL)
      .then((response) => {
        setFiles(response.data);
      })
      .catch((error) => {
        console.log(error);
        setError(error.message);
      });
  }, []);

  return (
    <div className="App">
      <Navbar bg="danger" variant="dark">
        <Container>
          <Navbar.Brand href="#home">React Test App</Navbar.Brand>
        </Container>
      </Navbar>
      <Container className="mt-5">
        {error && <Alert variant="danger">{`Error: ${error}`}</Alert>}
        <FileTable files={files} />
      </Container>
    </div>
  );
}

export default App;
