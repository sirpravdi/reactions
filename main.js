"use strict";

/** Class perpesenting a reactions */
class Reactions {
    /**
     * Create a reactions poll.
     * @param {object} data - object containing poll emojis, title and parent element.
     * @param {HTMLElement} data.parent - element where poll is inserted.
     * @param {string[]} data.reactions - list of poll emojis.
     * @param {string} title - poll title.
     * @throws Will throw an error if parent element is not found.
     */
    constructor(data) {
        this.picked = null;
        this.wrap = this.createElement("div", "reactions-wrapper");
        
        if (document.querySelector(data.parent)) {
            document.querySelector(data.parent).append(this.wrap);
        } else {
            throw new Error("Parent element is not found");
        }
        const pollTitle = this.createElement("span", "reactions-wrapper__title", {innerText: data.title});
        
        this.wrap.append(pollTitle);
        data.reactions.forEach((item, i) => this.addReaction(item, i));
    }
    
    /*create and insert reactions button*/
    addReaction(item, i) {
        /**
         * Create a reactions poll.
         * @param {string} item - emoji from data.reactions array.
         * @param {string} i - array counter.
         */
            const counter = this.createElement("div", "reactions-wrapper__counter");

            this.wrap.append(counter);
            const label = this.createElement("label", "reactions-wrapper__emoji", {textContent: String.fromCodePoint(item)});

            label.dataset.reactionsCounter = i;
            counter.append(label);                                    
            const input = this.createElement("input", null, {type: "radio", name: "poll"});
            
            input.addEventListener("click", input => this.pollClick(input.target.parentElement));
            label.append(input);
 
            if (!localStorage.getItem("reactionIndex" + i)) {
                localStorage.setItem("reactionIndex" + i, 0);
            }
            const index = this.createElement("span", null, {innerText: localStorage.getItem("reactionIndex" + i)});
            
            index.dataset.reactionsIndex = "index" + i;

            counter.append(index);
    }
    
    /** processing click on emoji */
    pollClick(clicked) {
        if (this.picked) {
            if (this.picked != clicked){
                const storageKey = "reactionIndex" + this.picked.dataset.reactionsCounter;
                const storageKey2 = "reactionIndex" + clicked.dataset.reactionsCounter;
                const counter = this.picked.dataset.reactionsCounter;
                const counter2 = clicked.dataset.reactionsCounter;
                
                this.picked.classList.remove("reactions-wrapper__emoji--picked");
                localStorage.setItem(storageKey, parseInt(localStorage.getItem(storageKey)) - 1);
                this.wrap.querySelector("[data-reactions-index=\"index" + counter + "\"]").innerText = localStorage.getItem(storageKey);
                clicked.classList.add("reactions-wrapper__emoji--picked");
                localStorage.setItem(storageKey2, parseInt(localStorage.getItem(storageKey2)) + 1);
                this.wrap.querySelector("[data-reactions-index=\"index" + counter2 + "\"]").innerText = localStorage.getItem(storageKey2);
                this.picked = clicked;
            }
            else{
                const storageKey = "reactionIndex" + this.picked.dataset.reactionsCounter;
                const counter = this.picked.dataset.reactionsCounter;
                
                this.picked.classList.remove("reactions-wrapper__emoji--picked");
                localStorage.setItem(storageKey, parseInt(localStorage.getItem(storageKey)) - 1);
                this.wrap.querySelector("[data-reactions-index=\"index" + counter + "\"]").innerText = localStorage.getItem(storageKey);
                this.picked = null;
            }
        } else {
                const storageKey2 = "reactionIndex" + clicked.dataset.reactionsCounter;
                const counter2 = clicked.dataset.reactionsCounter;

                clicked.classList.add("reactions-wrapper__emoji--picked");
                localStorage.setItem(storageKey2, parseInt(localStorage.getItem(storageKey2)) + 1);
                this.wrap.querySelector("[data-reactions-index=\"index" + counter2 + "\"]").innerText = localStorage.getItem(storageKey2);
                this.picked = clicked;
        }
    }
    /** making creation of dom elements easier */
    createElement(elName, classList, attrList) {
        /**
        * making creation of dom elements easier
        * @param {string} elName - string containing tagName.
        * @param {array|string} classList - string containing classes names for new element.
        * @param {string} attrList - string containing attributes names for new element.
        */
        const el = document.createElement(elName);
        
        if(classList){
            if (Array.isArray(classList)) {
                el.classList.add(...classList);
            } else {
                el.classList.add(classList);
            }
        }
        
        for (const attrName in attrList) {
            if (attrList.hasOwnProperty(attrName)) {
                el[attrName] = attrList[attrName];
            }
        }

        return el;
    }
};

new Reactions({parent: 'body', title: "What do you think?", reactions: ["0x1F601", "0x1F914", "0x1F644"]});
