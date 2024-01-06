import React, { useEffect, useState } from 'react';
import * as ImageService from './Service/ImagesApi';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';

const App = () => {
  const [images, setImages] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isEmpty, setIsEmpty] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const getImages = async (searchName, page) => {
    if (!searchName) return;
    setIsLoading(true);
    setError('');
    try {
      const { hits, totalHits } = await ImageService.getAllImages(
        searchName,
        page
      );
      if (hits.length === 0) {
        setIsEmpty(true);
      }
      setImages(prevState => [...prevState, ...hits]);
      setIsVisible(page < Math.ceil(totalHits / 12));
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getImages(searchName, page);
  }, [searchName, page]);

  const handleSubmit = value => {
    setSearchName(value);
    setPage(1);
    setImages([]);
    setError([]);
    setIsEmpty(false);
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
    setIsLoading(true);
  };

  return (
    <>
      <div
        style={{
          height: '100vh',
          display: 'grid',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: 40,
          color: 'rgb(164, 218, 220)',
        }}
      >
        <Searchbar onSubmit={handleSubmit} />

        {error && <h1>{error}</h1>}
        {isEmpty && <h1>Sorry, there is no images</h1>}

        <ImageGallery children={<ImageGalleryItem images={images} />} />
        {isVisible && !isLoading && images.length > 0 && (
          <Button
            onClick={handleLoadMore}
            children={isLoading ? 'Loading' : 'Load more'}
          />
        )}
        {isLoading && <Loader />}
      </div>
    </>
  );
};

export default App;
