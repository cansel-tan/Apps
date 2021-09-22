const display=document.querySelector('.calculator-input');
const keys=document.querySelector('.calculator-keys');

let displayValue='0';
let operator=null;
let firstValue=null;//görünen değer
let waitingForSecondValue=false; //ikinci değer

updateDisplay();

function updateDisplay(){
    display.value=displayValue;
}

keys.addEventListener('click', function(e){
    const element=e.target;
    const value=element.value;
    if(!element.matches('button')) return; //ulaşmış olduğumuz elementin buton olup olmadığının kontrolü
    
    switch(value){
        case '+':
        case '-':
        case '*':
        case '/':
        case '=':
            handleOperator(value);
            break;  // ilgili operatorlere karşılık gelen bir durum yoksa
        case '.':
            inputDecimal();
            break;
        case 'clear':
            clear();    
            break;

        default:
            inputNumber(element.value);
    }   
    updateDisplay(); 
});

    function handleOperator(NextOperator){
        const value=parseFloat(displayValue);
        
        if(operator && waitingForSecondValue){// birden fazla operatore tıklandığında işlemin devam etmesi için operator güncellemesi
           operator=NextOperator; 
           return; 
        }
        if(firstValue===null){//ilk bilgi girişi
            firstValue=value;
        }

        else if(operator){
            const result=calculate(firstValue,value,operator);// operator bilgisi set edilmesi

            displayValue=`${parseFloat(result.toFixed(7))}`;//ondalıklı sonuçta basamak sınırlaması
            firstValue=result;

        }
        waitingForSecondValue=true;
        operator=NextOperator;

        console.log(displayValue,firstValue,waitingForSecondValue,operator);

    }

    function calculate(first,second,operator){
        if(operator === '+'){
            return first + second;
        }
        else if(operator === '-'){
            return first - second;
        }
        else if(operator === '*'){
            return first * second;
        }
        else if(operator === '/'){
            return first / second;
        }

        return second;
    }

    function inputNumber(num){
        if(waitingForSecondValue){
            displayValue=num;
            waitingForSecondValue=false;
        }
        else{
            displayValue=displayValue === '0' ? num: displayValue +num;   //basılan her yeni numaranın eklenmesi 
        }
        console.log(displayValue,firstValue,waitingForSecondValue,operator);
    }

    function inputDecimal(num){
        if(!displayValue.includes('.')){ //önceden nokta bilgisi içermiyorsa eklemesi için            
            displayValue+='.';  
        } 
    }

    function clear(){
        displayValue='0';
    }