import React, { useState, useEffect } from "react";
import Masonry from "react-masonry-css";

function UnsplashAPI() {
  const [img, setImg] = useState("");
  const [res, setRes] = useState([]);

  const fetchRequest = async () => {
    if (img) {
      const data = await fetch(
        `https://api.unsplash.com/search/photos?page=1&query=${img}&client_id=WWwqLu4veEJKanGDxcPP9Y2ubQzmxamqYBuS9Rd2ZzY`
      );
      const dataJ = await data.json();
      const result = dataJ.results;
      console.log(result);
      setRes(result);
    }
  };

  useEffect(() => {
    fetchRequest();
  }, [img]);

  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          fetchRequest();
        }}
        className="mb-4"
      >
        <input
          className="col-3 form-control-sm py-1 fs-4 text-capitalize border border-3 border-dark"
          type="text"
          placeholder="Search Anything..."
          value={img}
          onChange={(e) => setImg(e.target.value)}
        />
        {/* <button type="submit">Submit</button> */}
      </form>
      <div>
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {res.map((item) => (
            <div key={item.id} className="grid-item">
              <img src={item.urls.small} alt={item.description} />
            </div>
          ))}
        </Masonry>
      </div>
    </div>
  );
}

export default UnsplashAPI;
