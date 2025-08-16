// -------------------- User Management --------------------
let users = JSON.parse(localStorage.getItem("users")) || [];

function toggleForms() {
  document.getElementById("signup-box").classList.toggle("hidden");
  document.getElementById("login-box").classList.toggle("hidden");
}

// Sign Up
document.getElementById("signup-form").addEventListener("submit", e => {
  e.preventDefault();
  const username = document.getElementById("signup-username").value.trim();
  const password = document.getElementById("signup-password").value.trim();
  if(users.find(u => u.username === username)) {
    alert("Username already exists!");
    return;
  }
  users.push({ username, password });
  localStorage.setItem("users", JSON.stringify(users));
  alert("Sign up successful! Please log in.");
  toggleForms();
});

// Login
document.getElementById("login-form").addEventListener("submit", e => {
  e.preventDefault();
  const username = document.getElementById("login-username").value.trim();
  const password = document.getElementById("login-password").value.trim();
  const user = users.find(u => u.username === username && u.password === password);
  if(user) {
    startQuiz();
  } else {
    alert("Invalid credentials!");
  }
});

// -------------------- Quiz --------------------
const questionsDB = [
  {question:"Sum of roots of 3x²-5x+2=0?", options:["2/3","5/3","5","3"], answer:"5/3"},
  {question:"Force direction for circular motion?", options:["Tangent","Opposite","Radial Out","Radial In"], answer:"Radial In"},
  {question:"Best sorting algorithm average?", options:["Bubble","Quick","Insertion","Selection"], answer:"Quick"},
  {question:"Highest electronegativity?", options:["Oxygen","Fluorine","Chlorine","Nitrogen"], answer:"Fluorine"},
  {question:"First Mughal emperor?", options:["Akbar","Shah Jahan","Babur","Humayun"], answer:"Babur"},
  {question:"Largest hot desert?", options:["Gobi","Arabian","Sahara","Kalahari"], answer:"Sahara"},
  {question:"Organelle for respiration?", options:["Nucleus","Mitochondria","Ribosome","Golgi"], answer:"Mitochondria"},
  {question:"Word: confused explanation?", options:["Lucid","Obscure","Eloquent","Succinct"], answer:"Obscure"},
  {question:"Bloops and Lazzies?", options:["Razzies","Lazzies","Both","Cannot"], answer:"Both"},
  {question:"Derivative ln(x²+1)?", options:["1/(x²+1)","2x/(x²+1)","ln(2x)","1/(2x+1)"], answer:"2x/(x²+1)"},
  {question:"Opportunity cost?", options:["Cost unit","Profit lost","Total cost","Money spent"], answer:"Profit lost"},
  {question:"Python list(range(2,10,2))?", options:["[2,3,4,5,6,7,8,9]","[2,4,6,8,10]","[2,4,6,8]","[2,5,8]"], answer:"[2,4,6,8]"},
  {question:"Planet most moons?", options:["Jupiter","Neptune","Saturn","Uranus"], answer:"Saturn"},
  {question:"Who wrote 'The Trial'?", options:["Camus","Kafka","Tolstoy","Dostoevsky"], answer:"Kafka"},
  {question:"Median of {3,7,9,15,21,22,25}?", options:["9","15","21","22"], answer:"15"},
  {question:"Persistence of Memory artist?", options:["Picasso","Dalí","Van Gogh","Monet"], answer:"Dalí"},
  {question:"Nobel prize categories?", options:["5","6","7","8"], answer:"6"},
  {question:"Cogito ergo sum author?", options:["Socrates","Descartes","Nietzsche","Hume"], answer:"Descartes"},
  {question:"Most abundant gas?", options:["Oxygen","CO2","Nitrogen","Hydrogen"], answer:"Nitrogen"},
  {question:"Lossless compression?", options:["JPEG","MPEG","Huffman","MP3"], answer:"Huffman"}
];

function startQuiz() {
  document.getElementById("signup-box").classList.add("hidden");
  document.getElementById("login-box").classList.add("hidden");
  const quizBox = document.getElementById("quiz-box");
  quizBox.classList.remove("hidden");

  const quizForm = document.getElementById("quiz-form");
  quizForm.innerHTML = "";

  const questions = questionsDB.sort(()=>0.5-Math.random()).slice(0,5);
  questions.forEach((q,i)=>{
    const qDiv = document.createElement("div");
    qDiv.classList.add("question-container");

    const legend = document.createElement("legend");
    legend.textContent = `${i+1}. ${q.question}`;
    qDiv.appendChild(legend);

    q.options.forEach(opt=>{
      const label = document.createElement("label");
      label.style.display="block";
      const input = document.createElement("input");
      input.type="radio";
      input.name=`q${i}`;
      input.value=opt;
      input.required=true;
      label.appendChild(input);
      label.appendChild(document.createTextNode(` ${opt}`));
      qDiv.appendChild(label);
    });

    quizForm.appendChild(qDiv);
  });

  document.getElementById("submit-quiz").classList.remove("hidden");
}

// Submit Quiz
document.getElementById("submit-quiz").addEventListener("click", ()=>{
  const quizForm = document.getElementById("quiz-form");
  const inputs = quizForm.querySelectorAll("input[type='radio']:checked");
  let score = 0;
  inputs.forEach((input,i)=>{
    if(input.value === questionsDB[i].answer) score++;
  });
  document.getElementById("score-box").textContent = `Your Score: ${score}/5`;
  document.getElementById("score-box").classList.remove("hidden");
  document.getElementById("submit-quiz").classList.add("hidden");
  document.getElementById("retry").classList.remove("hidden");
});

// Retry
document.getElementById("retry").addEventListener("click", ()=>{
  startQuiz();
  document.getElementById("score-box").classList.add("hidden");
  document.getElementById("retry").classList.add("hidden");
});