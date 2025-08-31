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
};

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, 220px);
  gap: 1.5rem;
  justify-content: center;
`;

const VideoGrid: React.FC<VideoGridProps> = ({ videos }) => {
  return (
    <Grid>
      {videos.map((video) => (
        <VideoCard key={video.id} title={video.title} url={video.url} />
      ))}
    </Grid>
  );
};

export default VideoGrid;
