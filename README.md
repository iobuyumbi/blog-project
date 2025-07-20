[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-2e0aaae1b6195c2367325f4f02e2d04e9abb55f0b24a779b69b11b9e10269abc.svg)](https://classroom.github.com/online_ide?assignment_repo_id=19904435&assignment_repo_type=AssignmentRepo)

# MERN Stack Integration Assignment

This assignment focuses on building a full-stack MERN (MongoDB, Express.js, React.js, Node.js) application that demonstrates seamless integration between front-end and back-end components.

## Deployed Applications

- **Frontend:** https://blog-project-beta-two.vercel.app
- **Backend API:** https://blog-project-v450.onrender.com

## Assignment Overview

You will build a blog application with the following features:

1. RESTful API with Express.js and MongoDB
2. React front-end with component architecture
3. Full CRUD functionality for blog posts
4. User authentication and authorization
5. Advanced features like image uploads and comments

## Project Structure

```
mern-blog/
├── client/                 # React front-end
│   ├── public/             # Static files
│   ├── src/                # React source code
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── services/       # API services
│   │   ├── context/        # React context providers
│   │   └── App.jsx         # Main application component
│   └── package.json        # Client dependencies
├── server/                 # Express.js back-end
│   ├── config/             # Configuration files
│   ├── controllers/        # Route controllers
│   ├── models/             # Mongoose models
│   ├── routes/             # API routes
│   ├── middleware/         # Custom middleware
│   ├── utils/              # Utility functions
│   ├── server.js           # Main server file
│   └── package.json        # Server dependencies
└── README.md               # Project documentation
```

## Getting Started

1. Accept the GitHub Classroom assignment invitation
2. Clone your personal repository that was created by GitHub Classroom
3. Follow the setup instructions in the `Week4-Assignment.md` file
4. Complete the tasks outlined in the assignment

## Files Included

- `Week4-Assignment.md`: Detailed assignment instructions
- Starter code for both client and server:
  - Basic project structure
  - Configuration files
  - Sample models and components

## Requirements

- Node.js (v18 or higher)
- MongoDB (local installation or Atlas account)
- npm or yarn
- Git

## CI/CD Pipeline

- **GitHub Actions** is used for continuous integration and deployment.
- Workflows run tests, lint code, and deploy to Vercel (frontend) and Render (backend).
- Example workflow files are in `.github/workflows/`.

### Screenshots

_Add screenshots of your GitHub Actions pipeline, Vercel, and Render deployments here._

## Monitoring & Maintenance

- Health check endpoints are implemented in the backend (`/api/health`).
- Uptime monitoring is set up via Render and Vercel dashboards.
- Error tracking is handled by backend error middleware.
- Performance can be monitored using Render/Vercel analytics and browser dev tools.

## Deployment & Rollback

- **Frontend:**
  - Push to `main` branch triggers Vercel deployment.
  - Rollback: Use Vercel dashboard to redeploy previous commit.
- **Backend:**
  - Push to `main` branch triggers Render deployment.
  - Rollback: Use Render dashboard to redeploy previous build.

## Submission

Your work will be automatically submitted when you push to your GitHub Classroom repository. Make sure to:

1. Complete both the client and server portions of the application
2. Implement all required API endpoints
3. Create the necessary React components and hooks
4. Document your API and setup process in the README.md
5. Include screenshots of your working application

## Resources

- [MongoDB Documentation](https://docs.mongodb.com/)
- [Express.js Documentation](https://expressjs.com/)
- [React Documentation](https://react.dev/)
- [Node.js Documentation](https://nodejs.org/en/docs/)
- [Mongoose Documentation](https://mongoosejs.com/docs/)
