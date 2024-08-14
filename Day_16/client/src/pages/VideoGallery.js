import React, { useState, useEffect } from "react";
import axios from "axios";

const VideoGallery = () => {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchVideos("mh wild");
  }, []);

  const fetchVideos = async (query) => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/search`,
        {
          params: {
            part: "snippet",
            maxResults: 6,
            key: process.env.REACT_APP_YOUTUBE_API_KEY,
            q: query,
          },
        }
      );
      console.log(response.data.items); // Debugging line
      setVideos(response.data.items);
      setSelectedVideo(response.data.items[0]);
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };

  const handleSearch = (event) => {
    event.preventDefault();
    fetchVideos(searchTerm);
  };

  return (
    <div>
      <form onSubmit={handleSearch} className="bg-red-600 px-5 py-4 w-full">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for videos"
        />
        <button type="submit">Search</button>
      </form>

      <div className="flex mx-5">
        {selectedVideo && (
          <div className="selected-video">
            <iframe
              width="960"
              height="555"
              src={`https://www.youtube.com/embed/${selectedVideo.id.videoId}`}
              frameBorder="0"
              allowFullScreen
              title={selectedVideo.snippet.title}
            ></iframe>
          </div>
        )}

        <div className="">
          {videos.map((video) => (
            <div
              key={video.id.videoId}
              className={`flex mb-3 shadow-xl ${
                video.id.videoId === selectedVideo.id.videoId ? "active" : ""
              }`}
              onClick={() => setSelectedVideo(video)}
            >
              <img
                src={video.snippet.thumbnails.default.url}
                alt={video.snippet.title}
                className=" object-cover"
              />
              <p className="w-[300px] ms-2">{video.snippet.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VideoGallery;
