# Revest Task - Sales Order Management API 🚀

A **Node.js** and **TypeScript** application using **Prisma ORM** with **PostgreSQL**, supporting **Docker** for containerized deployment.

---

## **📌 Features**
- **CRUD operations** for Products and Orders.
- **Validation with Joi** for request data.
- **Middleware for Error Handling, Logging, and Rate Limiting.**
- **Prisma ORM** for database interactions.
- **Database Migrations & Seeding.**
- **Dockerized for easy deployment.**

---

## **📌 Getting Started**
### **🔹 1️⃣ Clone the Repository**
```sh
git clone https://github.com/AhmedZatar/revest-task.git
cd revest-task
```

### **🔹 2️⃣ Install Dependencies**
```sh
npm install
```

---

## **📌 Environment Variables**
Create a **.env** file in the project root and configure the following:
```
PORT=3000
DATABASE_URL=postgresql://postgres@localhost:5432/revest?schema=public
THIRD_PARTY_API_URL=https://third-party-api.com
THIRD_PARTY_API_TOKEN=<your-token>
```

---

## **📌 Running Locally (Without Docker)**
### **🔹 1️⃣ Start PostgreSQL Locally**
Ensure PostgreSQL is running on **port 5432**, or adjust `DATABASE_URL`.

### **🔹 2️⃣ Run Database Migrations**
```sh
npx prisma generate
npx prisma db push
npx prisma db seed  # Optional: Seed example data
```

### **🔹 3️⃣ Start the Server**
```sh
npm run dev  # For development (hot reload)
npm run build && npm start  # For production
```

---

## **📌 Running with Docker 🐳**
### **🔹 1️⃣ Build & Start Containers**
```sh
docker-compose up --build
```

### **🔹 3️⃣ View Logs**
```sh
docker logs -f revest-app
```

### **🔹 4️⃣ Manually Run Database Migrations & Seeding (If Needed)**
```sh
docker exec -it revest-app npx prisma db push
docker exec -it revest-app npx prisma db seed
```

---

## **📌 API Endpoints**
### **🔹 Products**
| Method | Endpoint            | Description               |
|--------|---------------------|---------------------------|
| GET    | `/api/products/:id` | Get product by ID         |
| GET    | `/api/products`     | Get list of products      |
| POST   | `/api/products`     | Create a new product      |
| PUT    | `/api/products/:id` | Update an existing product |
| DELETE | `/api/products/:id` | Delete a product         |

### **🔹 Orders**
| Method | Endpoint                          | Description                           |
|--------|----------------------------------|---------------------------------------|
| GET    | `/api/orders/:id`                | Get order by ID                      |
| GET    | `/api/orders`                    | Get list of orders                   |
| POST   | `/api/orders`                    | Create a new order                   |
| PUT    | `/api/orders/:id`                | Update an existing order             |
| DELETE    | `/api/orders/:id`                | DELETE an existing order             |

---

## **📌 Testing with Postman**

1. **Import the Postman Collection**:
   - **[Download Postman Collection](https://github.com/AhmedZatar/revest-task/blob/main/postman_collection.json)**
2. **Send API Requests & Verify Responses**.

---

## **📌 Project Structure**
```
📦 revest-task
├── 📂 src
│   ├── 📂 config       # Config
│   ├── 📂 controllers  # API controllers
│   ├── 📂 services     # Business logic & Prisma interactions
│   ├── 📂 middlewares  # Error handling, logging, etc.
│   ├── 📂 routes       # Express routes
│   ├── 📂 utils        # Helpers & utilities
│   ├── 📂 types        # TypeScript types
│   ├── app.ts         # Express application setup & Server entry point
│
├── 📂 prisma
│   ├── schema.prisma  # Prisma schema
│   ├── seed.ts        # Database seeding script
│
├── 📜 Dockerfile
├── 📜 docker-compose.yml
├── 📜 .env.example
├── 📜 package.json
├── 📜 README.md
```

---

### 🎉 **Now you're all set! Run the API & start managing orders effortlessly!** 🚀🔥
