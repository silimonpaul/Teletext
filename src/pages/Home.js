import React from "react";
import styled from "styled-components";

const HomeContainer = styled.div`
  padding: 1rem;
  background-color: #000;
  min-height: 50vh;
  font-family: "Courier New", monospace;
`;

const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 2rem;
`;

const MenuGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  padding: 1rem;
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

const Title = styled.h1`
  font-size: 5rem;
  text-align: center;
  margin-bottom: 8rem;
  width: 100%;
`;

const TitleSpan = styled.span`
  color: ${(props) => props.color};
`;

function Home() {
  return (
    <HomeContainer>
      <Header>
        <Title>
          <TitleSpan color="#00f">TEL</TitleSpan>
          <TitleSpan color="#ff0">ETE</TitleSpan>
          <TitleSpan color="#f00">XT</TitleSpan>
        </Title>
      </Header>
      <MenuGrid>
        <MenuColumn>
          <div>PRESS NUMBERS ON REMOTE</div>
          <div>NEWS...................................140</div>
          <div>RADIO..................................170</div>
          <div>SPORT..................................200</div>
          <div>PROGRAMS...............................300</div>
          <div>WEATHER................................105</div>
          <div>DE CE CITESTI TOT?.....................500</div>
        </MenuColumn>
      </MenuGrid>
    </HomeContainer>
  );
}

export default Home;
