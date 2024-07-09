import React from 'react';
import { render, screen } from '@testing-library/react';
import { FileTable } from './FileTable';

test('renders files with lines', () => {
  const files = [
    {
      file: 'test1.csv',
      lines: [
        { text: 'Line 1', number: 1, hex: 'abc123' },
        { text: 'Line 2', number: 2, hex: 'def456' },
      ],
    },
  ];

  render(<FileTable files={files} />);

  expect(screen.getAllByText('test1.csv')).toHaveLength(2);
  expect(screen.getByText('Line 1')).toBeInTheDocument();
  expect(screen.getByText('1')).toBeInTheDocument();
  expect(screen.getByText('abc123')).toBeInTheDocument();
  expect(screen.getByText('Line 2')).toBeInTheDocument();
  expect(screen.getByText('2')).toBeInTheDocument();
  expect(screen.getByText('def456')).toBeInTheDocument();
});
