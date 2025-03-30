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

const SportsContainer = styled.div`
  padding: 2rem;
`;

const SportsSection = styled.div`
  border: 1px solid #00f;
  padding: 1rem;
  margin-bottom: 1rem;
`;

const NewsItem = styled.div`
  margin-bottom: 1rem;
  padding: 0.5rem;
  border-bottom: 1px dashed #00f;
  background-color: ${(props) => (props.$highlight ? "#f00" : "transparent")};
  color: ${(props) => (props.$highlight ? "#ff0" : "#fff")};
`;

function Sports() {
  const [news, setNews] = useState([]);  // Changed from matches to news
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSportsNews = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "https://newsapi.org/v2/top-headlines?category=sports&language=en&apiKey=9ad154235a4d44fe93a9e52cedbec7bf"
        );
        const data = await response.json();

        if (!data.articles || data.articles.length === 0) {
          throw new Error("No sports news found");
        }

        const newsItems = data.articles.slice(0, 8).map((article, index) => ({
          id: index + 1,
          title: article.title || "No title available",
          description: article.description || "No description available",
          source: article.source?.name || "Unknown Source",
          publishedAt: new Date(article.publishedAt).toLocaleTimeString(),
        }));

        setNews(newsItems);
        setError(null);
      } catch (error) {
        console.error("Error fetching sports news:", error);
        setError("Failed to load sports news");
      }
      setLoading(false);
    };

    fetchSportsNews();
    const interval = setInterval(fetchSportsNews, 300000);
    return () => clearInterval(interval);
  }, []);

  return (
    <NewsContainer>
      <Header>
        <DateTime>{new Date().toLocaleString()}</DateTime>
      </Header>
      <NewsSection>
        <MenuColumn>
          <div>SPORTS NEWS</div>
          {news.map((item, index) => (
            <div key={item.id}>
              {(index + 1).toString().padStart(2, "0")}. {item.title?.substring(0, 30)}...
            </div>
          ))}
        </MenuColumn>
        <NewsContent>
          <h2>TOP STORIES</h2>
          {loading ? (
            <LoadingText>Loading news...</LoadingText>
          ) : error ? (
            <ErrorText>{error}</ErrorText>
          ) : (
            news.map((item, index) => (
              <NewsItem key={item.id} $highlight={index === 0}>
                <h3>{item.title}</h3>
                <p style={{ fontSize: "1rem", margin: "1rem 0" }}>
                  {item.description}
                </p>
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

export default Sports;
