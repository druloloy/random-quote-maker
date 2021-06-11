import data from './data/data.js';

const importedData = data;



/**
 * DOM MANIPULATION
 */


// Manage DOM
const DOMManager = {
    author_name_holder: document.querySelector('#author'),
    author_tag_holder: document.querySelector('#author-tag'),
    author_image: document.querySelector('#profile-photo'),
    quote_holder: document.querySelector('#text'),
    generate_btn: document.querySelector('#new-quote'),
    copy_quote: document.querySelector('#copy-quote'),
    currIndex: null,
    randomNumber: null,


    updateAuthorName: function(n){
        this.author_name_holder.innerHTML = n;
    },
    updateAuthorTag: function(n){
        this.author_tag_holder.innerHTML = '@'+n;
    },
    updateAuthorImage: function(n){
        this.author_image.src = n;
    },
    updateQuote: function(n){
        this.quote_holder.innerHTML = n;
    },
    updateAll: function({author_name, author_tag, author_image, quote}){
        this.updateAuthorName(author_name);
        this.updateAuthorTag(author_tag);
        this.updateAuthorImage(author_image);
        this.updateQuote(quote);
    },
    generateNewQuote: function(state){
        this.currIndex = this.randomNumber;
        this.randomNumber = Math.floor(Math.random()*state.length);
        if(this.currIndex===this.randomNumber) this.generateNewQuote(state);

        this.updateAll(state[this.randomNumber]);
    },
}

/**
 * DATA PROCESSING
 */

const ManageData = {
    state: [],
    setState: function(newState){
        return this.state = newState;
    },
    processData: function(dataToBeProcessed = []){
        const that = ManageData;
        dataToBeProcessed.map(data=>{
            const processedData = {
                    author_name: data.author,
                    author_tag: data.author_tag,
                    author_image: data.author_image,
                    quote: data.quote
                };
    
            that.setState([...that.state, processedData]);
        });
    },
    getState: function(){
        return ManageData.state;
    }
}



window.addEventListener('load', () => {
    const { processData, getState } = ManageData;

    processData(importedData);

    const currentState = getState();

    // GENERATE RANDOM QUOTE ON WINDOW LOAD
    DOMManager.generateNewQuote(currentState);

    // GENERATE RANDOM QUOTE ON BUTTON CLICK
    DOMManager.generate_btn.onclick = () => {
        DOMManager.generateNewQuote(currentState);
    }

    // COPY TEXT TO CLIPBOARD
    
    DOMManager.copy_quote.onclick = () => {
        const range = document.createRange();
        range.selectNode(DOMManager.quote_holder);
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);
        document.execCommand('copy');
        document.getSelection().removeAllRanges();

        const alert = document.querySelector('.alert');
        alert.style.visibility = 'visible';
        setTimeout(() => {
            alert.style.visibility = 'hidden';
        }, 3000);
    }
});

