// CREATE AN ARRAY WHERE QUESTIONS ARE STORED IN OBJECTS 
const myArray=[
    {
        question:`What does the HTML acronym stand for?`,
        a:`Hyper Text Markup Language`,
        b:`High Tech Markup Language`,
        c:`Hyperlink and Text Markup Language`,
        d:`Home Tool Markup Language`,
        answer:`a`
    },
    {
        question:`Which HTML tag is used to create a hyperlink?`,
        a:` <link>`,
        b:`<href>`,
        c:` <a>`,
        d:`<hyperlink>`,
        answer:`b`
    },
    {
        question:`Which CSS property is used to control the spacing between lines of text within an element?`,
        a:`text-align`,
        b:` line-height`,
        c:`letter-spacing`,
        d:`margin-bottom`,
        answer:`b`
    },
    {
        question:`What is the purpose of the CSS property "margin: 10px 20px 15px 5px;"?`,
        a:`It sets a margin of 10 pixels on all sides of the element.`,
        b:` It sets different margins for the top, right, bottom, and left sides of the element.`,
        c:`It sets a margin of 20 pixels on the top and bottom, and 5 pixels on the right and left sides of the element.`,
        d:`It adjusts the padding of the element with specific values.`,
        answer:`b`
    },
    {
        question:`What is the purpose of the "document.getElementById()" function in JavaScript?
        `,
        a:`It retrieves the value of an HTML element.`,
        b:`It sets the text content of an HTML element.`,
        c:`It returns the first HTML element with the specified ID.`,
        d:`It creates a new HTML element in the document.`,
        answer:`c`
    },
    {
        question:`What is the difference between "let" and "const" in JavaScript when declaring variables?`,
        a:`Both "let" and "const" are used for constant variables.`,
        b:`"let" is used for block-scoped variables that can be reassigned, while "const" is used for variables that cannot be reassigned.`,
        c:`"let" is used for constant variables, and "const" is used for variables that can be reassigned.`,
        d:`"let" and "const" are interchangeable and can be used interchangeably in any context.`,
        answer:`b`
    }
]

//SELECT THE RELEVANT DOM ELEMENTS
const questionEl=document.getElementById(`questionEl`);
const aEl=document.getElementById(`answera`);
const bEl=document.getElementById(`answerb`);
const cEl=document.getElementById(`answerc`);
const dEl=document.getElementById(`answerd`);
const submitButton=document.getElementById(`submitButton`);
const radioButtons=document.querySelectorAll(`.answer`);
const card=document.querySelector(`.card`);
//SET COUNT FOR CURRENT QUESTION AND A SCORE TO CALCULATE SCORE
let currentQuestion=0;
let score=0;
let failedArray=[];


//ADD EVENT LISTENER SUCH THAT WHEN BUTTON IS CLICKED THE NEXT QUESTION IS LOGGED
submitButton.addEventListener(`click`,runEvent)

//FUNCTION TO IMMEDIATELY LOAD THE QUESTION ONCE THE PAGE HAS BEEN DISPLAYED
logData();
function logData(){
    //GET THE CURRENT QUESTION DATA FROM ARRAY
    const currentData=myArray[currentQuestion];
    //CALL FUNCTION TO DESELECT CHECKED INPUT
    deselectRadio();
    //LOG THE DATA TO THE DOM ELEMENTS
    questionEl.innerText=currentData.question;
    aEl.innerText=currentData.a;
    bEl.innerText=currentData.b;
    cEl.innerText=currentData.c;
    dEl.innerText=currentData.d;
}

//FUNCTION TO CHECK IF A RADIO BUTTON HAS BEEN CLICKED
function checkSelected(){
    let answer=undefined;
    Array.from(radioButtons).forEach((input)=>{
        if(input.checked){
            answer=input.id;
        }
    })
    return answer;

}

//FUNCTION TO DESELECT A RADIO BUTTON ONCE CLICKED

function deselectRadio(){
    Array.from(radioButtons).forEach((input)=>{
        input.checked=false;
    })
}



//FUNCTION TO LOG DATA ONCE BUTTON IS CLICKED

function runEvent(){
    //ASSIGN ID OBTAINED FROM CHECKSELECTED ANSWER TO VARIABLE
    const isAnyAnswerSelected=checkSelected();
    if(isAnyAnswerSelected){
        //CHECK IF THE ID IS THE SAME AS ANSWER IN THE ARRAY
        if(isAnyAnswerSelected===myArray[currentQuestion].answer){
            //IF SAME INCREASE SCORE
            score++;
        }else if(isAnyAnswerSelected!==myArray[currentQuestion].answer){
            failedArray.push(
                {
                    FailedQuestion:myArray[currentQuestion].question,
                    correctAnswer:myArray[currentQuestion].answer,
                    Youranswer: isAnyAnswerSelected
                }
            )
        }
        //INCREASE THE CURRENT QUESTION COUNT
        currentQuestion++;
        //IF STATEMENT TO CHECK IF OUR CURRENT COUNT IS MORE THAN ALL QUESTIONS IN THE ARRAY
        if(currentQuestion<myArray.length){
            logData();
            
        }else{
            card.innerHTML=`<h3>You have completed the quiz with a score of ${score} out of ${myArray.length}</h3>`;
        }
    }else{
        alert(`You have not selected any choice..`)
    }
    
}

