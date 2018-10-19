var Reactions = (function() {

  function createPoll(data) {
      let wrap = document.createElement('div');
      wrap.classList.add('reactions-wrapper');
      document.body.append(wrap);
      let poll_title = document.createElement('span');
      poll_title.classList.add('reactions-wrapper__title');
      poll_title.innerText = data.title;
      wrap.append(poll_title);
      data.reactions.forEach(function(item, i, arr) {
        let counter = document.createElement('div');
        counter.classList.add('reactions-wrapper__counter');
        wrap.append(counter);
        let label = document.createElement('label');
        label.classList.add('reactions-wrapper__emoji');
        label.textContent = String.fromCodePoint(item);
        label.dataset.reactionsCounter = i;
        counter.append(label);
        let input = document.createElement('input');
        input.type = 'radio';
        input.name = 'poll';
        input.addEventListener('click', pollClick);
        label.append(input);
        let index = document.createElement('span');
        index.dataset.reactionsIndex = 'index' + i;
        if(!localStorage.getItem('daindex' + i)){
          localStorage.setItem('index' + i, 0);
        }
        index.innerText = localStorage.getItem('index' + i);
        counter.append(index);
    })
  };

  function pollClick() {
    var wrap = document.querySelector('.reactions-wrapper');
    if (wrap.querySelector('.reactions-wrapper__emoji_picked')) {
      var prev = wrap.querySelector('.reactions-wrapper__emoji_picked');
      prev.classList.remove('reactions-wrapper__emoji_picked');
      localStorage.setItem('index' + prev.dataset.reactionsCounter, parseInt(localStorage.getItem('index' + prev.dataset.reactionsCounter)) - 1);
      wrap.querySelector('[data-reactions-index="index' + prev.dataset.reactionsCounter + '"]').innerText = localStorage.getItem('index' + prev.dataset.counter);
    }
    if ((!prev) || (prev != this.parentElement)) {
      this.parentElement.classList.add('reactions-wrapper__emoji_picked');
      localStorage.setItem('index' + this.parentElement.dataset.reactionsCounter, parseInt(localStorage.getItem('index' + this.parentElement.dataset.reactionsCounter)) + 1);
      wrap.querySelector('[data-reactions-index="index' + this.parentElement.dataset.reactionsCounter + '"]').innerText = localStorage.getItem('index' + this.parentElement.dataset.reactionsCounter);
    }
  };
  
  return{
    create: createPoll
  }
})();

Reactions.create({title: 'What do yout think?', reactions: ['0x1F601','0x1F914','0x1F644']});
