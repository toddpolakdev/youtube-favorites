import React from "react";
import styled from "styled-components";
import VideoCard from "./VideoCard";

type Video = {
  id: string;
  title: string;
  url: string;
};

type VideoGridProps = {
  videos: Video[];
  onSelect: (url: string) => void;
};

const Grid = styled.div`
  display: grid;
  gap: 1.5rem;
  justify-content: center;
  grid-template-columns: 1fr;

  @media (min-width: 600px) {
    grid-template-columns: repeat(2, 220px);
  }

  @media (min-width: 900px) {
    grid-template-columns: repeat(3, 220px);
  }
`;

const VideoGrid: React.FC<VideoGridProps> = ({ videos, onSelect }) => {
  return (
    <Grid>
      {videos.map((video) => (
        <VideoCard
          key={video.id}
          title={video.title}
          url={video.url}
          onClick={() => onSelect(video.url)}
        />
      ))}
    </Grid>
  );
};

export default VideoGrid;
