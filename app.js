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

    if(answer.value.trim() == s.chinese){

        result.innerHTML="✅ Đúng";

    }else{

        result.innerHTML=
        "❌ Đáp án: "+s.chinese+
        "<br>Pinyin: "+s.pinyin;

    }

};


level.onchange = loadData;


loadData();