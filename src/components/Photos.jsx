import { useState, useEffect } from 'react'

const Photos = () => {
  const [photos, setPhotos] = useState([])

  useEffect(() => {
    const fetchPhoto = async () => {
      const response = await fetch(`https://jsonplaceholder.typicode.com/photos`);
      const photos = await response.json();
      setPhotos(photos[0]);
    };
    fetchPhoto();
  }, []);

  return (
    <img src={photos ? photos.url : ''} alt={photos ? photos.title : ''} />
  )
}

export { Photos }