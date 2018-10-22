"use strict";

/** Class perpesenting a reactions */
class Reactions {
    /**
     * Create a reactions poll.
     * @param {object} data - object containing poll emojis and title.
     */
    constructor(data) {
        const wrap = this.domHelper("div", "reactions-wrapper");

        document.body.append(wrap);
        let pollTitle = this.domHelper("span", "reactions-wrapper__title");

        pollTitle.innerText = data.title;
        wrap.append(pollTitle);
        data.reactions.forEach(function (item, i, arr) {
            let counter = Reactions.prototype.domHelper("div", "reactions-wrapper__counter");

            wrap.append(counter);
            let label = Reactions.prototype.domHelper("label", "reactions-wrapper__emoji");

            label.textContent = String.fromCodePoint(item);
            label.dataset.reactionsCounter = i;
            counter.append(label);
            let input = Reactions.prototype.domHelper("input");

            input.type = "radio";
            input.name = "poll";
            input.addEventListener("click", Reactions.prototype.pollClick);
            label.append(input);
            let index = Reactions.prototype.domHelper("span");

            index.dataset.reactionsIndex = "index" + i;
            if (!localStorage.getItem("index" + i)) {
                localStorage.setItem("index" + i, 0);
            }
            index.innerText = localStorage.getItem("index" + i);
            counter.append(index);
        });
    }
    /** processing click on emoji */
    pollClick() {
        var wrap = document.querySelector(".reactions-wrapper");

        if (wrap.querySelector(".reactions-wrapper__emoji_picked")) {
            var prev = wrap.querySelector(".reactions-wrapper__emoji_picked");

            prev.classList.remove("reactions-wrapper__emoji_picked");
            localStorage.setItem("index" + prev.dataset.reactionsCounter, parseInt(localStorage.getItem("index" + prev.dataset.reactionsCounter)) - 1);
            wrap.querySelector("[data-reactions-index=\"index" + prev.dataset.reactionsCounter + "\"]").innerText = localStorage.getItem("index" + prev.dataset.reactionsCounter);
        }
        if ((!prev) || (prev != this.parentElement)) {
            this.parentElement.classList.add("reactions-wrapper__emoji_picked");
            localStorage.setItem("index" + this.parentElement.dataset.reactionsCounter, parseInt(localStorage.getItem("index" + this.parentElement.dataset.reactionsCounter)) + 1);
            wrap.querySelector("[data-reactions-index=\"index" + this.parentElement.dataset.reactionsCounter + "\"]").innerText = localStorage.getItem("index" + this.parentElement.dataset.reactionsCounter);
        }
    }
    /** making creation of dom elements easier */
    domHelper(elName, classList) {
        /**
        * making creation of dom elements easier
        * @param {string} elName - string containing tagName.
        * @param {string} classList - string containing classes names for new element.
        */
        let el = document.createElement(elName);

        if (Array.isArray(classList)) {
            el.classList.add(...classList);
        } else {
            el.classList.add(classList);
        }

        return el;
    }
};

new Reactions({title: "What do you think?", reactions: ["0x1F601", "0x1F914", "0x1F644"]});
