// Array of images to be displayed and their corresponding words to be spelled
let images = [
  'https://img.freepik.com/free-vector/flat-design-halloween-bat-concept_23-2148649699.jpg',
  'https://img.freepik.com/free-vector/cute-cat-cartoon-characters-illustrations-set-cats-with-heart-shaped-noses-happy-fluffy-kittens-smiling-orange-grey-kitties-sitting-white_74855-20523.jpg',
  'https://img.freepik.com/free-vector/beagle-dog-cartoon-white-background_1308-68249.jpg'
];
let words = ['BAT', 'CAT', 'DOG']; // Corresponding words
let currentIndex = 0;
let currentWord = '';
let timerInterval, imageTimeout;
let correctAnswers = 0; // Track the number of correct answers
let gotCorrectAnswer = false; // Track if the user got at least one correct answer

function startGame() {
  generateAlphabetButtons();
  showImage();
}

function generateAlphabetButtons() {
  const alphabetContainer = document.querySelector('.alphabet-buttons');
  alphabetContainer.innerHTML = ''; // Clear any existing buttons

  // Generate buttons for A-Z
  for (let i = 65; i <= 90; i++) { // ASCII codes for A-Z
      let letter = String.fromCharCode(i);
      let button = document.createElement('button');
      button.classList.add('alphabet-button');
      button.innerText = letter;
      button.addEventListener('click', () => clickAlphabet(letter));
      alphabetContainer.appendChild(button);
  }

  // Create a delete button
  let deleteButton = document.createElement('button');
  deleteButton.innerHTML = '<i class="fa-solid fa-delete-left text-[26px] text-[#4682b4]"></i>';
  deleteButton.classList.add('delete-button');
  deleteButton.addEventListener('click', deleteLastLetter);
  alphabetContainer.appendChild(deleteButton);
}

function showImage() {
  clearTimeout(imageTimeout); // Clear any previous timeouts
  clearInterval(timerInterval); // Clear any previous intervals

  let image = images[currentIndex];
  let imageElement = document.getElementById('image-display');
  imageElement.src = image;
  currentWord = '';
  document.getElementById('spelling-box').innerHTML = ''; // Use innerHTML to apply styles
  
  startTimer(); // Start the timer again for the new image
}

function startTimer() {
  let timeLeft = 60; // 60 seconds
  document.getElementById('timer').innerText = timeLeft;
  
  timerInterval = setInterval(() => {
      timeLeft--;
      if (timeLeft >= 0) {
          document.getElementById('timer').innerText = timeLeft;
      } else {
          clearInterval(timerInterval);
          nextImage();
      }
  }, 1000);
}

function clickAlphabet(letter) {
  currentWord += letter;
  updateSpellingBox();

  if (currentWord === words[currentIndex]) {
      clearTimeout(imageTimeout);
      clearInterval(timerInterval);
      gotCorrectAnswer = true; // User got the correct answer
      correctAnswers++; // Increment the correct answer count
      // Move to the next image after 5 seconds
      setTimeout(nextImage, 1000);
  }
}


function updateSpellingBox() {
  // Update the spelling box with colored letters
  let spellingBox = document.getElementById('spelling-box');
  let correctWord = words[currentIndex];
  let displayWord = '';

  currentWord.split('').forEach((letter, i) => {
    if (i < correctWord.length && letter === correctWord[i]) {
        displayWord += `<span class="relative inline-block mr-2.5 after:content-[''] after:absolute after:left-0 after:right-0 after:bottom-2.5 after:h-[1px] after:bg-[#333]">${letter}</span>`; // Correct letter
    } else {
        displayWord += `<span class="incorrect">${letter}</span>`; // Incorrect letter
    }
  });

  spellingBox.innerHTML = displayWord;
}


function deleteLastLetter() {
  // Remove the last letter from the current word
  currentWord = currentWord.slice(0, -1);
  updateSpellingBox();
}

function nextImage() {
  currentIndex++;
  if (currentIndex < images.length) {
      showImage(); // Show the next image and restart the timer
  } else {
      if (gotCorrectAnswer) {
          // Last image case, if the answer was correct, show results after 5 seconds
          setTimeout(showResults, 1000);
      } else {
          // Last image case, if the answer was incorrect, start the timer to show results after 60 seconds
          // startTimer();
          imageTimeout = setTimeout(showResults, 1000); // Wait 10 seconds before showing results
      }
  }
}

// function showResults() {
//   // Determine the result message based on the number of correct answers
//   let resultMessage = '';
//   if (correctAnswers === 3) {
//     resultMessage = "Excellent! 💃🏽💃🏽💃🏽";
//   } else if (correctAnswers === 2) {
//     resultMessage = "Very Good! 👍🏽👍🏽";
//   } else if (correctAnswers === 1) {
//     resultMessage = "More room for improvement! Keep trying! 💪🏽💪🏽";
//   } else {
//     resultMessage = "Game Over! You didn't get any words correct 😭😭😭.";
//   }
  
//   // Display the result message with the correct answer count
//   alert(`Game Over! You got ${correctAnswers} out of ${images.length} correct. ${resultMessage}`);

//   // Reload the page after the alert is closed
//   location.reload();
// }


// Function to handle the "Get Started" button click

function showResults() {
  // Determine the result message based on the number of correct answers
  let resultMessage = '';
  if (correctAnswers === 3) {
    resultMessage = "Excellent! 💃🏽💃🏽💃🏽";
  } else if (correctAnswers === 2) {
    resultMessage = "Very Good! 👍🏽👍🏽";
  } else if (correctAnswers === 1) {
    resultMessage = "More room for improvement! Keep trying! 💪🏽💪🏽";
  } else {
    resultMessage = "Game Over! You didn't get any words correct 😭😭😭.";
  }
  
  // Create a div element to hold the modal
  let modalDiv = document.createElement('div');
  modalDiv.innerHTML = `
    <!-- Main modal -->
    <div id="static-modal" data-modal-backdrop="static" tabindex="-1" aria-hidden="true" class="fixed inset-0 z-50 flex items-center justify-center w-full p-4 md:p-5 h-screen max-h-full bg-gray-800 bg-opacity-75">
      <div class="relative w-[90%] md:w-full max-w-2xl max-h-full bg-white rounded-lg shadow dark:bg-gray-700">
          <!-- Modal content -->
          <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <!-- Modal header -->
              <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                  <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                      Game Result
                  </h3>
                  <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="static-modal">
                      <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                      </svg>
                      <span class="sr-only">Close modal</span>
                  </button>
              </div>
              <!-- Modal body -->
              <div class="p-4 md:p-5 space-y-4">
                  <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                      You got ${correctAnswers} out of ${images.length} correct. ${resultMessage}
                  </p>
              </div>
              <!-- Modal footer -->
              <div class="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                  <button id="modal-accept-button" data-modal-hide="static-modal" type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">OK</button>
              </div>
          </div>
      </div>
    </div>
  `;

  // Append the modal to the body
  document.body.appendChild(modalDiv);

  // Show the modal
  const modal = document.getElementById('static-modal');
  modal.classList.remove('hidden');

  // Handle modal close actions
  document.getElementById('modal-accept-button').addEventListener('click', function() {
    modal.classList.add('hidden');
    location.reload(); // Reload the page after closing the modal
  });

  modal.querySelector('[data-modal-hide="static-modal"]').addEventListener('click', function() {
    modal.classList.add('hidden');
    location.reload(); // Reload the page after closing the modal
  });
}

document.getElementById('get-started-btn').addEventListener('click', function() {
  // Show confirmation dialog
  const userConfirmed = confirm('Are you sure you want to start the game?');
  
  if (userConfirmed) {
    // Hide the "Get Started" button and show the loader
    document.getElementById('get-started-btn').style.display = 'none';
    document.getElementById('loader').style.display = 'block';
    document.querySelector('.title').style.display = 'none';
    document.querySelector('.sub-t').style.display = 'none'
    
    // Hide the loader and show the game container after 3 seconds
    setTimeout(() => {
      document.getElementById('loader').style.display = 'none'; // Hide the loader
      document.querySelector('.container').style.display = 'block'; // Show the game container
      startGame(); // Start the game
    }, 5000);
  } else {
    // User clicked "Cancel", re-display the "Get Started" button
    document.getElementById('get-started-btn').style.display = 'block';
  }
});



