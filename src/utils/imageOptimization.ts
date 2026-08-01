/**
 * Optimizes a Cloudinary image URL by injecting quality and format parameters.
 * Cloudinary URLs have a specific format: https://res.cloudinary.com/<cloud_name>/image/upload/<version>/<path>
 * We want to inject /f_auto,q_auto/ after /upload/ to let Cloudinary serve the best format (WebP/AVIF) and compress it.
 *
 * @param {string} url - The original image URL.
 * @param {number} width - (Optional) The maximum width to scale the image to.
 * @returns {string} - The optimized image URL.
 */
export const optimizeCloudinaryUrl = (url, width = null) => {
  if (!url || !url.includes('res.cloudinary.com')) {
    return url;
  }

  // Check if it already has optimizations
  if (url.includes('/f_auto') || url.includes('/q_auto')) {
    return url;
  }

  const uploadSegment = '/upload/';
  const uploadIndex = url.indexOf(uploadSegment);
  
  if (uploadIndex === -1) {
    return url;
  }

  const beforeUpload = url.substring(0, uploadIndex + uploadSegment.length);
  const afterUpload = url.substring(uploadIndex + uploadSegment.length);

  let optimizationParams = 'f_auto,q_auto';
  if (width) {
    optimizationParams += `,w_${width}`;
  }

  return `${beforeUpload}${optimizationParams}/${afterUpload}`;
};
