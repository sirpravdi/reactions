'use strict';

/** Class perpesenting a reactions */
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
    } else {
      throw new Error('Parent element is not found');
    }
    const pollTitle = this.createElement('span', 'reactions-wrapper__title', {innerText: data.title});

    this.wrap.append(pollTitle);
    data.reactions.forEach((item, i) => this.addReaction(item, i));
  }
  
  /** return value of counter stored in localStorage*/
  getCounter(key){  
    /**
       * return value of counter stored in localStorage.
       * @param {string} key - field name in localStorage.
       */
    return parseInt(window.localStorage.getItem(key));
  }
  
  /** set new value of counter stored in localStorage*/
  setCounter(key, value){
    /**
       * return value of counter stored in localStorage.
       * @param {string} key - field name in localStorage.
       * @param {string} value - new field value.
       */
    window.localStorage.setItem(key, value);
  }
  
  /** create and insert reactions button*/
  addReaction(item, i) {
    /**
       * Create a reactions poll.
       * @param {string} item - emoji from data.reactions array.
       * @param {string} i - array counter.
       */
    const counter = this.createElement('div', 'reactions-wrapper__counter');
    const label = this.createElement('label', 'reactions-wrapper__emoji', {textContent: String.fromCodePoint(item)});
    const storageKey = 'reactionIndex' + i;

    label.dataset.index = i;
    const input = this.createElement('input', null, {type: 'radio', name: 'poll'});

    input.addEventListener('click', click => this.reactionClicked(input.parentElement));
    
    let votes = this.getCounter(storageKey);

    if (!votes) {
      votes = 0;
      this.setCounter(storageKey, votes);
    }

    const index = this.createElement('span', null, {innerText: votes})
    
    this.wrap.append(counter);
    counter.append(label);
    label.append(input);
    counter.append(index);
  }

  /** processing click on emoji */
  reactionClicked(clickedEmoji) {
   /**
       * processing click on emoji
       * @param {HTMLElement} clickedEmoji - .
       */
    if(!this.picked){
      const clickedStorageKey = 'reactionIndex' + clickedEmoji.dataset.index;
      
      clickedEmoji.classList.add('reactions-wrapper__emoji--picked');
      this.setCounter(clickedStorageKey, this.getCounter(clickedStorageKey) + 1);
      clickedEmoji.nextSibling.innerText = this.getCounter(clickedStorageKey);
      this.picked = clickedEmoji;
      return;
    }
    
    if (this.picked != clickedEmoji) {
      const pickedStorageKey = 'reactionIndex' + this.picked.dataset.index;
      const clickedStorageKey = 'reactionIndex' + clickedEmoji.dataset.index;
      
      this.picked.classList.remove('reactions-wrapper__emoji--picked');
      this.setCounter(pickedStorageKey, this.getCounter(pickedStorageKey) - 1);
      this.picked.nextSibling.innerText = this.getCounter(pickedStorageKey);
      clickedEmoji.classList.add('reactions-wrapper__emoji--picked');
      this.setCounter(clickedStorageKey, this.getCounter(clickedStorageKey) + 1);
      clickedEmoji.nextSibling.innerText = this.getCounter(clickedStorageKey);
      this.picked = clickedEmoji;
      return;
    }
    const pickedStorageKey = 'reactionIndex' + this.picked.dataset.index;

    this.picked.classList.remove('reactions-wrapper__emoji--picked');
    this.setCounter(pickedStorageKey, this.getCounter(pickedStorageKey) - 1);
    this.picked.nextSibling.innerText = this.getCounter(pickedStorageKey);
    this.picked = null;
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

    if (classList) {
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

new Reactions({parent: 'body', title: 'What do you think?', reactions: ['0x1F601', '0x1F914', '0x1F644']});
