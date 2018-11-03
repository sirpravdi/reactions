'use strict';
/** Class perpesenting a reactions */
var Reactions = /** @class */ (function () {
  /**
       * Create a reactions poll.
       * @param {object} data - object containing poll emojis, title and parent element.
       * @param {string} data.parent - element where poll is inserted.
       * @param {string[]} data.reactions - list of poll emojis.
       * @param {string} data.title - poll title.
       * @throws Will throw an error if parent element is not found.
       */
  function Reactions(data) {
    var _this = this;

    this.picked = null;
    this.reactions = [];
    this.wrap = this.createElement('div', Reactions.CSS.wrapper, null);
    var parent = document.querySelector(data.parent);
    var pollTitle = this.createElement('span', Reactions.CSS.title, { textContent: data.title });

    this.wrap.append(pollTitle);
    data.reactions.forEach(function (item, i) {
      return _this.reactions.push(_this.addReaction(item, i));
    });
    if (parent) {
      parent.append(this.wrap);
    } else {
      throw new Error('Parent element is not found');
    }
  }
  Object.defineProperty(Reactions, 'CSS', {
    /** returns style name */
    get: function () {
      return {
        wrapper: 'reactions',
        title: 'reactions__title',
        reactionContainer: 'reactions-counter',
        emoji: 'reactions-counter__emoji',
        picked: 'reactions-counter--picked',
        votes: 'reactions-counter__votes'
      };
    },
    enumerable: true,
    configurable: true
  });
  /** increase counter and highlight emoji
      * @param {string} index - index of voted reaction.
      */
  Reactions.prototype.vote = function (index) {
    var storageKey = 'reactionIndex' + index;
    var votes = this.getCounter(storageKey) + 1;

    this.reactions[index].reactionContainer.classList.add(Reactions.CSS.picked);
    this.setCounter(storageKey, votes);
    this.reactions[index].counter.textContent = votes.toString();
  };
  /** decrease counter and remove highlight
      * @param {string} index - index of unvoted reaction.
      */
  Reactions.prototype.unvote = function (index) {
    var storageKey = 'reactionIndex' + index;
    var votes = this.getCounter(storageKey) - 1;

    this.reactions[index].reactionContainer.classList.remove(Reactions.CSS.picked);
    this.setCounter(storageKey, votes);
    this.reactions[index].counter.textContent = votes.toString();
  };
  /** return value of counter stored in localStorage
      * @param {string} key - field name in localStorage.
      */
  Reactions.prototype.getCounter = function (key) {
    return parseInt(window.localStorage.getItem(key) || '');
  };
  /** set new value of counter stored in localStorage
      * @param {string} key - field name in localStorage.
      * @param {number} value - new field value.
      */
  Reactions.prototype.setCounter = function (key, value) {
    window.localStorage.setItem(key, value.toString());
  };
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
  Reactions.prototype.addReaction = function (item, i) {
    var _this = this;
    var reactionContainer = this.createElement('div', Reactions.CSS.reactionContainer, null);
    var emoji = this.createElement('div', Reactions.CSS.emoji, { textContent: String.fromCodePoint(parseInt(item)) });
    var storageKey = 'reactionIndex' + i;

    emoji.addEventListener('click', function (click) {
      return _this.reactionClicked(i);
    });
    var votes = this.getCounter(storageKey);

    if (!votes) {
      votes = 0;
      this.setCounter(storageKey, votes);
    }
    var counter = this.createElement('span', Reactions.CSS.votes, { textContent: votes });

    reactionContainer.append(emoji);
    reactionContainer.append(counter);
    this.wrap.append(reactionContainer);
    return { reactionContainer: reactionContainer, counter: counter };
  };
  /** processing click on emoji
      * @param {string} index - index of reaction clicked by user.
      */
  Reactions.prototype.reactionClicked = function (index) {
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
  };
  /** making creation of dom elements easier
      * @param {string} elName - string containing tagName.
      * @param {array|string} classList - string containing classes names for new element.
      * @param {string} attrList - string containing attributes names for new element.
      */
  Reactions.prototype.createElement = function (elName, classList, attrList) {
    var _a;
    var el = document.createElement(elName);

    if (classList) {
      if (Array.isArray(classList)) {
        (_a = el.classList).add.apply(_a, classList);
      } else {
        el.classList.add(classList);
      }
    }
    if (attrList) {
      for (var attrName in attrList) {
        if (attrList.hasOwnProperty(attrName)) {
          el.setAttribute(attrName, attrList[attrName]);
        }
      }
    }
    return el;
  };
  return Reactions;
}());

;
new Reactions({ parent: 'body', title: 'What do you think?', reactions: ['0x1F601', '0x1F914', '0x1F644'] });
