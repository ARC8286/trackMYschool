# TrackMYschool

## 📌 Project Overview
This is a **Node.js + Express.js + MySQL** API for managing school data. It allows users to:
- **Add new schools** with name, address, latitude, and longitude.
- **List schools sorted by proximity** to a user-specified location.

---

## 🏗️ Tech Stack
- **Backend**: Node.js, Express.js
- **Database**: MySQL
- **Tools**: Postman, VS Code, MySQL Workbench

---

## 🔹 Features
- 📌 **Add School**: Stores school details in MySQL.
- 📌 **List Schools**: Retrieves and sorts schools by distance.
- 📌 **Haversine Formula**: Calculates distances between locations.

---

## 🚀 Installation & Setup

### **1️⃣ Clone the Repository**
```bash
git clone https://github.com/ARC8286/trackMYschool.git
```

### **2️⃣ Install Dependencies**
```bash
npm install
```

### **3️⃣ Set Up MySQL Database**
Create a database in MySQL:
```sql
CREATE DATABASE TrackMySchool;
USE TrackMySchool;
```

Create a `schools` table:
```sql
CREATE TABLE schools (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    latitude FLOAT NOT NULL,
    longitude FLOAT NOT NULL
);
```

### **4️⃣ Configure Environment Variables**
Create a `.env` file:
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=school_db
PORT=5000
```

### **5️⃣ Start the Server**
```bash
node server.js
```
The server will run at **http://localhost:5000** 🚀

---

## 📌 API Endpoints

### **1️⃣ Add School**
- **Endpoint**: `POST /addSchool`
- **Request Body (JSON)**:
  ```json
  {
    "name": "XYZ School",
    "address": "Some Location",
    "latitude": 19.1234,
    "longitude": 72.9876
  }
  ```
- **Response**:
  ```json
  {
    "message": "School added successfully"
  }
  ```

### **2️⃣ List Schools (Sorted by Proximity)**
- **Endpoint**: `GET /listSchools?latitude=19.2290&longitude=72.8545`
- **Response Example**:
  ```json
  [
    {
      "id": 1,
      "name": "XYZ School",
      "address": "Some Location",
      "latitude": 19.1234,
      "longitude": 72.9876,
      "distance": 5.2
    }
  ]
  ```

---

## 📌 Future Improvements
✔ Add authentication (JWT)
✔ Implement a frontend UI
✔ Use Sequelize ORM

---

## 👨‍💻 Author
**Amit Chaudhary**
- GitHub: [ARC8286](https://github.com/ARC8286/)
- LinkedIn: [Amit WebDev](https://www.linkedin.com/in/amit-webdev/)

