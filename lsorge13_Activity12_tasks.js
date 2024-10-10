document.addEventListener('DOMContentLoaded', () => {
  // Button event listeners for asynchronous tasks
  document.getElementById('btnTask1').addEventListener('click', async () => {
    await handleTask('Task 1', 2000);
  });

  document.getElementById('btnTask2').addEventListener('click', async () => {
    await handleTask('Task 2', 3000);
  });

  document.getElementById('btnTask3').addEventListener('click', async () => {
    await handleTask('Task 3', 4000);
  });

  function simulateAsyncTask(delay, result) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 0.7) { // 30% chance of error
          reject(`Error in ${result}`);
        } else {
          resolve(`${result} completed`);
        }
      }, delay);
    });
  }

  async function handleTask(taskName, delay) {
    try {
      const result = await simulateAsyncTask(delay, taskName);
      displayResult(result);
    } catch (error) {
      displayResult(`Failed: ${error}`);
    }
  }

  function displayResult(message) {
    const taskResultsDiv = document.getElementById('taskResults');
    taskResultsDiv.innerHTML += `<p>${message}</p>`;
  }
});