# E-Commerce Price Comparator

This project is an e-commerce price comparator interface built with Next.js and FastAPI. It allows users to compare prices from different e-commerce platforms, offering both sample and advanced search features.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Sample Search**: Quick price comparison based on popular categories.
- **Advanced Search**: Detailed search with filters for price range, brands, and other specifications.
- **Responsive Design**: Optimized for both desktop and mobile devices.
- **FastAPI Backend**: Efficient data processing and handling.

## Tech Stack

- **Frontend**: Next.js, React
- **Backend**: FastAPI
- **Database**: SQLite (for development), PostgreSQL (for production)
- **Styling**: Tailwind CSS
- **Authentication**: JWT

## Installation

1. **Clone the repository**:
   ```sh
   git clone https://github.com/yourusername/ecommerce-price-comparator.git
   cd ecommerce-price-comparator
   ```

2. **Set up the backend**:
   ```sh
   cd backend
   python -m venv venv
   source venv/bin/activate   # On Windows, use `venv\Scripts\activate`
   pip install -r requirements.txt
   uvicorn main:app --reload
   ```

3. **Set up the frontend**:
   ```sh
   cd frontend
   npm install
   npm run dev
   ```

4. **Environment Variables**:
   Create a `.env` file in both `backend` and `frontend` directories and add the necessary environment variables. Refer to `.env.example` for guidance.

## Usage

1. **Run the backend server**:
   ```sh
   cd backend
   uvicorn main:app --reload
   ```

2. **Run the frontend development server**:
   ```sh
   cd frontend
   npm run dev
   ```

3. **Open your browser** and navigate to `http://localhost:3000` to access the application.

## API Endpoints

- **GET /api/products**: Get a list of products for sample search.
- **POST /api/search**: Perform an advanced search with filters.
- **GET /api/product/{id}**: Get details of a specific product.

## Contributing

We welcome contributions from the community! Here’s how you can help:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.


# parazoneTest
