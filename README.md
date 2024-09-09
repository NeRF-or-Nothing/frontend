# NeRF-or-Nothing Web Application Frontend

## Overview

NeRF-or-Nothing is a full-stack application that allows users to create and interact with 3D scenes using Neural Radiance Fields (NeRF) technology. The frontend implementation provides features such as user authentication, video upload, scene processing, and 3D scene visualization.

## Table of Contents

- [Installation](#installation)
- [Project Structure](#project-structure)
- [Key Features](#key-features)
- [Technology Stack](#technology-stack)
- [Development Workflow](#development-workflow)
- [Contributing](#contributing)
- [Testing](#testing)
- [Deployment](#deployment)
- [Additional Resources](#additional-resources)

## Installation

To set up the project locally, follow these steps:

1. Ensure that you have a Node.js package manager installed 

2. Clone the repository:
   ```
   git clone https://github.com/your-repo/nerf-or-nothing.git
   cd nerf-or-nothing
   ```

3. Install dependencies:
   ```
   npm install
   ```
   or
   ```
   yarn install
   ```
   

5. Set up environment variables:
   Create a `.env` file in the root directory and add the following:
   ```
   BACKEND_URL=http://localhost:5000
   ```
   Adjust the URL as needed for your backend server.

7. Start the development server:
   ```
   npm run dev
   ```
   or
   ```
   yarn dev
   ```

8. Open your browser and navigate to `http://localhost:5173` (or the port specified by Vite).

## Project Structure

The project follows a component-based architecture. Key directories include:

- `/src`: Source code for the application
  - `/Components`: React components
  - `/Context`: React context providers
  - `/Fetch`: API call functions
  - `/Types`: TypeScript type definitions
  - `/Util`: Utility functions and constants

## Key Features

- User authentication (signup, login, logout)
- Video upload for 3D scene creation
- Scene processing with various output types (e.g., splat cloud, point cloud)
- Live processing process
- 3D scene visualization using Three.js
- Scene history and management

## Technology Stack

- React
- TypeScript
- Vite
- Mantine UI
- Three.js
- React Three Fiber 

## Development Workflow

1. Create a new branch for your feature or bug fix.
2. Implement your changes, following the project's coding standards.
3. Write or update tests as necessary.
4. Run tests and ensure all pass.
5. Submit a pull request for review.

## Contributing

We welcome contributions to NeRF-or-Nothing! Please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and commit them with clear, descriptive messages.
4. Push your changes to your fork.
5. Submit a pull request to the main repository.

Please ensure your code adheres to the project's coding standards and includes appropriate tests.

## Testing

Run tests using the following command:

```
npm test
```

Ensure all tests pass before submitting a pull request.

## Deployment

Deployment instructions are available in the [Deployment Guide](./wiki/Deployment-Guide.md) in the project wiki.

## Additional Resources

For more detailed information about the project, please refer to the following wiki pages:

- [Wiki Home](./wiki/Home)
- [Architecture Overview](./wiki/Architecture-Overview)
- [Component Guide](./wiki/Component-Guide)
- [State Management](./wiki/State-Management)
- [API Integration](./wiki/API-Integration)
- [Authentication](./wiki/Authentication)
- [Routing](./wiki/Routing)
- [Styling and Theming](./wiki/Styling-and-Theming)
- [Testing and Quality Assurance](./wiki/Testing-and-Quality-Assurance)
- [Deployment Guide](./wiki/Deployment-Guide)
