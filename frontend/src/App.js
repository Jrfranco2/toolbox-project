import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Navbar, Alert } from 'react-bootstrap';
import { FileTable } from './components/FileTable';
import { fetchFiles } from './store/actions/fileActions';

function App() {
  const dispatch = useDispatch();
  const fileData = useSelector((state) => state.fileData);
  const { files, error, loading } = fileData;

  useEffect(() => {
    dispatch(fetchFiles());
  }, [dispatch]);

  return (
    <div className="App">
      <Navbar bg="danger" variant="dark">
        <Container>
          <Navbar.Brand href="#home">React Test App</Navbar.Brand>
        </Container>
      </Navbar>
      <Container className="mt-5">
        {loading && <Alert variant="info">Loading...</Alert>}
        {error && <Alert variant="danger">{`Error: ${error}`}</Alert>}
        <FileTable files={files} />
      </Container>
    </div>
  );
}

export default App;
