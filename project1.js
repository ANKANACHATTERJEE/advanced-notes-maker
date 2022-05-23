let add=document.getElementById('addBtn');
let search=document.getElementById('searchText');
showNotes();
add.addEventListener('click',function(){
    let obj=localStorage.getItem('notes');
    let objTitle=localStorage.getItem('notesTitle');
    if(objTitle==null){
        obj=[];
        objTitle=[];
    }
    else{
        obj=JSON.parse(obj);
        objTitle=JSON.parse(objTitle);
    }
    let input=document.getElementById('notesTitle');
    let textarea=document.getElementById('textarea');
    if(textarea!=null){
        obj.push(textarea.value);
        objTitle.push(input.value);
        console.log(textarea.value,input.value);
        localStorage.setItem('notes',JSON.stringify(obj));
        localStorage.setItem('notesTitle',JSON.stringify(objTitle));
    }
    textarea.value="";
    input.value="";
    showNotes();
});
function showNotes(){
    let obj=localStorage.getItem('notes');
    let objTitle=this.localStorage.getItem('notesTitle');
    let notes=document.getElementById('notes');
    if(obj!=null){
        obj=JSON.parse(obj);
        objTitle=JSON.parse(objTitle);
        let html=``;
        obj.forEach(function(element,index){
                html+=`
                <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
                    <div class="card-body">
                        <h5 class="card-title">${objTitle[index]}</h5>
                        <p class="card-text"> ${element}</p>
                        <button id="${index}"onclick="del(this.id)" class="btn btn-dark btn1">Delete Note</button><button id="${index+1}" onclick="markAsImportant(this.id)" class="btn btn-dark btn2 mt-2">Mark as Important</button><button id="${index+1}" onclick="undoImportant(this.id)" class="btn btn-dark btn3 mt-2" >Undo Important Note</button></div>
                </div>
                `;      
        })
        if(obj.length==0){
            html+=`<p>Nothing to show! Use "Add a Note" section above to add notes.</p>`;
        }
            notes.innerHTML=html;
    }
}
function del(index){
    let obj=JSON.parse(localStorage.getItem('notes'));
    let objTitle=JSON.parse(localStorage.getItem('notesTitle'));
    obj.splice(index,1);
    objTitle.splice(index,1);
    localStorage.setItem('notes',JSON.stringify(obj));
    localStorage.setItem('notesTitle',JSON.stringify(objTitle));
    showNotes();
}
search.addEventListener('input',function(){
    let text=search.value.toLowerCase();
    let noteCards=document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function(element){
        let cardText=(element.getElementsByTagName('p')[0].innerText).toLowerCase;
        let cardText2=(element.getElementsByTagName('h5')[0].innerText).toLowerCase;
        if(cardText.includes(text)||cardText2.includes(text)){
            console.log(element);
            element.style.display="block";
        }
        else{
            element.style.display="none";
        }
       
    })
})
let body=document.body;
body.addEventListener('mouseover',function(e){
    body.style.backgroundColor=`rgb(${e.offsetX},${e.offsetY},${e.offsetX+e.offsetY})`;
})
function markAsImportant(index){
    let noteCards=document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function(element){
        let button=element.getElementsByTagName('button')[1];
        if(button.id==index){
            element.style.backgroundColor="red";}
        })
}
function undoImportant(index){
    let noteCards=document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function(element){
        let button=element.getElementsByTagName('button')[1];
        if(button.id==index){
            element.style.backgroundColor="white";}
        })
}