
export const isImage = (filename) => {
    const imageExtensions = [
      '.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp', '.svg', 
      '.tiff', '.ico', '.heic', '.heif', '.apng', '.avif'
    ];
  
    const extension = filename
      .slice((Math.max(0, filename.lastIndexOf(".")) || Infinity) + 1)
      .toLowerCase();
  
    return imageExtensions.includes(`.${extension}`);
  };
  