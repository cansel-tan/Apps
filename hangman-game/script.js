const word=document.getElementById('word');
const popup=document.getElementById('popup-container');
const message=document.getElementById('success-message');
const wrongWord=document.getElementById('wrong-letters');
const items=document.querySelectorAll('.item');
const messageWord=document.getElementById('message');
const button=document.getElementById('play-again');
//const warnPopup=document.getElementById('warnPopup');



const correctLetters=[];
const wrongLetters=[];
let selectedWord=getRandomWord();

function getRandomWord(){
    const words=["javascript","css","html","python","react","java"];

    return words[Math.floor(Math.random() * words.length)];

}

//üretilen her kelimenin div içerisine alınması      
function displayWord(){
    //her bir harf diziye çevirilir.Dizi elemanlarının her biri işlenip liste olarak tekrar döndürülür. (Map metodu)
    word.innerHTML=`
        ${selectedWord.split('').map(letter=> ` 
            <div class="letter">
                ${correctLetters.includes(letter)? letter: ''}
            </div>
    
        ` ).join('') }
    
    
    `;//liste elemanları join ile stringe çevrilir. 

    const w = word.innerText.replace(/\n/g,'');
    if(w === selectedWord){
        popup.style.display='flex'; 
        message.innerText='Congratulations!';
    }

}

function updateWrongLetters(){

        wrongWord.innerHTML=`          
                 ${wrongLetters.length>0? '<h3>Wrong Letters</h3>': ''}              
                 ${wrongLetters.map(letter=> `<span>${letter}<span>`)}
        
        `;
        // her hatalı harf için eklenecek items
        items.forEach((item,index)=>{
            const errorCount=wrongLetters.length; //hatalı harf sayısı gelir.
            //hatalı harf sayısından azsa
            if(index < errorCount){
                item.style.display='block';    
            }
            else{
                item.style.display='none';
            }
        })

        if(wrongLetters.length === items.length){
            popup.style.display='flex'; 
            message.innerText='You Lost!';
        }
}
function displayMessage(){


    setTimeout (function(){
        //2sn sonra mesaj kutusunun kaldırılması
        messageWord.classList.remove('show');
    },2000);
     //aynı harf kullanıldığında verilen uyarı
     messageWord.classList.add('show');
}
//try again button
button.addEventListener('click',function(){
        correctLetters.splice(0);
        wrongLetters.splice(0);
        
        //yeni kelime

        selectedWord=getRandomWord();
        displayWord();
        updateWrongLetters();

        popup.style.display='none';
});

//klavyeden girilcek harfler ile kullanıcının kelime tahmini
    window.addEventListener('keydown',  function(e){

        if(e.keyCode >=65 && e.keyCode<=90){
            const letter=e.key;

            //ekleme yapılırken daha önce o harfin olup olmadığının kontrolü
            if(selectedWord.includes(letter)){
                if(!correctLetters.includes(letter)){
                    correctLetters.push(letter);
                    displayWord();
                }
                else{
                    displayMessage();
                   
                }
            }
            else{//gösterilen kelimedeki harf yoksa
                if(!wrongLetters.includes(letter)){
                    wrongLetters.push(letter);
                    updateWrongLetters();
                }
                else{
                    displayMessage();
                }
            }
        }



    })

displayWord();