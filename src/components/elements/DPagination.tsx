interface DPaginationProps<T> {
  data: T[];
  currentPage: number;
}

const DPagination = <T,>({ data, currentPage }: DPaginationProps<T>) => {
  return (
    <div className="flex space-x-2">
      {data.map((_, index) => (
        <div
          key={index}
          className={`h-1 w-6 ${
            currentPage === index ? "bg-green-2" : "bg-white-1"
          }`}
        />
      ))}
    </div>
  );
};

export default DPagination;
