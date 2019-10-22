let input=document.getElementsByClassName('input');
let flexParent=document.getElementsByClassName('flexParent1');

function add_news(){
    console.log(input[0].files[0]);
    let div=document.createElement('div');
    div.className='childFlex';
    let img = document.createElement('img');
    img.className='critica';
    img.src=input[0].files[0];
    let pHead = document.createElement('pHead');
    pHead.className='headNew';
    div.append(img);
    div.append(pHead);
    flexParent[0].append(div);
}