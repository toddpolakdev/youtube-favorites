/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import favorites from "../data/favorites.json";
import VideoGrid from "../components/VideoGrid";
import VideoModal from "../components/VideoModal";
import LoginButton from "../components/LoginButton";
import LogoutButton from "../components/LogoutButton";
import { onAuthStateChanged, type User } from "firebase/auth";
import { auth } from "../firebase";
import { getFavorites } from "../services/firestore";

const Title = styled.h1`
  background: linear-gradient(
    to right,
    #5c002f,
    #57001d,
    #28006d,
    #004479,
    #003e46,
    #003a02,
    #1d2000,
    #513200,
    #1e0700
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Wrapper = styled.div`
  min-height: 100vh;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`;

const Container = styled.div`
  width: 100%;
  max-width: 960px;
  margin: 0 auto;
  padding: 2rem;
  background: ${({ theme }) => theme.cardBg};
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;

  h1 {
    font-size: 2rem;
  }
`;

const ToggleButton = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 6px;
  background: ${({ theme }) => theme.buttonBg};
  color: #fff;
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.buttonHover};
  }
`;

const Form = styled.form`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;

  input {
    flex: 1;
    padding: 0.75rem;
    border-radius: 6px;
    border: 1px solid #ccc;
    font-size: 1rem;
  }

  button {
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 6px;
    background: ${({ theme }) => theme.buttonBg};
    color: #fff;
    font-size: 1rem;
    cursor: pointer;

    &:hover {
      background: ${({ theme }) => theme.buttonHover};
    }
  }
`;

type Video = {
  id: string;
  title: string;
  url: string;
};

type HomeProps = {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
};

const Home: React.FC<HomeProps> = ({ darkMode, setDarkMode }) => {
  const [videos, setVideos] = useState<Video[]>(favorites);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [input, setInput] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newVideo: Video = {
      id: Date.now().toString(),
      title: "New Favorite Video",
      url: input.trim(),
    };

    setVideos([newVideo, ...videos]);
    setInput("");
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setLoading(false);

      if (currentUser) {
        // Load from Firestore
        const favs = await getFavorites(currentUser.uid);
        const mapped = favs.map((fav: any) => ({
          id: fav.id,
          title: "Saved Video",
          url: fav.videoUrl,
        }));
        setVideos(mapped);
      } else {
        // Fallback to local JSON if not logged in
        setVideos(favorites);
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <Wrapper>
      <Container>
        <Header>
          <Title>My YouTube Favorites</Title>
          <ToggleButton onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </ToggleButton>
          {user ? (
            <div>
              <LogoutButton />
            </div>
          ) : (
            <LoginButton />
          )}
        </Header>

        <Form onSubmit={handleAdd}>
          <input
            type="url"
            placeholder="Paste YouTube link..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            required
          />
          <button type="submit">Add</button>
        </Form>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <VideoGrid
            videos={videos}
            onSelect={(url) => setActiveVideo(url)}
            canFavorite={!!user} // pass whether favorite is allowed
          />
        )}

        {activeVideo && (
          <VideoModal url={activeVideo} onClose={() => setActiveVideo(null)} />
        )}
      </Container>
    </Wrapper>
  );
};

export default Home;
