import { memo } from "react";

const DLoading = () => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="animate-spin h-10 w-10 border-4 border-t-transparent border-green-2 rounded-full"></div>
    </div>
  );
};

export default memo(DLoading);
