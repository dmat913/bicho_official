"use client";
import { ChangeEvent, useEffect, useState } from "react";

interface ImageData {
  contentType: string;
  data: string;
}

const ImageUpload: React.FC = () => {
  // upload image data
  const [uploadImage, setUploadImage] = useState<string>("");
  // 画像一覧 data
  const [images, setImages] = useState<ImageData[]>([]);

  // 画像一覧取得
  const fetchImages = async () => {
    const response = await fetch("/api/image");
    if (response.ok) {
      const data: ImageData[] = await response.json();
      setImages(data);
    } else {
      console.error("Failed to fetch images:", response.statusText);
    }
  };

  // 初回読み込み時,画像一覧取得
  useEffect(() => {
    fetchImages();
    // eslint-disable-next-line
  }, []);

  // アップロードボタン押下時
  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!uploadImage) {
      alert("画像が選択されていません");
      return;
    }
    // Api 呼び出し
    const response = await fetch("/api/image", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ uploadImage }),
    });
    if (response.ok) {
      alert("画像がアップロードされました");
      setUploadImage("");
      fetchImages();
    } else {
      alert("アップロードに失敗しました");
    }
  };

  // file選択時,base64に変換
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setUploadImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <form onSubmit={handleUpload}>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        required
      />
      <button type="submit" className="bg-yellow-100 border mt-3">
        アップロード
      </button>
      {images.map((img, index) => (
        <div key={index}>
          <img src={img.data} alt={`Image ${index}`} />
        </div>
      ))}
    </form>
  );
};

export default ImageUpload;
