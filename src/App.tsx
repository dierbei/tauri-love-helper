import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Discover from './pages/Discover';
import Profile from './pages/Profile';
import Chat from './pages/Chat';
import ChatList from './pages/ChatList';
import Social from './pages/Social';
import Settings from './pages/Settings';
import { AppProvider } from './context/AppContext';

function App() {
  return (
    <AppProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="discover" element={<Discover />} />
          <Route path="profile/:id" element={<Profile />} />
          <Route path="chat/:id" element={<Chat />} />
          <Route path="chats" element={<ChatList />} />
          <Route path="social" element={<Social />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </AppProvider>
  );
}

export default App;