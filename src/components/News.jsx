import NewsItem from "./NewsItem";
import axios from "axios";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
import { useEffect, useState } from "react";

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  useEffect(() => {
    fetchNews();
    // eslint-disable-next-line
  }, []);

  const fetchNews = async () => {
    // eslint-disable-next-line
    const { country, category, pageSize, setProgress, apiKey } = props; 
    const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}&page=${page}&pageSize=${pageSize}`;

    try {
      setProgress(10);
      const response = await axios.get(url);
      setProgress(30);
      const { articles, totalResults } = response.data;
      setProgress(70);
      setArticles(articles);
      setTotalResults(totalResults);
      setLoading(false);
      setProgress(100);
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };

 
  
const fetchMoreData = async () => {
    // eslint-disable-next-line
    const { country, category, pageSize, apiKey } = props;
    const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}&page=${page+1}&pageSize=${pageSize}`;
    setPage(page+1);

    

    try {
      const response = await axios.get(url);
      const { articles, totalResults } = response.data;
      setArticles((prevArticles) => prevArticles.concat(articles));
      setTotalResults(totalResults);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };

  const { category } = props;

  return (
    <div>
      <h2 className="text-center" style={{ margin: "35px 0", marginTop:"90px" }}>
        NewsCaper - Top Headlines from {capitalize(category)}
      </h2>

      {loading && <Spinner />}

      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<h5> <Spinner/> </h5>}
      >
        <div className="container">
          <div className="row">
            {articles.map((element,index) => {
              const {
                title,
                description,
                urlToImage,
                url,
                author,
                publishedAt,
                source,
              } = element;

              return (
                <div className="col-md-4" key={`${url}+${index}`}>
                  <NewsItem
                    title={title || ""}
                    description={description || ""}
                    url={url}
                    urlToImage={urlToImage}
                    author={author}
                    date={publishedAt}
                    source={source}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </InfiniteScroll>
    </div>
  );
};

News.defaultProps = {
  country: "us",
  pageSize: 9,
  category: "general",
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
  setProgress: PropTypes.func.isRequired,
};

export default News;
