# Setur Frontend Assignment

This project is a React-based e-commerce application built with Next.js, fulfilling the requirements of the Setur Frontend Assignment. It includes features like product listing with advanced filtering, a product detail page, and a persistent shopping cart.

## Features

- **Product Listing Page (`/`)**: Displays products with pagination, sorting, and multiple filtering options.
- **Product Detail Page (`/product/[id]`)**: Shows detailed information for a single product.
- **Shopping Cart**: Add items to a cart that persists across sessions using `localStorage`.
- **Responsive Design**: Adapts to different screen sizes for a seamless experience on mobile and desktop.
- **Server-Side Rendering (SSR)**: All initial data fetching is done on the server for optimal performance.

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- [Node.js](https://nodejs.org/) (version 18.x or later)
- [npm](https://www.npmjs.com/)

### Installation

1.  Clone the repo
    ```sh
    git clone https://github.com/your_username/setur-assignment.git
    ```
2.  Navigate to the project directory
    ```sh
    cd setur-assignment
    ```
3.  Install NPM packages
    ```sh
    npm install
    ```
4.  Run the development server
    ```sh
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Technologies Used

- **[Next.js](https://nextjs.org/)**: React framework for server-side rendering and static site generation.
- **[React](https://reactjs.org/)**: JavaScript library for building user interfaces.
- **[TypeScript](https://www.typescriptlang.org/)**: Typed superset of JavaScript.
- **[Styled Components](https://styled-components.com/)**: For component-level styling with CSS-in-JS.
- **[Jest](https://jestjs.io/)** & **[React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)**: For unit and component testing.

## Atomic Design Structure

This project follows the principles of Atomic Design to organize components into a logical and scalable hierarchy.

- **Atoms (`src/components/atoms`)**: The smallest, indivisible UI elements. _Although not explicitly created in this project, components like styled `input` or `button` would reside here._
- **Molecules (`src/components/molecules`)**: Groups of atoms that function together as a unit.
  - _Example_: `ProductCard.tsx` combines an image, title, price, and rating to form a single product card.
  - _Example_: `Search.tsx` combines a label, input, and button to create a search form.
- **Organisms (`src/components/organisms`)**: Complex UI components composed of molecules and/or atoms.
  - _Example_: `ProductList.tsx` arranges multiple `ProductCard` molecules into a responsive grid.
  - _Example_: `Header.tsx` combines the logo and cart information into a page header.

## Test Coverage

The project meets the requirement of >60% test coverage.

### Running Tests

To run the tests and see the coverage report, use the following command:

```sh
npm run test:coverage
```

### Coverage Report

```
-------------------------|---------|----------|---------|---------|-------------------
File                     | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
-------------------------|---------|----------|---------|---------|-------------------
All files                |    60.1 |    49.15 |   59.18 |   61.93 |
 app                     |       0 |        0 |       0 |       0 |
  layout.tsx             |       0 |      100 |       0 |       0 | 7-17
  page.tsx               |       0 |        0 |       0 |       0 | 10-65
 app/product/[id]        |       0 |        0 |       0 |       0 |
  page.tsx               |       0 |        0 |       0 |       0 | 13-50
 components/molecules    |   98.87 |    91.66 |     100 |   98.85 |
  FilterByCategory.tsx   |   94.44 |       75 |     100 |   94.44 | 41
  FilterByPriceRange.tsx |     100 |      100 |     100 |     100 |
  Pagination.tsx         |     100 |       50 |     100 |     100 | 35
  ProductCard.tsx        |     100 |      100 |     100 |     100 |
  Search.tsx             |     100 |      100 |     100 |     100 |
  SortByPrice.tsx        |     100 |      100 |     100 |     100 |
 components/organisms    |   26.92 |       50 |   28.57 |      24 |
  FilterBar.tsx          |       0 |      100 |       0 |       0 | 5-16
  Header.tsx             |     100 |      100 |     100 |     100 |
  ProductDetail.tsx      |       0 |        0 |       0 |       0 | 9-104
  ProductGrid.tsx        |       0 |      100 |     100 |       0 | 5
  ProductList.tsx        |       0 |      100 |       0 |       0 | 12-15
 contexts                |     100 |    83.33 |     100 |     100 |
  CartContext.tsx        |     100 |    83.33 |     100 |     100 | 38
 lib                     |       0 |        0 |       0 |       0 |
  registry.tsx           |       0 |        0 |       0 |       0 | 12-22
-------------------------|---------|----------|---------|---------|-------------------
```
