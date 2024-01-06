import { React, useState } from 'react';
import css from './ImageGalleryItem.module.css';
import { MyModal } from 'components/Modal/Modal';

export const ImageGalleryItem = ({ images }) => {
  const [showModal, setShowModal] = useState(false);
  const [tagsState, setTags] = useState('');
  const [largeImageURLState, setLargeImageURL] = useState('');

  const onOpenModal = (largeImageURL, tags) => {
    setShowModal(true);
    setTags(tags);
    setLargeImageURL(largeImageURL);
  };
  const onCloseModal = () => {
    setShowModal(false);
    setTags('');
    setLargeImageURL('');
  };

  return images.map(({ id, webformatURL, tags, largeImageURL }) => {
    return (
      <>
        <li
          className={css.galleryItem}
          key={id}
          onClick={() => onOpenModal(largeImageURL, tags)}
        >
          <img className={css.imageGalleryItem} src={webformatURL} alt={tags} />
        </li>
        {showModal && (
          <MyModal
            modalIsOpen={showModal}
            modalIsClose={onCloseModal}
            largeImg={largeImageURLState}
            tags={tagsState}
          />
        )}
      </>
    );
  });
};
