import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

const ImageList = () => {
  const images = useSelector((state) => state.imageSearch.images);
  
  return (
    <div style={{ height: 500, overflowY: 'scroll' }}>
      {images.length > 0 ? (
        <ul>
          {images.map((image) => (
            <li key={image.id}>
              <img src={image.previewURL} alt={image.tags} />
            </li>
          ))}
        </ul>
      ) : (
        <p>Không tìm thấy hình ảnh.</p>
      )}
    </div>
  );
};

const ImageSearchApp = () => {
  const dispatch = useDispatch();
  const query = useSelector((state) => state.imageSearch.query);

  const fetchImages = async () => {
    const response = await axios.get(
      `https://pixabay.com/api/?key=46166847-40e887f0f1cbd269c98d3b401&q=${query.trim()}&image_type=photo`
    );
    dispatch({ type: 'SET_IMAGES', payload: response?.data?.hits ?? [] });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchImages();
  };

  return (
    <div style={{ margin: 24, width: 500, paddingRight: 24, border: '3px solid #ccc', textAlign: 'center' }}>
      <h1>Tìm kiếm hình ảnh</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => dispatch({ type: 'SET_QUERY', payload: e.target.value })}
          placeholder="Tìm kiếm hình ảnh"
        />
        <button type="submit">Tìm</button>
      </form>
      <ImageList />
    </div>
  );
};

export default ImageSearchApp;
