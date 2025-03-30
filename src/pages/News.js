import React, { useState, useEffect } from "react";
import styled from "styled-components";

const NewsContainer = styled.div`
  padding: 1rem;
  background-color: #000;
  min-height: 100vh;
  font-family: "Courier New", monospace;
  color: #fff;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  border-bottom: 2px solid #fff;
  padding-bottom: 0.5rem;
`;

const DateTime = styled.div`
  color: #fff;
  font-size: 1.2rem;
`;

const NewsSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
`;

const MenuColumn = styled.div`
  div {
    padding: 0.5rem;
    margin-bottom: 0.5rem;
    &:nth-child(odd) {
      background-color: #00f;
      color: #fff;
    }
    &:nth-child(even) {
      background-color: #ff0;
      color: #000;
    }
  }
`;

const NewsContent = styled.div`
  background-color: #000;
  padding: 1rem;
  h2 {
    color: #ff0;
    margin-bottom: 1rem;
    text-transform: uppercase;
  }
`;

const NewsItem = styled.div`
  margin-bottom: 1.5rem;
  padding: 0.5rem;
  background-color: ${(props) => (props.highlight ? "#f00" : "transparent")};
  color: ${(props) => (props.highlight ? "#ff0" : "#fff")};
  h3 {
    color: #ff0;
    margin-bottom: 0.5rem;
    font-size: 1.2rem;
  }
  p {
    color: #fff;
    line-height: 1.4;
  }
`;

const LoadingText = styled.p`
  color: #ff0;
  font-size: 1.5rem;
  text-align: center;
  background-color: #00f;
  padding: 1rem;
`;

const ErrorText = styled.p`
  color: #fff;
  font-size: 1.2rem;
  text-align: center;
  background-color: #f00;
  padding: 1rem;
`;

function News() {
  const [news, setNews] = useState([
    {
      id: 1,
      title: "Loading Latest Headlines...",
      description: "Please wait while we fetch the latest news.",
      source: "News Service",
      publishedAt: new Date().toLocaleDateString(),
    },
  ]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        // Fetch top stories IDs
        const topStoriesResponse = await fetch(
          "https://hacker-news.firebaseio.com/v0/topstories.json"
        );
        const storyIds = await topStoriesResponse.json();

        // Fetch details for first 8 stories
        const storyPromises = storyIds
          .slice(0, 8)
          .map((id) =>
            fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`).then(
              (res) => res.json()
            )
          );

        const stories = await Promise.all(storyPromises);

        const articles = stories.map((story, index) => ({
          id: index + 1,
          title: story.title,
          description: story.text || `View full story at: ${story.url}`,
          source: "Hacker News",
          publishedAt: new Date(story.time * 1000).toLocaleDateString(),
        }));

        setNews(articles);
        setError(null);
      } catch (error) {
        console.error("Error fetching news:", error);
        setError("Unable to load news. Please try again later.");
      }
      setLoading(false);
    };

    fetchNews();
    const interval = setInterval(fetchNews, 300000); // Update every 5 minutes
    return () => clearInterval(interval);
  }, []);

  return (
    <NewsContainer>
      <Header>
        <DateTime>{new Date().toLocaleString()}</DateTime>
      </Header>
      <NewsSection>
        <MenuColumn>
          <div>LATEST HEADLINES</div>
          {news.map((item, index) => (
            <div key={item.id}>
              {(index + 1).toString().padStart(2, "0")}.{" "}
              {item.title.substring(0, 35)}...
            </div>
          ))}
        </MenuColumn>
        <NewsContent>
          <h2>BREAKING NEWS</h2>
          {loading ? (
            <LoadingText>Loading news...</LoadingText>
          ) : error ? (
            <ErrorText>{error}</ErrorText>
          ) : (
            news.map((item, index) => (
              <NewsItem key={item.id} highlight={index === 0}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <small style={{ color: "#0f0" }}>
                  {item.source} | {item.publishedAt}
                </small>
              </NewsItem>
            ))
          )}
        </NewsContent>
      </NewsSection>
    </NewsContainer>
  );
}

export default News;
