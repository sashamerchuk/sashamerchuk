

let appeal = document.getElementsByClassName('container2');
let text=document.getElementById('contact-message');
let data=document.getElementsByClassName('data');
let name=document.getElementsByClassName('name');
let fullName=document.getElementsByClassName('fullName');
temp_date = new Date();
day = temp_date.getDate();
month = temp_date.getMonth() + 1;
year = temp_date.getFullYear();
function handlerText(){
    appeal[0].innerHTML=text.value;
    console.log(name[0].value);
    data[0].innerHTML=day + "." + month + "." + year;
    fullName[0].innerHTML=name[0].value;
}
function handlerText1(){
    let parentdiv=document.getElementsByClassName('row');
    let div = document.createElement('div');
    let divCont = document.createElement('div');
    let p = document.createElement('p');
    let img=document.createElement('img');
    let p1=document.createElement('p');
    let div2=document.createElement('div');
    let div21=document.createElement('div');
    let p2=document.createElement('p');
    p2.innerHTML=appeal[0].innerHTML=text.value;
    div21.className='container2';
    div2.className='col-sm-9';
    divCont.className='container1';
    div.className='col-sm-3';
    p.innerHTML=fullName[0].innerHTML=name[0].value;
    p1.className='data';
    p1.innerHTML=day + "." + month + "." + year;
    img.src='foto/rihannaVogue.jpg';
    img.className='rihanna';
    div.append(divCont);
    divCont.append(img);
    divCont.append(p);
    divCont.append(p1);
    div2.append(div21);
    div21.append(p2);
    parentdiv[0].prepend(div2);
    parentdiv[0].prepend(div);

}