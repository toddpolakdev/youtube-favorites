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
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  padding: 2rem;
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
