
const $ = id => document.getElementById(id);

function fixLength(v){

    v = parseInt(v);

    if(isNaN(v)) v = 12;
    if(v < 4) v = 4;
    if(v > 64) v = 64;

    return v;
}





const len = $("length");
const lenNum = $("lenNum");

const upper = $("upper");
const lower = $("lower");
const num = $("num");
const sym = $("sym");

const out = $("output");
const bar = $("barFill");
const text = $("text");

const list = $("list");

 len.oninput = () => lenNum.value = len.value; 
 lenNum.oninput = () => len.value = lenNum.value;





const U="ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const L="abcdefghijklmnopqrstuvwxyz";
const N="0123456789";
const S="!@#$%^&*()_+{}[]<>?";

let history=[];

function pool(){
    let p="";
    if(upper.checked) p+=U;
    if(lower.checked) p+=L;
    if(num.checked) p+=N;
    if(sym.checked) p+=S;
    return p;
}

function rand(max){
    return Math.floor(Math.random()*max);
}

function gen(n){
    let p=pool();
    if(!p) return "";

    let r=[];

    if(upper.checked) r.push(U[rand(U.length)]);
    if(lower.checked) r.push(L[rand(L.length)]);
    if(num.checked) r.push(N[rand(N.length)]);
    if(sym.checked) r.push(S[rand(S.length)]);

    while(r.length<n){
        r.push(p[rand(p.length)]);
    }

    return r.sort(()=>Math.random()-0.5).join("");
}

function strength(p){
    let s=0;

    if(p.length>8) s+=20;
    if(p.length>12) s+=20;
    if(/[A-Z]/.test(p)) s+=20;
    if(/[0-9]/.test(p)) s+=20;
    if(/[^A-Za-z0-9]/.test(p)) s+=20;

    bar.style.width=s+"%";

    text.innerText=
    s<40?"弱":
    s<80?"中":"强";
}

function add(p){
    history.unshift(p);
    if(history.length>20) history.pop();
    render();
}

function render(){
    list.innerHTML="";

    history.forEach((p,i)=>{
        let div=document.createElement("div");
        div.className="history-item";

        let span=document.createElement("span");
        span.innerText=p;

        let act=document.createElement("div");
        act.className="history-actions";

        let c=document.createElement("button");
        c.innerText="复制";
        c.className="copyBtn";
        c.onclick=()=>navigator.clipboard.writeText(p);

        let d=document.createElement("button");
        d.innerText="删除";
        d.className="delBtn";
        d.onclick=()=>{history.splice(i,1);render();};

        act.appendChild(c);
        act.appendChild(d);

        div.appendChild(span);
        div.appendChild(act);

        list.appendChild(div);
    });
}

$("gen").onclick=()=>{
    let p=gen(+len.value);
    out.value=p;
    strength(p);
    add(p);
};

$("copy").onclick=()=>{
    if(out.value)
    navigator.clipboard.writeText(out.value);
};

$("clear").onclick=()=>{
    out.value="";
    bar.style.width="0%";
    text.innerText="";
};

$("save").onclick=()=>{
    let blob=new Blob([out.value],{type:"text/plain"});
    let a=document.createElement("a");
    a.href=URL.createObjectURL(blob);
    a.download="password.txt";
    a.click();
};


window.onload = () => {

    // 1️⃣ 清空当前密码
    out.value = "";

    // 2️⃣ 清空强度条
    bar.style.width = "0%";
    text.innerText = "";

    // 3️⃣ 清空历史记录
    history = [];
    list.innerHTML = "";

};






