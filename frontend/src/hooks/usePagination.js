// src/hooks/usePagination.js
import { useState } from "react";

const usePagination = (data = [], itemsPerPage = 10) => {
  const [currentPage, setCurrentPage] = useState(1);

  const maxPage = Math.ceil(data.length / itemsPerPage);
  const currentData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const next = () => setCurrentPage(prev => Math.min(prev + 1, maxPage));
  const prev = () => setCurrentPage(prev => Math.max(prev - 1, 1));
  const jump = (page) => {
    const pageNumber = Math.max(1, Math.min(page, maxPage));
    setCurrentPage(pageNumber);
  };

  return { currentData, currentPage, maxPage, next, prev, jump };
};

export default usePagination;
