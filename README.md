# ZDLabs App Test

# Coding Challenge - Frontend Engineer

## Task

Your task is to build a simple marketplace app with both list and favourites view. The implementation should be written in Typescript using React and meet the following requirements:

1. List a collection of items of your choosing
2. Allow users to add and remove items to a personal 'favourites list'.
3. Provide a view of the user's selected favourite items in the favourites list.

## Things to consider:

- **State Management** - A structured approach suitable for this type of application is required.
- **Creative Flair** - Show off your UX and UI skills.
- **Testing** - Consider testing the most important parts of the application.
- **Data Fetching** - Use a GraphQL API to fetch your data. For data sources, feel free to use any GraphQL API available online, or create your own.
- **Reduce Complexity** - Elegant solutions are generally preferred.

## Rules

Read carefully the following rules:

1. You should make the effort to set up your folder structure as if it were an application that you will be releasing to production. Show off your best practice methods for organizing and managing code.
2. You can use any technologies you feel comfortable with, but we recommend starting with create-react-app or NextJS.
3. You may use any libraries or third party resources such as Google, Stack Overflow, etc. Make sure you indicate the source of any code snippets you leverage.

## Guidelines and FAQ

**How is my work assessed?**

We look for clarity of code (including comments and documentation), extent of automation, the requirement being met, and logical rationale behind design choices.

# Application Setup

This repository contains a monorepo with a frontend and backend application.

**Frontend Application**

The frontend application is built with Next.js and can be accessed at `http://localhost:3000/`.

**Backend Application**

The backend application is built with Node.js and Express and can be accessed at `http://localhost:4000/`. The data is stored in MongoDB.

**Environment Variables**

To facilitate the evaluation of the test, the access keys are provided in the environment variables in .env file.

## How to Run

To run the application, follow the steps below:

1. Install the dependencies:

   ```bash
   yarn
   ```

2. Start the development server:

   ```bash
   yarn start
   ```

3. Run the available test suite for the application:

   ```bash
   yarn test
   ```

4. Create the bundle for publication:

   ```bash
   yarn build
   ```

   A static build has been configured for this project. You can find the static frontend files at the path: `packages/frontend/out`.

Please make sure you have Node.js and Yarn installed on your system before running the commands above.

## Preview:
![Screenshot from 2023-06-03 01-10-41](https://github.com/lbarga/zdlabs-challenge/assets/17840539/c01d3eca-6633-4ae3-9a1f-3e542b617009)

![Screenshot from 2023-06-03 01-10-35](https://github.com/lbarga/zdlabs-challenge/assets/17840539/36b83ad3-cb63-45a6-acdc-67fe18a011a5)
