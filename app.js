let sentences = [];
let currentIndex = 0;

const vietnameseEl = document.getElementById("vietnamese");
const answerInput = document.getElementById("answer");
const resultEl = document.getElementById("result");

const listenBtn = document.getElementById("listenBtn");
const checkBtn = document.getElementById("checkBtn");
const nextBtn = document.getElementById("nextBtn");
const levelSelect = document.getElementById("level");

async function loadData() {

    const file = levelSelect.value;

    const response = await fetch(file);

    console.log("Đang tải:", file);
    console.log("Trạng thái:", response.status);

    sentences = await response.json();
    alert(sentences[0].vietnamese);

    console.log("Số câu:", sentences.length);

    currentIndex = 0;


    showSentence();

}


function showSentence() {

    if (sentences.length === 0) return;

    const sentence = sentences[currentIndex];
    console.log(sentence);

    vietnameseEl.textContent = sentence.vietnamese;

    answerInput.value = "";

    resultEl.innerHTML = "";

}

listenBtn.onclick = () => {

    const sentence = sentences[currentIndex];

    speechSynthesis.cancel();

    const speech = new SpeechSynthesisUtterance(sentence.chinese);

    speech.lang = "zh-CN";

    speech.rate = 0.9;

    speechSynthesis.speak(speech);

};

checkBtn.onclick = () => {

    const sentence = sentences[currentIndex];

    const userAnswer = answerInput.value.trim();

    const correctAnswer = sentence.chinese
        .replace(/[。！？，、,.!?]/g, "")
        .trim();

    const userText = userAnswer
        .replace(/[。！？，、,.!?]/g, "")
        .trim();

    if (userText === correctAnswer) {

        resultEl.innerHTML = "✅ Chính xác!";

    } else {

        resultEl.innerHTML = `
        ❌ Sai<br><br>

        <b>Đáp án:</b><br>
        ${sentence.chinese}<br><br>

        <b>Pinyin:</b><br>
        ${sentence.pinyin}
        `;

    }

};

nextBtn.onclick = () => {

    currentIndex++;

    if (currentIndex >= sentences.length) {

        currentIndex = 0;

    }

    showSentence();

};

levelSelect.onchange = loadData;

loadData();