import { useState, useEffect } from "react";
import Grid from "../../components/grid/Grid.jsx";
import axios from "axios";
import "./Home.css";

const Home = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/video/")
      .then((resp) => {
        const sortedData = resp.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        ); // Sort by date
        setData(sortedData);
        console.log(data)
      })
      .catch((err) => {
        console.error("Error fetching videos:", err);
      });
  }, []);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const videosToDisplay = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <>
      <Grid data={videosToDisplay} />
      {totalPages > 1 && (
        <nav aria-label="Page navigation">
          <ul className="pagination justify-content-center mt-3">
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <a className="page-link" onClick={handlePrevious}>
                Previous
              </a>
            </li>
            {[...Array(totalPages)].map((_, index) => (
              <li
                key={index}
                className={`page-item ${
                  index + 1 === currentPage ? "active" : ""
                }`}
              >
                <a
                  className="page-link"
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </a>
              </li>
            ))}
            <li
              className={`page-item ${
                currentPage === totalPages ? "disabled" : ""
              }`}
            >
              <a className="page-link" onClick={handleNext}>
                Next
              </a>
            </li>
          </ul>
        </nav>
      )}
    </>
  );
};

export default Home;
