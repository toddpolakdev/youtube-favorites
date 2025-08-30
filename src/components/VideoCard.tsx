import React from "react";
import styled from "styled-components";
import { getThumbnail } from "../utils/getThumbnail";

type VideoCardProps = {
  title: string;
  url: string;
};

const Card = styled.div`
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
  }
`;

const Thumbnail = styled.img`
  width: 100%;
  display: block;
`;

const Title = styled.h3`
  padding: 0.75rem;
  font-size: 1rem;
  color: #333;
`;

const VideoCard: React.FC<VideoCardProps> = ({ title, url }) => {
  return (
    <Card onClick={() => window.open(url, "_blank")}>
      <Thumbnail src={getThumbnail(url)} alt={title} />
      <Title>{title}</Title>
    </Card>
  );
};

export default VideoCard;
