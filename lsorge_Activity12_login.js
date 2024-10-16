document.getElementById("loginButton").addEventListener("click", async (event) => {
  event.preventDefault();

  const userInput = document.getElementById("userInput").value;
  const passwordInput = document.getElementById("passwordInput").value;

  try {
    const users = await fetchUser();
    const result = await login(users, userInput, passwordInput);
    displayResult(result);
  } catch (error) {
    displayResult(`Error: ${error}`);
  }
});

async function fetchUser() {
  document.getElementById("loginuser").innerHTML = `Authenticating...`;
  return new Promise((resolve, reject) => {
    fetch("./lsorge_Activity12_login.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => resolve(data))
      .catch((error) => reject(`Failed to fetch users: ${error.message}`));
  });
}

async function login(users, userInput, passwordInput) {
  return new Promise((resolve, reject) => {
    const user = users.find((u) => u.user === userInput && u.password === passwordInput);
    if (user) {
      if (user.admin) {
        resolve(`Welcome Admin ${user.user}`);
      } else {
        resolve(`Welcome ${user.user}`);
      }
    } else {
      reject("Invalid username or password");
    }
  });
}

function displayResult(message, isSuccess = false) {
  const loginResultDiv = document.getElementById('loginuser');
  const resultClass = isSuccess ? 'success' : '';
  loginResultDiv.innerHTML = `<p class="${resultClass}">${message}</p>`;
}