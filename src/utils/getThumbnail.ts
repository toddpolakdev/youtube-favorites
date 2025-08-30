export const getYouTubeId = (url: string): string | null => {
  const regex = /(?:youtube\.com\/.*v=|youtu\.be\/)([^&?]+)/;
  const match = url.match(regex);
  return match ? match[1] : null;
};

export const getThumbnail = (url: string): string => {
  const id = getYouTubeId(url);
  return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : "";
};
