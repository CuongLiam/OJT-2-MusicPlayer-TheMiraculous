import type { CloudinaryResponse } from "../../types/cloudinary.type";

const CLOUD_NAME = 'douhnxire';
const PRESET_SONG = 'music-songs';
const PRESET_IMAGE = 'music-images';



/**
 * Upload file lên Cloudinary
 * @param file - File lấy từ sự kiện e.target.files[0]
 * @param resourceType - Loại tài nguyên:
 * - 'image': Dùng cho Ảnh bìa, Avatar (sẽ dùng preset music-images)
 * - 'video': Dùng cho Nhạc MP3 (sẽ dùng preset music-songs)
 */
export const uploadToCloudinary = async (
  file: File,
  resourceType: 'image' | 'video'
): Promise<CloudinaryResponse> => {

  // 1. Tạo Endpoint API
  const apiEndpoint = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/${resourceType}/upload`;

  // 2. Tạo FormData
  const formData = new FormData();
  formData.append('file', file);

  // 3. Logic chọn Preset tự động
  // Nếu là 'video' (nhạc) -> Dùng PRESET_SONG
  // Nếu là 'image' (ảnh) -> Dùng PRESET_IMAGE
  const presetToUse = resourceType === 'video' ? PRESET_SONG : PRESET_IMAGE;
  formData.append('upload_preset', presetToUse);

  try {
    const response = await fetch(apiEndpoint, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'Upload thất bại');
    }

    const data: CloudinaryResponse = await response.json();
    return data;
    
  } catch (error) {
    console.error('Lỗi khi upload lên Cloudinary:', error);
    throw error;
  }
};

//=====================================================================================
// // 1. Hàm xử lý khi chọn ẢNH BÌA
// const handleUploadCover = async (e: React.ChangeEvent<HTMLInputElement>) => {
//   const file = e.target.files?.[0];
//   if (file) {
//     // Truyền 'image' -> Code sẽ dùng preset music-images -> Vào folder ảnh
//     const data = await uploadToCloudinary(file, 'image');
//     console.log("Link Ảnh:", data.secure_url); 
//   }
// };

// // 2. Hàm xử lý khi chọn FILE NHẠC
// const handleUploadSong = async (e: React.ChangeEvent<HTMLInputElement>) => {
//   const file = e.target.files?.[0];
//   if (file) {
//     // Truyền 'video' -> Code sẽ dùng preset music-songs -> Vào folder nhạc
//     const data = await uploadToCloudinary(file, 'video');
//     console.log("Link Nhạc:", data.secure_url);
//     console.log("Thời lượng bài hát:", data.duration, "giây");
//   }
// };