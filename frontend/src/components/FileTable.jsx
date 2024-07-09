import React from 'react';
import Table from 'react-bootstrap/Table';

export const FileTable = ({ files }) => {
  console.log(files);
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>File Name</th>
          <th>Text</th>
          <th>Number</th>
          <th>Hex</th>
        </tr>
      </thead>
      <tbody>
        {files.map((file) =>
          file.lines.map((line, index) => (
            <tr key={`${file.file}-${index}`}>
              <td>{file.file}</td>
              <td>{line.text}</td>
              <td>{line.number}</td>
              <td>{line.hex}</td>
            </tr>
          ))
        )}
      </tbody>
    </Table>
  );
};
