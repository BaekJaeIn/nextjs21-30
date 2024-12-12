export default function ImagePicker({ images, selectedImage, onSelect }) {
  console.log(images);
  return (
    <div id="image-picker">
      <p>Select an image</p>
      <ul>
        {images.map((image) => (
          <li
            key={image.path}
            onClick={() => onSelect(image.path)}
            className={selectedImage === image.path ? "selected" : undefined}
          >
            <img src={`/public/${image.path}`} alt="" />
          </li>
        ))}
      </ul>
    </div>
  );
}
