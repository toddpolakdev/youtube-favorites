import React from "react";
import styled from "styled-components";
import { getThumbnail } from "../utils/getThumbnail";

type VideoCardProps = {
  title: string;
  url: string;
  onClick: () => void;
};

const Card = styled.div`
  width: 220px;
  background: ${({ theme }) => theme.cardBg};
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.15);
  transition: transform 0.2s ease-in-out;
  cursor: pointer;

  &:hover {
    transform: translateY(-4px);
  }
`;

const Thumbnail = styled.img`
  width: 100%;
  height: 140px;
  object-fit: cover;
  display: block;
`;

const Title = styled.h3`
  padding: 0.75rem;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.text};
  text-align: left;
`;

const VideoCard: React.FC<VideoCardProps> = ({ title, url, onClick }) => {
  return (
    <Card onClick={onClick}>
      <Thumbnail src={getThumbnail(url)} alt={title} />
      <Title>{title}</Title>
    </Card>
  );
};

export default VideoCard;
