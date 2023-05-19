import  { Component } from "react";
import defaultImage from "../assets/12.jpg";
import "../index.css";

class NewsItem extends Component {
  render() {
    const { title, description, urlToImage, url, author, date, source } =
      this.props;

    return (
      <div className="my-3">
        <div className="card cardStyle">
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              position: "absolute",
              right: "0",
            }}
          >
            <span className="badge rounded-pill bg-danger">{source.name}</span>
          </div>

          <img
            src={urlToImage || defaultImage}
            className="card-img-top news-card-img"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>

            <p className="card-text">
              <small className="text-info-emphasis">
                By {author || "Unknown"} on {new Date(date).toGMTString()}
              </small>
            </p>
           

            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-sm btn-dark"
            >
              Read More..
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
