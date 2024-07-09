import React from 'react';
import { Form, Button } from 'react-bootstrap';

export const SearchBar = ({ handleSearch, searchTerm, setSearchTerm }) => {
  return (
    <Form onSubmit={handleSearch} className="mb-3">
      <Form.Group controlId="searchTerm">
        <Form.Control
          type="text"
          placeholder="Search by file name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Form.Group>
      <Button variant="primary" type="submit" className="mt-3">
        Search
      </Button>
    </Form>
  );
};
