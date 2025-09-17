import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getThumbnail } from "../utils/getThumbnail";
import {
  saveFavorite,
  removeFavorite,
  isFavorite,
} from "../services/firestore";
import { auth } from "../firebase";
import { FaRegStar, FaStar } from "react-icons/fa";

type VideoCardProps = {
  title: string;
  videoId: string;
  videoUrl: string;
  onClick: () => void;
  canFavorite: boolean;
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
  cursor: pointer;
`;

const Title = styled.h3`
  padding: 0.75rem;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.text};
  text-align: left;
`;

const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0.5rem;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.text};
  font-size: 1.25rem;

  &:hover {
    color: gold;
  }
`;

const VideoCard: React.FC<VideoCardProps> = ({
  title,
  videoId,
  videoUrl,
  onClick,
}) => {
  const user = auth.currentUser;
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    if (user) {
      isFavorite(user.uid, videoId).then(
        (exists: boolean | ((prevState: boolean) => boolean)) =>
          setFavorite(exists)
      );
    }
  }, [user, videoId]);

  const toggleFavorite = async () => {
    if (!user) {
      alert("Please sign in to save favorites.");
      return;
    }

    if (favorite) {
      await removeFavorite(user.uid, videoId);
      setFavorite(false);
    } else {
      await saveFavorite(user.uid, videoId, videoUrl);
      setFavorite(true);
    }
  };

  return (
    <Card>
      <Thumbnail src={getThumbnail(videoUrl)} alt={title} onClick={onClick} />
      <Title>{title}</Title>
      <Actions>
        <IconButton onClick={toggleFavorite}>
          {favorite ? <FaStar color="gold" /> : <FaRegStar />}
        </IconButton>
      </Actions>
    </Card>
  );
};

export default VideoCard;
