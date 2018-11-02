'use strict';

/** Class perpesenting a reactions */
class Reactions {
  /** returns style name */
  static get CSS() {
    return {
      wrapper: 'reactions',
      title: 'reactions__title',
      reactionContainer: 'reactions-counter',
      emoji: 'reactions-counter__emoji',
      picked: 'reactions-counter--picked',
      votes: 'reactions-counter__votes'
    };
  }
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
    this.reactions = [];
    this.wrap = this.createElement('div', Reactions.CSS.wrapper);
    const parent = document.querySelector(data.parent);

    const pollTitle = this.createElement('span', Reactions.CSS.title, {textContent: data.title});

    this.wrap.append(pollTitle);
    data.reactions.forEach((item, i) => this.reactions.push(this.addReaction(item, i)));
    if (parent) {
      parent.append(this.wrap);
    } else {
      throw new Error('Parent element is not found');
    }
  }

  /** increase counter and highlight emoji
    * @param {string} index - index of voted reaction.
    */
  vote(index) {
    const storageKey = 'reactionIndex' + index;
    const votes = this.getCounter(storageKey) + 1;

    this.reactions[index].reactionContainer.classList.add(Reactions.CSS.picked);
    this.setCounter(storageKey, votes);
    this.reactions[index].counter.textContent = votes;
  }

  /** decrease counter and remove highlight
    * @param {string} index - index of unvoted reaction.
    */
  unvote(index) {
    const storageKey = 'reactionIndex' + index;
    const votes = this.getCounter(storageKey) - 1;

    this.reactions[index].reactionContainer.classList.remove(Reactions.CSS.picked);
    this.setCounter(storageKey, votes);
    this.reactions[index].counter.textContent = votes;
  }

  /** return value of counter stored in localStorage
    * @param {string} key - field name in localStorage.
    */
  getCounter(key) {
    return parseInt(window.localStorage.getItem(key));
  }

  /** set new value of counter stored in localStorage
    * @param {string} key - field name in localStorage.
    * @param {string} value - new field value.
    */
  setCounter(key, value) {
    window.localStorage.setItem(key, value);
  }

  /**
    * @typedef {Object} Reaction
    * @property {HTMLElement} reactionContainer
    * @property {HTMLElement} emoji
    * @property {HTMLElement} counter
    */

  /** create and insert reactions button
    * @param {string} item - emoji from data.reactions array.
    * @param {string} i - array counter.
    * @return {Reaction} - contains group of three elements - reactionContainer, emoji element and it's counter
    */
  addReaction(item, i) {
    const reactionContainer = this.createElement('div', Reactions.CSS.reactionContainer);
    const emoji = this.createElement('div', Reactions.CSS.emoji, {textContent: String.fromCodePoint(item)});
    const storageKey = 'reactionIndex' + i;

    emoji.addEventListener('click', click => this.reactionClicked(i));
    let votes = this.getCounter(storageKey);

    if (!votes) {
      votes = 0;
      this.setCounter(storageKey, votes);
    }

    const counter = this.createElement('span', Reactions.CSS.votes, {textContent: votes});

    reactionContainer.append(emoji);
    reactionContainer.append(counter);
    this.wrap.append(reactionContainer);

    return {reactionContainer, emoji, counter};
  }

  /** processing click on emoji
    * @param {string} index - index of reaction clicked by user.
    */
  reactionClicked(index) {
    if (this.picked == null) { /** If there is no previously picked reaction */
      this.vote(index);
      this.picked = index;
      return;
    }

    if (this.picked != index) { /** If clicked reaction and previosly picked reaction are not the same */
      this.vote(index);
      this.unvote(this.picked);
      this.picked = index;

      return;
    }

    /* If clicked reaction and previosly picked reaction are the same*/
    this.unvote(index);
    this.picked = null;
  }

  /** making creation of dom elements easier
    * @param {string} elName - string containing tagName.
    * @param {array|string} classList - string containing classes names for new element.
    * @param {string} attrList - string containing attributes names for new element.
    */
  createElement(elName, classList, attrList) {
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
