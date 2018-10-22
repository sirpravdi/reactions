"use strict";

/** Class perpesenting a reactions */
class Reactions {
    /**
     * Create a reactions poll.
     * @param {object} data - object containing poll emojis, title and parent element.
     */
    constructor(data) {
        const wrap = this.createElement("div", "reactions-wrapper");
        
        data.parent.append(wrap);
        let pollTitle = this.createElement("span", "reactions-wrapper__title", {innerText: data.title});
        
        wrap.append(pollTitle);
        data.reactions.forEach(function (item, i, arr) {
            let counter = Reactions.prototype.createElement("div", "reactions-wrapper__counter");

            wrap.append(counter);
            let label = Reactions.prototype.createElement("label", "reactions-wrapper__emoji", {textContent: String.fromCodePoint(item)});

            label.dataset.reactionsCounter = i;
            counter.append(label);                                    
            let input = Reactions.prototype.createElement("input", null, {type: "radio", name: "poll"});
            
            input.addEventListener("click", Reactions.prototype.pollClick);
            label.append(input);
 
            if (!localStorage.getItem("reactionIndex" + i)) {
                localStorage.setItem("reactionIndex" + i, 0);
            }
            let index = Reactions.prototype.createElement("span", null, {innerText: localStorage.getItem("reactionIndex" + i)});
            
            index.dataset.reactionsIndex = "index" + i;

            counter.append(index);
        });
    }
    /** processing click on emoji */
    pollClick() {
        let wrap = document.querySelector(".reactions-wrapper");

        if (wrap.querySelector(".reactions-wrapper__emoji_picked")) {
            var prev = wrap.querySelector(".reactions-wrapper__emoji_picked");

            prev.classList.remove("reactions-wrapper__emoji_picked");
            localStorage.setItem("reactionIndex" + prev.dataset.reactionsCounter, parseInt(localStorage.getItem("reactionIndex" + prev.dataset.reactionsCounter)) - 1);
            wrap.querySelector("[data-reactions-index=\"index" + prev.dataset.reactionsCounter + "\"]").innerText = localStorage.getItem("reactionIndex" + prev.dataset.reactionsCounter);
        }
        if ((!prev) || (prev != this.parentElement)) {
            this.parentElement.classList.add("reactions-wrapper__emoji_picked");
            localStorage.setItem("reactionIndex" + this.parentElement.dataset.reactionsCounter, parseInt(localStorage.getItem("reactionIndex" + this.parentElement.dataset.reactionsCounter)) + 1);
            wrap.querySelector("[data-reactions-index=\"index" + this.parentElement.dataset.reactionsCounter + "\"]").innerText = localStorage.getItem("reactionIndex" + this.parentElement.dataset.reactionsCounter);
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
        let el = document.createElement(elName);
        
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

new Reactions({parent: document.body, title: "What do you think?", reactions: ["0x1F601", "0x1F914", "0x1F644"]});
