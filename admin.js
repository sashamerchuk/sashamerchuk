let textArea = document.getElementsByTagName('textarea');
let input = document.getElementsByClassName('input');
let containerFoto = document.getElementsByClassName('imgContainer');
function add_news(){
    containerFoto[0].src=input[0].files;
    console.log(input[0].value);
    if (textArea[0].value==''){
        alert('Enter your title!!!');
        textArea[0].style.boxShadow='0 0 0 1px red';
    }else {
        textArea[0].style.boxShadow='0 0 0 0 black';
    }
     if(textArea[1].value=='') {
         alert("Enter the text please!!!");
         textArea[1].style.boxShadow = '0 0 0 1px red';
     }else{
         textArea[1].style.boxShadow='0 0 0 0 black';
     }
     if(textArea[0].value && textArea[1].value && input[0].value){
         textArea[0].value='';
         textArea[1].value='';
         input[0].value='';
         alert('Your news succesfully added!');
     }else{
         alert('add the image');
     }


}
