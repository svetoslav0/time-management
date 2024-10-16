
# The Time Management Project
# :loudspeaker: Summary
This project represents a web-based system with 3 different levels of access: **administrators**, **employees** and **customers**. The administrators manage all users and projects, employees log events for specific projects, and customers view generated reports either from the application or from the attached PDF files.
# :computer: Tech stack
 - React
 - Node.js
 - MongoDB
 - Google SSO
# :busts_in_silhouette: Team
## :bust_in_silhouette: Team lead
 - Svetoslav Nedelchev, svet.nedelchev@gmail.com, [LinkedIn](https://www.linkedin.com/in/svetoslav-nedelchev/)
## :bust_in_silhouette: Back-End Development
 - Nikolay Stoyanov, nstoyanov9512@gmail.com, [LinkedIn](https://www.linkedin.com/in/nikolay-stoyanov-4a8a95186/)
 - Stoyan Kolev, shadoowkrit1@gmail.com
 - Daniel Iliev, danieljivkov04@icloud.com
## :bust_in_silhouette: Front-End Development
 - Ivaylo Ivanov, ivaylo_ivanov84@yahoo.co.uk, [LinkedIn](https://www.linkedin.com/in/ivaylo-ivanov-4907baa8/)
 - Timi Pashov, pashov91@gmail.com, [LinkedIn](https://www.linkedin.com/in/timi-pashov-5876a1254/)
 - Emin Apturaim, eminapturaim@gmail.com, [LinkedIn](https://www.linkedin.com/in/emin-ap/)
 - Alex Petrov, alex.emilov.petrov@gmail.com
## :bust_in_silhouette: UI/UX Design
 - Ana Dobreva, adobreva1211@gmail.com, [LinkedIn](https://www.linkedin.com/in/ana-dobreva-99062026b/)
# Project Description & Documentation
# Authentication, authorization & account creation
## Login
The application has two different authentication methods:
1. The first one requires **email** and **password** in order to login. The credentials are validated for different set on criteria - the email has to be valid, the email has to be associated with an existing account that is active, and the password has to be valid. If some of those criteria is not satisfied, an error message will be shown that says that the login was not successful. 
2. The second one work with Google SSO integration and relies on Google to handle the login. The only requirement here is that the Google email has to be registered in the application otherwise the login will not be successful.

On successful login the application automatically detects the role of the use and redirects them to their home page depending in their role.
## Register
There is no direct "register" in the classic meaning of the feature. Here we to call it **"account creation"**. And there are two different ways an account to be created:
1. Administrators can freely create an account with all different kind of roles
2. An administrator can send an invite via email to a potential customer so he can create the account on their own. You can find more information about this in the **Invite** section bellow
## Invite
While creating the account or after that, an administrator can **send an invite** to a customer. The customer then receives an email with the URL where can create the account. The link is temporary and valid for 7 days from the moment of the creation of the invite.
The potential customer sees a form where they should fill some details - **email**, **first** and **last name**, **company name**, **phone number**, **address**, **password**, **confirm password**, and **description** (from those only description is not required).
Or, alternatively, the can create an account with **Google** where Google window pops up and they have to login with their Google account. In those cases the application still requires some fields - the same without the email.

# Common features
Every logged used has a navbar with a menu of options and settings. Each user has **My Profile**, **Projects**, and **Logout** buttons in their menus. Administrators have more options in order to manage **Users** and **Projects** but those features will be described bellow in the **Administrator features** section.
## My Profile
My profile section displays very basic user information - **Email**, **first** and **last name**. From this page users can do two things:
1. View and update **first** and **last name**
2. Update their **password** - clicking on the button **Change password**, a modal window pops in asking for the **old password** (the current password), and two times for the **new password** (the second one is for confirmation).

## Projects
Clicking on **Projects** button in the nav bar will lead to **Projects listing** page. Different users will see different views depending on their role but the idea is the same - this is the page where users are seeing all the projects that were assigned to them, except for administrators who are able to see all projects.

## Logout
At the top right each logged in user has a **Logout** button that signs off from the application.

# Administrator features
The administrator is the highest role in the context of the application. He can manage all the users, projects, and reports.
## Users
### User creation
The administrator has the ability to create users. First, they need to specify the role of the new user. Depending on that different fields will pop up on the screen requiring different details for the new user
 - Administrator - email, first and last name, password and confirmation password, description
 - Employee - experience level (predefined, choosing from a dropdown menu - Junior, Mid-level, Senior, or Architect), email, first and last name, password and confirmation password, and description
 - Customer - email, first and last name, company name, phone number, address, password and confirmation password, and description.

No matter the role, every field is required except the description. The application will show the missing field in case the user tries to create an account when they missed something.

### User listing
In the navigation menu there is a **Users** button that heads to the **Users listing page**, meaning that's the page where all users are listed. For each of them the administrator can see their names, role and status. He can also click on each of them in order to go to their profiles and see more details about them.

This page also has a **search feature** with a search bar where the administrator can type keywords or name in order to see filtered result set. The search bar filters the results by **first name**, **last name**, or **email**.
### User details
As mentioned, clicking on any user in **users listing** page will lead to their profile page where additional details can be seen.
Here are all the details for the users. The administrator has  some **key features** that they can apply on users from this page:
 - Edit functionality - most of the user properties are **editable** but others like the email, the user type (Google or not), and the user role are not due to security reasons.
 - Archive/Unarchive functionality - from here an administrator can update a user status in both directions. As mentioned before, an inactive (archived) user **cannot login into the application**.
 - Password recovery feature - there are some cases where password recovery might be needed. A modal window pops up and asks for the new password plus confirmation field to repeat the new password.

Another interesting information that can be seen here is the list of projects that the user is assigned to, no matter their role.

## Projects
### Project creation
Administrators have the ability to create new projects. This can be done by clicking on the **Create project** button in the navbar.
The form that appears will require the following things:
 - **Project Name** - _required_, this is going to be the project name that will be displayed for all users
 - **Starting date of the project** - _required_
 - **Price per hour for Junior-level** - _required_
 - **Price per hour for Mid-level** - _required_
 - **Price per hour for Senior-level** - _required_
 - **Price per hour for Architect-level** - _required_
 - **Employees** - _required_, this field allows to search for employees that are already existing as users in the application, it also gives the ability to select more than one item
 - **Customers** - similar to **Employees** - search and select multiple customers that exist as application users
 - **Invite emails** - this field allows to type emails for customer that will be invited to create an account. With this feature the created account will be automatically assigned to the created project. Multiple emails might be added, **they must be separated with space**.

The form will display error is case some of the required fields is missing or some invalid data was filled somewhere.
### Project listing
Clicking on the **Projects** button in the navbar will lead to **Projects listing** page where administrators can see all the projects that exist. On this page for each project administrators can only see the **project name** and their **status**. To view more details, they will need to click on the **Details** button which will lead to **Project details** page.

Different projects will have different color style depending on their statuses which helps to distinguish the faster.

Similar to **Users listing** page, this page also provides a **search bar** where administrators can type and search for a project by its name.

### Project details
This page provides full control of a project. It is divided into separate sections:
#### Basic project information
In this section the administrator can see the **Project name**, **Starting date**, **Prices** for different employee experiences, and the **Project status**. 

The prices are editable from this section. 
**Important:  editing the prices will not affect already generated reports**. If one needs to update the prices for the already generated report, they have to delete the existing one and regenerate it again.

This section also includes **Generate report** and **Complete project** buttons.

When clicking on the **Generate report** button, a modal window will pop up on the screen. To generate a report the administrator has to provide **Report name** and **Date range** that the report will be generated for. Submitting this form will automatically collect data for logged hours for this project in that date range, will generate a report that will be saved into the database as PDF. This feature will provide faster downloading for both administrators and customers since the data was already collected and the PDF file itself has already been generated.

When administrator clicks on the **Complete project** button, a modal window will show asking for confirmation. After confirming the status of the project will be update from **In progress** to **Completed**. Administrators have to be careful with this feature since there is no way to update the status back to **In progress** after this action (at least not from the UI).
#### Employees
This section provides control over employees that are assigned to the specified project. Administrators can view, add or remove employees with the help of the intuitive UI.
#### Customers
Similar to **employees section**, from here administrators can view, add or remove customers.
#### Invited emails
This section provides control over the invites. Administrators can easily view, add or delete invites. They can also see when each of the invites expires.
#### Logged hours
From this section administrators can see all logged hours for the specified project. In the table is displayed when the event was logged, who logged it, description and how many hours did they spend on it. Clicking on the name of the employee will lead to their **User details** page in order to view more details about them.
#### Generated reports
From this section administrators can see all generated reports for the selected project. Displayed in a table, they can easily view the date range that the report covers and the name of the report. They can also download reports in a PDF files or reports can be deleted, if that's needed. 

# Employee features
Logging in the application as an **employee**, users have all the information in a single page where they control the events they log.

They see a list of all projects that they were assigned to and that are still **In progress**. Projects with status **Completed** will not be shown.

Clicking on any project will expand details for logged hours for the selected project.

From there employees can view, add and edit records (Note: employees can delete and edit only their own records). For the records that someone else logged, edit and delete buttons will not be shown. Also, the email for the employee that logged the record can be seen.

# Customer features
Logging in the application as a **customer**, the user sees a list of all projects that are assigned to them. From there they can see very basic information only - **project name**, **status**, and **start date**. Clicking on the details button will lead them to the **project details** page.

In the **project details** page customers can see additional data - employees that are working on this project, list of clients (Note: more than one customer might be assigned to a single project), and a list of already generated reports. Clicking on each of the reports will lead the user to the **report details** page.

In the **report details** page customers can see everything from the record - how many hours were registered in total, what is the price in the context of that report, they can also see each individual record and download the report in a PDF file.