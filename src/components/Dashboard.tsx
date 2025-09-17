/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import VideoGrid from "../components/VideoGrid";
import VideoModal from "../components/VideoModal";
import LogoutButton from "../components/LogoutButton";
import { onAuthStateChanged, type User } from "firebase/auth";
import { auth } from "../firebase";
import { getFavorites } from "../services/firestore";

// 🔹 Reuse styled components
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

type Video = {
  id: string;
  title: string;
  url: string;
  addedAt?: string;
};

const Dashboard: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [videos, setVideos] = useState<Video[]>([]);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        getFavorites(currentUser.uid).then((favs: any) => {
          // Map Firestore docs to Video type
          const mapped = favs.map((fav: any) => ({
            id: fav.id,
            title: "Saved Video",
            url: fav.videoUrl,
            addedAt: fav.addedAt,
          }));
          setVideos(mapped);
        });
      } else {
        setVideos([]);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (!user) return <p>Please log in to view your dashboard.</p>;

  return (
    <Wrapper>
      <Container>
        <Header>
          <h1>{user.displayName}’s Dashboard</h1>
          <LogoutButton />
        </Header>

        {videos.length > 0 ? (
          <VideoGrid videos={videos} onSelect={(url) => setActiveVideo(url)} />
        ) : (
          <p>No saved videos yet. Add some from the homepage!</p>
        )}

        {activeVideo && (
          <VideoModal url={activeVideo} onClose={() => setActiveVideo(null)} />
        )}
      </Container>
    </Wrapper>
  );
};

export default Dashboard;
