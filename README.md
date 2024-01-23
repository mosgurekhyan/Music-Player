
# My Music Player App

## Node.js Version

This project requires Node.js to be installed. Make sure you have Node.js installed on your machine. You can download the latest version of Node.js from [https://nodejs.org/](https://nodejs.org/). The project is developed and tested with Node.js version 20.10.0.

## Overview

This React application simulates a music player interface with features such as displaying a list of songs, playing all songs, adding all songs to a queue, and a music upload form for users to upload their music files.

## Component Structure

- **App.js**: Main component that renders the entire application.
- **SongList.js**: Component to display the list of songs.
- **SongRow.js**: Subcomponent to render individual song details within SongList.
- **PlayAllButton.js**: Button component to initiate playing all songs (simulated).
- **AddAllButton.js**: Button component to add all songs to a queue (simulated).
- **MusicUploadForm.js**: Component for users to upload music files.

## State Management

The application uses the `useContext` hook for state management. A `UseContext` is created to manage the global state, including the list of songs, the currently playing song, and other relevant details.

## Instructions

1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Run `npm start` to start the development server.
4. Open your browser and navigate to `http://localhost:3000`.

### Testing

Due to challenges with React Testing Library and Jest in my application, the testing process has not been implemented.
