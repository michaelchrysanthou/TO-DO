import { auth, db } from "./firebase.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";

// Handle Sign-Up
document.getElementById("sign-up-btn")?.addEventListener("click", async () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    alert("Sign-up successful!");
    window.location.href = "todo.html";
  } catch (error) {
    alert(error.message);
  }
});

// Handle Sign-In
document.getElementById("sign-in-btn")?.addEventListener("click", async () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  try {
    await signInWithEmailAndPassword(auth, email, password);
    window.location.href = "todo.html";
  } catch (error) {
    alert(error.message);
  }
});

// To-Do Page Logic
if (window.location.pathname.includes("todo.html")) {
  const taskList = document.getElementById("task-list");

  // Add a new task
  document.getElementById("add-task-btn").addEventListener("click", async () => {
    const newTask = document.getElementById("new-task").value;
    if (newTask.trim() === "") return;
    try {
      await addDoc(collection(db, "users", auth.currentUser.uid, "tasks"), {
        text: newTask,
      });
      document.getElementById("new-task").value = "";
      fetchTasks(); // Refresh the task list
    } catch (error) {
      alert(error.message);
    }
  });

  // Fetch and display tasks
  const fetchTasks = async () => {
    taskList.innerHTML = ""; // Clear the list before adding tasks
    const querySnapshot = await getDocs(
      collection(db, "users", auth.currentUser.uid, "tasks")
    );
    querySnapshot.forEach((doc) => {
      const taskItem = document.createElement("li");
      taskItem.textContent = doc.data().text;

      // Create a Delete button for each task
      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      deleteBtn.addEventListener("click", async () => {
        await deleteDoc(doc.ref); // Delete the task from Firestore
        fetchTasks(); // Refresh the task list
      });

      taskItem.appendChild(deleteBtn);
      taskList.appendChild(taskItem);
    });
  };

  // Listen for auth state changes
  onAuthStateChanged(auth, (user) => {
    if (user) {
      fetchTasks(); // Fetch tasks when user is signed in
    } else {
      window.location.href = "index.html"; // Redirect to login if not authenticated
    }
  });

  // Handle Sign-Out
  document.getElementById("sign-out-btn").addEventListener("click", async () => {
    try {
      await signOut(auth);
      window.location.href = "index.html"; // Redirect to login page
    } catch (error) {
      alert(error.message);
    }
  });

  
  
  
}
