import React, { useState } from "react";
import styled from "styled-components";
import favorites from "../data/favorites.json";
import VideoGrid from "../components/VideoGrid";

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const Container = styled.div`
  width: 100%;
  max-width: 960px;
  padding: 2rem;
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
  const [input, setInput] = useState("");

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

  return (
    <Wrapper>
      <Container>
        <Header>
          <h1>📺 My YouTube Favorites</h1>
          <ToggleButton onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </ToggleButton>
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

        <VideoGrid videos={videos} />
      </Container>
    </Wrapper>
  );
};

export default Home;
