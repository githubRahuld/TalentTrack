# TalentTrack

**TalentTrack** is a comprehensive employee management platform designed to streamline HR tasks and improve workforce efficiency. With features like employee creation, editing, and deletion, along with avatar uploads and multiple course selections, StaffMaster simplifies the process of managing your team.

## Features

- **Employee Management**: Create, edit, and delete employee records, including personal information, designation, and contact details.
- **Gender Selection**: Easily manage employee gender through radio buttons for accurate demographic data.
- **Course Enrollment**: Assign employees to courses using multi-select functionality (MCA, BCA, BSC).
- **Avatar Upload**: Upload employee profile images to personalize their records.
- **Responsive Design**: A user-friendly interface optimized for various devices, with scrollable forms for easy data entry.

## Tech Stack

- **Frontend**: React, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Other Tools**: Axios, FormData API, js-cookie

## Getting Started

Follow these steps to get the project up and running on your local machine.

### Prerequisites

Ensure you have the following installed:

- Node.js (v12+)
- MongoDB

### Installation

1. Clone the repository:
    ```bash
    git clone [https://github.com/yourusername/talent.git](https://github.com/githubRahuld/TalentTrack.git)
    ```

2. Navigate into the project directory:
    ```bash
    cd TalentTrack
    ```

3. Install the dependencies:
    ```bash
    npm install
    ```

4. Set up environment variables:

   Create a `.env` file in the root directory and add the following environment variables:

    ```env
    VITE_API_BASE_URL=http://localhost:8001
    ```

5. Start the backend server:
    ```bash
    cd backend
    npm run dev
    ```

6. Start the frontend:
    ```bash
    cd frontend
    npm run dev
    ```

7. Access the app on [http://localhost:8001](http://localhost:8001)

## API Endpoints

- `POST /api/v1/users/employees` - Create a new employee
- `PATCH /api/v1/admins/edit/:id` - Update employee details
- `DELETE /api/v1/admins/delete/:id` - Delete an employee
- `GET /api/v1/admins/all-employees` - Retrieve the list of employees

## Usage

1. **Employee List**: View all employees in a list format with details like name, email, designation, gender, and courses.
2. **Create Employee**: Fill out the employee creation form, upload an avatar, select gender, and assign courses.
3. **Edit Employee**: Use the edit button to modify employee information, including uploading a new avatar.
4. **Delete Employee**: Remove employees from the system with a single click.

## Screenshots

### Employee List View
![Employee List](path-to-image)

### Create/Edit Employee Form
![Employee Form](path-to-image)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## Contact

For any inquiries, reach out to [your email] or connect with me on [LinkedIn](https://linkedin.com/in/yourprofile).

