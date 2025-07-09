"use client";

import styled from "styled-components";

const Title = styled.h1`
  font-size: 2rem;
  color: blue;
  text-align: center;
`;

export default function Home() {
  return (
    <div>
      <Title>Hello, Styled Components!</Title>
    </div>
  );
}
