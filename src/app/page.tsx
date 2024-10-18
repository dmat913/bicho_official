"use client";
import { useState } from "react";

const ImageUpload: React.FC = () => {
  const [image, setImage] = useState<File | null>(null);

  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!image) {
      alert("画像が選択されていません");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);

    const response = await fetch("/api/image", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      alert("画像がアップロードされました");
      setImage(null); // アップロード後に画像をリセット
    } else {
      alert("アップロードに失敗しました");
    }
  };

  return (
    <form onSubmit={handleUpload}>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          if (e.target.files && e.target.files.length > 0) {
            setImage(e.target.files[0]);
          }
        }}
        required
      />
      <button type="submit" className="bg-yellow-100 border mt-3">
        アップロード
      </button>
    </form>
  );
};

export default ImageUpload;
