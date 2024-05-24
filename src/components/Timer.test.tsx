import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { act } from 'react-dom/test-utils';
import Timer from './Timer';
import { startTimer, stopTimer } from "../services/api";

jest.useFakeTimers();

jest.mock('../services/api', () => ({
  startTimer: jest.fn(),
  pauseTimer: jest.fn(),
  stopTimer: jest.fn(),
  getSleepingData: jest.fn(),
}));

describe('Timer component', () => {
  test('renders timer component', () => {
    render(<Timer onStop={() => {}} />);
    const timerElement = screen.getByText(/Timer:/i);
    expect(timerElement).toBeInTheDocument();
  });

  test('starts timer correctly', () => {
    render(<Timer onStop={() => {}} />);
    const startButton = screen.getByText(/Start/i);
    fireEvent.click(startButton);
    expect(startTimer).toHaveBeenCalledTimes(1);
  });

  test('pauses and shows elapsed paused timer correctly', async () => {
    render(<Timer onStop={() => {}} />);
    const startButton = screen.getByText(/Start/i);

    act(() => {
      fireEvent.click(startButton);
    });

    // Simulate a pause period
    jest.advanceTimersByTime(5000); 
    fireEvent.click(screen.getByText(/Pause/i));
    jest.advanceTimersByTime(3000);


    await waitFor(() => {
      expect(screen.getByText(/Elapsed Time During Pause:/i)).toBeInTheDocument();
    });
  });

  test('stops timer correctly', () => {
    render(<Timer onStop={() => {}} />);
    const startButton = screen.getByText(/Start/i);
    fireEvent.click(startButton);

    const stopButton = screen.getByText(/Stop/i);
    fireEvent.click(stopButton);
    expect(stopTimer).toHaveBeenCalledTimes(1);
  });

  test('reset timer correctly', () => {
    render(<Timer onStop={() => {}} />);
    const resetButton = screen.getByText(/Reset/i);
    fireEvent.click(resetButton);
  });
});
