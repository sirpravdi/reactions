'use strict';

/** Class perpesenting a reactions */
class Reactions {
  /**
     * Create a reactions poll.
     * @param {object} data - object containing poll emojis, title and parent element.
     * @param {HTMLElement} data.parent - element where poll is inserted.
     * @param {string[]} data.reactions - list of poll emojis.
     * @param {string} title - poll title.
     */
  constructor(data) {
    this.wrap = this.createElement('div', 'reactions-wrapper');
    document.querySelector(data.parent).append(this.wrap);
    const pollTitle = this.createElement('span', 'reactions-wrapper__title', {innerText: data.title});

    this.wrap.append(pollTitle);
    data.reactions.forEach((item, i, arr) => {
      const counter = this.createElement('div', 'reactions-wrapper__counter');

      this.wrap.append(counter);
      const label = this.createElement('label', 'reactions-wrapper__emoji', {textContent: String.fromCodePoint(item)});

      label.dataset.reactionsCounter = i;
      counter.append(label);
      const input = this.createElement('input', null, {type: 'radio', name: 'poll'});

      input.addEventListener('click', click => this.pollClick(click.target));
      label.append(input);

      if (!window.localStorage.getItem('reactionIndex' + i)) {
        window.localStorage.setItem('reactionIndex' + i, 0);
      }
      const index = this.createElement('span', null, {innerText: window.localStorage.getItem('reactionIndex' + i)});

      index.dataset.reactionsIndex = 'index' + i;

      counter.append(index);
    });
  }

  /** processing click on emoji */
  pollClick(clicked) {
    let prev = null;

    if (this.wrap.querySelector('.reactions-wrapper__emoji--picked')) {
      prev = this.wrap.querySelector('.reactions-wrapper__emoji--picked');
      prev.classList.remove('reactions-wrapper__emoji--picked');
      const storageKey = 'reactionIndex' + prev.dataset.reactionsCounter;

      window.localStorage.setItem(storageKey, parseInt(window.localStorage.getItem(storageKey)) - 1);
      this.wrap.querySelector('[data-reactions-index="index' + prev.dataset.reactionsCounter + '"]').innerText = window.localStorage.getItem(storageKey);
    }
    if ((!prev) || (prev != clicked.parentElement)) {
      const storageKey2 = 'reactionIndex' + clicked.parentElement.dataset.reactionsCounter;

      clicked.parentElement.classList.add('reactions-wrapper__emoji--picked');
      window.localStorage.setItem(storageKey2, parseInt(window.localStorage.getItem(storageKey2)) + 1);
      this.wrap.querySelector('[data-reactions-index="index' + clicked.parentElement.dataset.reactionsCounter + '"]').innerText = window.localStorage.getItem(storageKey2);
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
