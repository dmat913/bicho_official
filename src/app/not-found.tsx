const NotFound = () => {
  return (
    <div className="p-6 flex flex-col items-center justify-center h-screen bg-green-1 text-white-1">
      <h1 className="text-6xl font-bold mb-4 animate-bounceSlow">404</h1>
      <p className="text-xl">お探しのページは見つかりませんでした。</p>
      <p className="mt-4 text-center">
        申し訳ありませんが、入力されたURLは存在しないか、移動された可能性があります。
      </p>
      <a
        href="/"
        className="mt-6 px-4 py-2 bg-green-2 text-white-2 rounded hover:bg-green-3 transition duration-300"
      >
        ホームに戻る
      </a>
    </div>
  );
};

export default NotFound;
