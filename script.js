let books = ["Genesis","Exodus", "Leviticus","Numbers","Deuteronomy","Joshua","Judges","Ruth","1 Samuel","2 Samuel","1 Kings","2 Kings","1 Chronicles","2 Chronicles","Ezra","Nehemiah","Esther","Job","Psalms","Proverbs","Ecclesiastes","Song of Songs","Isaiah","Jeremiah","Lamentations","Ezekiel","Daniel","Hosea","Joel","Amos","Obadiah","Jonah","Micah", "Nahum", "Habakkuk", "Zephaniah", "Haggai", "Zechariah", "Malachi", "Matthew", "Mark", "Luke", "John", "Acts", "Romans", "1 Corinthians", "2 Corinthians", "Galatians", "Ephesians", "Philippians", "Colossians", "1 Thessalonians", "2 Thessalonians", "1 Timothy", "2 Timothy", "Titus", "Philemon", "Hebrews", "James", "1 Peter", "2 Peter", "1 John", "2 John", "3 John", "Jude", "Revelation"]
let newTestamentIndex = books.indexOf("Matthew")
let bookElem = document.querySelector("#book")
let buttonDiv = document.querySelector("#buttons")
let congrats = ["Bravo!", "Well Done!", "Keep Going!"]
let wrong = ["Wrong!", "Nope!", "Try again!"]
let pointsElem = document.querySelector("#points")

let check = function(book){
    if (books.indexOf(book) >= newTestamentIndex){
        return "new"
    } else {
        return "old"
    }
}

// Add this at the start of your script
window.addEventListener('load', function() {
    // Timeout needed for iOS
    setTimeout(function() {
        window.scrollTo(0, 1);
    }, 0);
});

// Handle resize events
window.addEventListener('resize', function() {
    setTimeout(function() {
        window.scrollTo(0, 1);
    }, 0);
});

// Force hide on first interaction
document.body.addEventListener('touchstart', function() {
    setTimeout(function() {
        window.scrollTo(0, 1);
    }, 0);
}, {once: true});

let points = 0
let lastState = null
let state = "answering"
let win = ""
buttonDiv.dataset.mobile = localStorage.getItem("mobile")

setInterval(function(){
    if (state != lastState){
        if (state == "answering"){
            lastState = state
            let book = books[Math.round(Math.random()*(books.length - 1))]
            bookElem.innerText = book
            pointsElem.innerHTML = `${points} point${points == 1 ? "" : "s"}`
            buttonDiv.innerHTML = `
            <button onclick="if (check('${book}') == 'old') { points++; win = 'yes' } else { win = 'no' } state = 'answered'">Old Testament</button>            
            <button onclick="if (check('${book}') == 'new') { points++; win = 'yes' } else { win = 'no' } state = 'answered'">New Testament</button>
            `
        } else if (state == "answered"){
            lastState = state
            buttonDiv.innerHTML = `
            ${win == "yes" ? `<h2>${congrats[Math.round(Math.random()*(congrats.length - 1))]}</h2>` : `<h2>${wrong[Math.round(Math.random()*(wrong.length - 1))]}</h2>`}
            <button onclick="state = 'answering'">Next</button>
            <button onclick="state = 'finished'">Finish</button>
            `
            pointsElem.innerHTML = `${points} point${points == 1 ? "" : "s"}`
        } else {
            document.body.innerHTML = `
            <h1>You got <code>${points}</code> point${points == 1 ? "" : "s"}!</h1>
            <button onclick="location.reload()">Restart</button>`
        }
    }
    
    
    
})