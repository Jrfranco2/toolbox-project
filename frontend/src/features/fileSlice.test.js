import reducer, { fetchFiles } from './fileSlice';
import { configureStore } from '@reduxjs/toolkit';
import axios from 'axios';

jest.mock('axios');

describe('fileSlice', () => {
  describe('reducers', () => {
    const initialState = {
      loading: false,
      files: [],
      error: '',
    };

    it('should return the initial state', () => {
      expect(reducer(undefined, {})).toEqual(initialState);
    });

    it('should handle fetchFiles.pending', () => {
      const nextState = reducer(initialState, fetchFiles.pending());
      expect(nextState).toEqual({
        loading: true,
        files: [],
        error: '',
      });
    });

    it('should handle fetchFiles.fulfilled', () => {
      const payload = [
        {
          file: 'test1.csv',
          lines: [{ text: 'Line 1', number: 1, hex: 'abc123' }],
        },
      ];
      const nextState = reducer(initialState, fetchFiles.fulfilled(payload));
      expect(nextState).toEqual({
        loading: false,
        files: payload,
        error: '',
      });
    });
  });
});
