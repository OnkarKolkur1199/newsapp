import React, { Component } from "react";
import NewsItem from "./NewsItem";

export class News extends Component {
  
  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page:1
    };
  }

  async componentDidMount(){
    // let url = "https://newsapi.org/v2/top-headlines?country=us&apiKey=a87ff5d3028f4679a5bc8252d6dd3f61";
    // let url = "https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=a87ff5d3028f4679a5bc8252d6dd3f61";
    let url = "https://newsapi.org/v2/everything?domains=india.com&apiKey=a87ff5d3028f4679a5bc8252d6dd3f61&page=1&pageSize=12";
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({articles: parsedData.articles})

  }

  handlePrevClick = async () =>{
    console.log("Previous")
    let url = `https://newsapi.org/v2/everything?domains=india.com&apiKey=a87ff5d3028f4679a5bc8252d6dd3f61&page=${this.state.page - 1}&pageSize=12`;
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      page: this.state.page - 1,
      articles: parsedData.articles
    })
  }

  handleNextClick = async () =>{
    console.log("Next");
    let url = `https://newsapi.org/v2/everything?domains=india.com&apiKey=a87ff5d3028f4679a5bc8252d6dd3f61&page=${this.state.page + 1}&pageSize=12`;
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      page: this.state.page + 1,
      articles: parsedData.articles
    })
  }

  render() {
    return (
      <div className="container my-3">
        <h2>NewsMonkey - Top Headlines</h2>
        <div className="row">
          {this.state.articles.map((element) => {
            return (
              <div className="col-md-4" key={element.url}>
                <NewsItem
                  title={element.title?element.title:""}
                  description={element.description?element.description:""}
                  imageUrl={element.urlToImage}
                  newsUrl={element.url}
                />
              </div>
            );
          })}
        </div>
        <div className="container d-flex justify-content-between">
        <button disabled={this.state.page<=1} type="button" class="btn btn-dark" onClick={this.handlePrevClick}> &larr; Previous</button>
        <button type="button" class="btn btn-dark" onClick={this.handleNextClick}>Next &rarr; </button>
        </div>
      </div>
    );
  }
}

export default News;
