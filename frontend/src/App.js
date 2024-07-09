import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Navbar, Alert } from 'react-bootstrap';
import { FileTable } from './components/FileTable';
import { fetchFiles } from './features/fileSlice';
import { SearchBar } from './components/SearchBar';

function App() {
  const dispatch = useDispatch();
  const { files, error, loading } = useSelector((state) => state.files);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch(fetchFiles());
  }, [dispatch]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm) {
      dispatch(fetchFiles(searchTerm));
    } else {
      dispatch(fetchFiles());
    }
  };

  return (
    <div className="App">
      <Navbar bg="danger" variant="dark">
        <Container>
          <Navbar.Brand href="#home">React Test App</Navbar.Brand>
        </Container>
      </Navbar>
      <Container className="mt-5">
        <SearchBar
          handleSearch={handleSearch}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
        {loading && <Alert variant="info">Loading...</Alert>}
        {error && <Alert variant="danger">{error}</Alert>}
        <FileTable files={files} />
      </Container>
    </div>
  );
}

export default App;
