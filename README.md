# W5H
W5H (Who, What, When, Where, Why, How) is a web app that helps job seekers keep track of their job applications.

* Who is the company user applied to (Who did you apply to?)
* What is the position/role of the job (What role?)
* When is the date user applied (When did you apply?)
* Where is the location of the job (Where is it located?)
* Why is the reason for applying (Why did you apply to that company?)
* How is method user used to apply (How did you apply?)

Technologies used: React.js (Create-React-App, React Router, React Hooks), npm, Material-UI, JS, HTML/CSS, Bootstrap, Express, PostgreSQL, Node.js, Heroku

I was inspired to make this when I was making an Excel sheet to organize my job applications during my job search, and realized I could break down each application using the W5H model. Also, I like building projects and learning new technologies more than DS/algorithms and interview prep, so it was a good excuse to put those off to the side (for now).

## Live Link
https://w5h.herokuapp.com/

## Features
* Authentication/authorization (Login/Signup using email/password; JSON Web Tokens stored in local storage, password is also hashed)
* Create, read, update, delete each job application (CRUD); all data is stored in relational database and fetched from API created using Express and node-postgres (to communicate with database)
* See list of job applications user added and check/highlight each job application; will probably add feature to sort the order of jobs in different ways
* Fully responsive on all devices/viewports; front-end built using React/Material-UI/Bootstrap

## Video Walkthrough
https://youtu.be/dqO3EpFPPvc

## Quick Walkthrough

![w5h deployed demo](https://user-images.githubusercontent.com/72715781/109739534-97ee3a80-7b7e-11eb-8d05-7b4ae1e245df.gif)


<!---![w5h WIP demo 2](https://user-images.githubusercontent.com/72715781/109616603-35e3f580-7aea-11eb-9b02-44e04ce51086.gif)-->

<!---![w5h WIP demo](https://user-images.githubusercontent.com/72715781/109463767-6e1c0300-7a1a-11eb-9843-5fd26600829b.gif)-->
