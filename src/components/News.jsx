import  { Component } from "react";
import NewsItem from "./NewsItem";
import axios from "axios";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

class News extends Component {
  static defaultProps = {
    country: "us",
    pageSize: 9,
    category: "general",
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
    setProgress: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0,
    };
    document.title = `NewsCaper - ${this.capitalize(this.props.category)}`;
  }

  capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  componentDidMount() {
    this.fetchNews();
  }

  fetchNews = async () => {
    const { page } = this.state;
    const { country, category, pageSize, setProgress } = this.props;
    const apiKey = this.props.apiKey;
    const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}&page=${page}&pageSize=${pageSize}`;

    try {
      setProgress(10);
      const response = await axios.get(url);
      setProgress(30);
      const { articles, totalResults } = response.data;
      setProgress(70);
      this.setState({
        articles,
        totalResults,
        loading: false,
      });
      setProgress(100);
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };

  fetchMoreData = async () => {
    this.setState((prevState) => ({
      page: prevState.page + 1,
    }));

    const { page } = this.state;
    const { country, category, pageSize } = this.props;
    const apiKey = this.props.apiKey;
    const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}&page=${page}&pageSize=${pageSize}`;

    try {
      const response = await axios.get(url);
      const { articles, totalResults } = response.data;
      this.setState((prevState) => ({
        articles: prevState.articles.concat(articles),
        totalResults,
        loading: false,
      }));
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };

  render() {
    const { articles, totalResults, loading } = this.state;
    const { category } = this.props;

    return (
      <div>
        <h2 className="text-center" style={{ margin: "35px 0" }}>
          NewsCaper - Top Headlines from{" "}
          {`${this.capitalize(category)}`}
        </h2>

        {loading && <Spinner />}

        <InfiniteScroll
          dataLength={articles.length}
          next={this.fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<h5> <Spinner/> </h5>}
        >
          <div className="container">
            <div className="row">
              {articles.map((element) => {
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
                  <div className="col-md-4" key={url}>
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
  }
}

export default News;
