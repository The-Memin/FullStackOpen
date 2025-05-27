# Phonebook Frontend

This is the **frontend** of the Phonebook application built with **React** and **Vite** as part of the [FullStackOpen](https://fullstackopen.com/en/) course.

The application allows users to manage a contact list: adding, updating, filtering, and deleting phonebook entries. It communicates with a Node.js + Express backend to persist data and fetch updates.

## 📂 Project Structure

```yaml
src/
├── components/ # Reusable React components
├── services/ # API service for interacting with backend
├── App.jsx # Root component
├── main.jsx # Entry point
├── index.css # Global styles
```

## 🚀 Features

- List all persons in the phonebook
- Add a new contact with name and phone number
- Filter contacts by name
- Delete contacts
- Show success and error notifications
- Input validation and error handling

## 🔗 Related Repositories

- **Backend (Node.js + Express)**  
  Deployed at: [https://thephonebook-backend.fly.dev](https://thephonebook-backend.fly.dev)  
  Source: [Phonebook Backend Repo](https://github.com/The-Memin/FullStackOpen/tree/main/part3/thePhoneBook)

## 🧪 Getting Started

### 1. Clone and install dependencies

```bash
git clone https://github.com/your-username/phonebook-frontend.git
cd phonebook-frontend
npm install
```

### 2. Run the development server

```bash
npm run dev
```
By default, the app will run at http://localhost:5173.

## 🛠 Technologies Used

  - React 
  - Vite
  - Axios
  - CSS (basic styles)
  
## 📦 Build for production

```bash
npm run build
```
This creates an optimized static build in the dist/ folder, ready to be deployed or copied into a backend server (like in the full-stack version).

## License
#### This project is part of the FullStackOpen course exercises.

---

Made with 💻 by Guillermo
---