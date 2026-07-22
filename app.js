let sentences = [];
let index = 0;

const level = document.getElementById("level");
const vietnamese = document.getElementById("vietnamese");
const answer = document.getElementById("answer");
const result = document.getElementById("result");

async function loadData(){

    let file = level.value;

    let res = await fetch(file);

    sentences = await res.json();

    alert("Số câu: " + sentences.length);

    index = 0;

    show();

}



function show(){

    let s = sentences[index];

    vietnamese.innerHTML = s.vietnamese;

    answer.value = "";

    result.innerHTML = "";

}


document.getElementById("nextBtn").onclick = ()=>{

    index++;

    if(index >= sentences.length){
        index = 0;
    }

    show();

};


document.getElementById("checkBtn").onclick = ()=>{

    let s = sentences[index];

    function normalize(text){
        return text
            .replace(/[。！？，、,.!?]/g,"")
            .replace(/\s+/g,"")
            .trim();
    }

    let userAnswer = normalize(answer.value);
    let correctAnswer = normalize(s.chinese);

    if(userAnswer == correctAnswer){

        result.innerHTML="✅ Đúng";

    }else{

        result.innerHTML=
        "❌ Đáp án: "+s.chinese+
        "<br>Pinyin: "+s.pinyin;

    }

};
let voices = [];

function loadVoices() {
    voices = speechSynthesis.getVoices();
}

speechSynthesis.onvoiceschanged = loadVoices;

loadVoices();

setTimeout(() => {
    loadVoices();
}, 1000);
level.onchange = loadData;

document.getElementById("listenBtn").onclick = () => {

    const s = sentences[index];

    const speech = new SpeechSynthesisUtterance(s.chinese);

    // dùng danh sách voice đã load sẵn
    let voice = voices.find(v =>
        v.lang === "zh-CN" &&
        (
            v.name.includes("Female") ||
            v.name.includes("female") ||
            v.name.includes("女") ||
            v.name.includes("Tingting") ||
            v.name.includes("Ting-Ting") ||
            v.name.includes("Xiaoxiao") ||
            v.name.includes("Yaoyao") ||
            v.name.includes("Huihui")
        )
    );

    // không có nữ thì lấy tiếng Trung bất kỳ
    if (!voice) {
        voice = voices.find(v =>
            v.lang === "zh-CN"
        );
    }

    if (voice) {
        speech.voice = voice;
    }

    speech.lang = "zh-CN";
    speech.rate = 0.85;
    speech.pitch = 1.1;

    speechSynthesis.cancel();

    speechSynthesis.speak(speech);
};


loadData();