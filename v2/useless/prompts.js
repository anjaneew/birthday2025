// prompts.js
let promptIndex = 0;
const prompts = [
  {
    question: "What's your name?",
    correct: "right answer",
    failMessage: "Try again with a different name.",
    retryPrompt: "Still wrong? Use a placeholder."
  },
  {
    question: "What's your favorite color?",
    correct: "right answer",
    failMessage: "Try again with another color.",
    retryPrompt: "Still wrong? Use a placeholder."
  },
  {
    question: "What's your birth month?",
    correct: "right answer",
    failMessage: "Try again with a valid month.",
    retryPrompt: "Still wrong? Use a placeholder."
  }
];

function askPrompt(index) {
  const answer = prompt(prompts[index].question);
  if (answer === prompts[index].correct) {
    showLayer('puzzle-layer');
  } else {
    const retry = prompt(prompts[index].failMessage);
    if (retry === prompts[index].correct) {
      showLayer('puzzle-layer');
    } else {
      prompt(prompts[index].retryPrompt);
    }
  }
}

askPrompt(promptIndex);
