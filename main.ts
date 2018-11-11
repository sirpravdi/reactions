'use strict';

interface data {
  parent: string, 
  title: string,
  reactions: string[]
}

interface reaction {
  reactionContainer: HTMLElement,
  counter: HTMLElement
}

/** Class perpesenting a reactions */
class Reactions {
  private picked: number|null;
  private reactions: reaction[];
  private wrap: HTMLElement;

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
     * @param {string} data.title - poll title.
     * @throws Will throw an error if parent element is not found.
     */
  constructor(data: data) {
    this.picked = null;
    this.reactions = [];
    this.wrap = this.createElement('div', Reactions.CSS.wrapper, null);
    const parent:HTMLElement|null = document.querySelector(data.parent);

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
  vote(index:number) {
    const storageKey = 'reactionIndex' + index;
    const votes = this.getCounter(storageKey) + 1;

    this.reactions[index].reactionContainer.classList.add(Reactions.CSS.picked);
    this.setCounter(storageKey, votes);
    this.reactions[index].counter.textContent = votes.toString();
  }

  /** decrease counter and remove highlight
    * @param {string} index - index of unvoted reaction.
    */
  unvote(index:number) {
    const storageKey = 'reactionIndex' + index;
    const votes = this.getCounter(storageKey) - 1;

    this.reactions[index].reactionContainer.classList.remove(Reactions.CSS.picked);
    this.setCounter(storageKey, votes);
    this.reactions[index].counter.textContent = votes.toString();
  }

  /** return value of counter stored in localStorage
    * @param {string} key - field name in localStorage.
    */
  getCounter(key:string){
    return parseInt(window.localStorage.getItem(key) || '');
  }

  /** set new value of counter stored in localStorage
    * @param {string} key - field name in localStorage.
    * @param {number} value - new field value.
    */
  setCounter(key:string, value:number) {
    window.localStorage.setItem(key, value.toString());
  }

  /**
    * @typedef {Object} Reaction
    * @property {HTMLElement} reactionContainer
    * @property {HTMLElement} counter
    */

  /** create and insert reactions button
    * @param {string} item - emoji from data.reactions array.
    * @param {string} i - array counter.
    * @return {Reaction} - contains group of three elements - reactionContainer, emoji element and it's counter
    */
  addReaction(item:string, i:number) {
    const reactionContainer = this.createElement('div', Reactions.CSS.reactionContainer, null);
    const emoji = this.createElement('div', Reactions.CSS.emoji, {textContent: String.fromCodePoint(parseInt(item))});
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

    return {reactionContainer, counter};
  }

  /** processing click on emoji
    * @param {string} index - index of reaction clicked by user.
    */
  reactionClicked(index:number) {
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
  createElement(elName:string, classList:string|string[]|null, attrList:Object|null) {
    const el = document.createElement(elName);

    if (classList) {
      if (Array.isArray(classList)) {
        el.classList.add(...classList);
      } else {
        el.classList.add(classList);
      }
    }

    if (attrList) {
      for (const attrName in attrList) {
        console.log(attrName);
        console.log(el.getAttribute(attrName));
        if (attrList.hasOwnProperty(attrName)) {
          el[attrName] = attrList[attrName];
        }
      }
    }

    return el;
  }
};

new Reactions({parent: 'body', title: 'What do you think?', reactions: ['0x1F601', '0x1F914', '0x1F644']});
