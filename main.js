'use strict';
class Reactions {
    /**
       * Create a reactions poll.
       * @param {object} data - object containing poll emojis, title and parent element.
       * @param {string} data.parent - element where poll is inserted.
       * @param {string[]} data.reactions - list of poll emojis.
       * @param {string} title - poll title.
       * @throws Will throw an error if parent element is not found.
       */
    constructor(data) {
        this.picked = null;
        this.wrap = this.createElement('div', 'reactions-wrapper');
        const parent = document.querySelector(data.parent);
        if (parent) {
            parent.append(this.wrap);
        }
        else {
            throw new Error('Parent element is not found');
        }
        const pollTitle = this.createElement('span', 'reactions-wrapper__title', { innerText: data.title });
        this.wrap.append(pollTitle);
        data.reactions.forEach((item, i) => this.addReaction(item, i));
    }
    /** create and insert reactions button
      * Create a reactions poll.
      * @param {string} item - emoji from data.reactions array.
      * @param {string} i - array counter.
      */
    addReaction(item, i) {
        const counter = this.createElement('div', 'reactions-wrapper__counter');
        const emoji = this.createElement('div', 'reactions-wrapper__emoji', {
            textContent: String.fromCodePoint(item),
        });
        const storageKey = 'reactionIndex' + i;
        emoji.dataset.index = String(i);
        emoji.addEventListener('click', (click) => this.reactionClicked(emoji));
        let votes = this.getCounter(storageKey);
        if (!votes) {
            votes = 0;
            this.setCounter(storageKey, votes);
        }
        const index = this.createElement('span', 'reactions-wrapper__votes', { innerText: votes });
        this.wrap.append(counter);
        counter.append(emoji);
        counter.append(index);
    }
    /** making creation of dom elements easier
      * making creation of dom elements easier
      * @param {string} elName - string containing tagName.
      * @param {array|string} classList - string containing classes names for new element.
      * @param {string} attrList - string containing attributes names for new element.
      */
    createElement(elName, classList, attrList) {
        const el = document.createElement(elName);
        if (classList) {
            if (Array.isArray(classList)) {
                el.classList.add(...classList);
            }
            else {
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
    /** return value of counter stored in localStorage
      * return value of counter stored in localStorage.
      * @param {string} key - field name in localStorage.
      */
    getCounter(key) {
        return parseInt(localStorage.getItem(key));
    }
    /** processing click on emoji
      * processing click on emoji
      * @param {HTMLElement} clickedEmoji - reaction clicked by user.
      */
    reactionClicked(clickedEmoji) {
        if (!this.picked) { /** If there is no previously picked reaction */
            const clickedStorageKey = 'reactionIndex' + clickedEmoji.dataset.index;
            const clickedVotes = this.getCounter(clickedStorageKey) + 1;
            clickedEmoji.classList.add('reactions-wrapper__emoji--picked');
            this.setCounter(clickedStorageKey, clickedVotes);
            clickedEmoji.parentElement.querySelector('.reactions-wrapper__votes').textContent = String(clickedVotes);
            this.picked = clickedEmoji;
            return;
        }
        if (this.picked !== clickedEmoji) { /** If clicked reaction and previosly picked reaction are not the same */
            const pickedStorageKey = 'reactionIndex' + this.picked.dataset.index;
            const clickedStorageKey = 'reactionIndex' + clickedEmoji.dataset.index;
            const pickedVotes = this.getCounter(pickedStorageKey) - 1;
            const clickedVotes = this.getCounter(clickedStorageKey) + 1;
            this.picked.classList.remove('reactions-wrapper__emoji--picked');
            this.setCounter(pickedStorageKey, pickedVotes);
            this.picked.parentElement.querySelector('.reactions-wrapper__votes').textContent = String(pickedVotes);
            clickedEmoji.classList.add('reactions-wrapper__emoji--picked');
            this.setCounter(clickedStorageKey, clickedVotes);
            clickedEmoji.parentElement.querySelector('.reactions-wrapper__votes').textContent = String(clickedVotes);
            this.picked = clickedEmoji;
            return;
        }
        /*If clicked reaction and previosly picked reaction are the same*/
        const pickedStorageKey = 'reactionIndex' + this.picked.dataset.index;
        const pickedVotes = this.getCounter(pickedStorageKey) - 1;
        this.picked.classList.remove('reactions-wrapper__emoji--picked');
        this.setCounter(pickedStorageKey, pickedVotes);
        this.picked.parentElement.querySelector('.reactions-wrapper__votes').textContent = String(pickedVotes);
        this.picked = null;
    }
    /** set new value of counter stored in localStorage
      * return value of counter stored in localStorage.
      * @param {string} key - field name in localStorage.
      * @param {string} value - new field value.
      */
    setCounter(key, value) {
        window.localStorage.setItem(key, value);
    }
}
new Reactions({ parent: 'body', title: 'What do you think?', reactions: ['0x1F601', '0x1F914', '0x1F644'] });
//# sourceMappingURL=main.js.map