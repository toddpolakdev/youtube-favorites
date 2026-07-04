import React, { useEffect } from "react";
import styled from "styled-components";
import { getYouTubeId } from "../utils/getThumbnail";

type VideoModalProps = {
  url: string;
  onClose: () => void;
};

const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const VideoWrapper = styled.div`
  position: relative;
  width: 90%;
  max-width: 960px;
  aspect-ratio: 16 / 9;
  background: black;
`;

const Iframe = styled.iframe`
  width: 100%;
  height: 100%;
  border: none;
`;

const CloseButton = styled.button`
  position: absolute;
  top: -3rem;
  right: 0;
  background: none;
  border: none;
  color: #fff;
  font-size: 2.5rem;
  line-height: 1;
  cursor: pointer;

  &:hover {
    color: #ccc;
  }
`;

const VideoModal: React.FC<VideoModalProps> = ({ url, onClose }) => {
  const videoId = getYouTubeId(url);

  // Allow closing with the Escape key.
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  if (!videoId) return null;

  return (
    <Backdrop>
      <VideoWrapper>
        <CloseButton onClick={onClose} aria-label="Close video">
          &times;
        </CloseButton>
        <Iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&controls=0&modestbranding=1&rel=0&showinfo=0`}
          allow="autoplay; fullscreen"
          allowFullScreen
        />
      </VideoWrapper>
    </Backdrop>
  );
};

export default VideoModal;
