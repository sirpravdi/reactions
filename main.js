var Reactions = (function() {

  function createPoll(data) {
      let wrap = document.createElement('div');
      wrap.classList.add('wrapper');
      document.body.append(wrap);
      let poll_title = document.createElement('span');
      poll_title.classList.add('poll_title');
      poll_title.innerText = data.title;
      wrap.append(poll_title);
      data.reactions.forEach(function(item, i, arr) {
        let counter = document.createElement('div');
        counter.classList.add('counter');
        wrap.append(counter);
        let label = document.createElement('label');
        label.classList('picked_emoji';
        label.textContent = String.fromCodePoint(item);
        label.setAttribute('data-counter', i);
        counter.append(label);
        let input = document.createElement('input');
        input.type = 'radio';
        input.name = 'poll';
        input.addEventListener('click', pollClick(wrap));
        label.append(input);
        let index = document.createElement('span');
        index.setAttribute('data-index', 'index' + i);
        if(!localStorage.getItem('index' + i)){
          localStorage.setItem('index' + i, 0);
        }
        index.innerText = localStorage.getItem('index' + i);
        counter.append(index);
    })
  };

  function pollClick(wrap) {
    if (wrap.querySelector('.picked')) {
      var prev = wrap.querySelector('.picked');
      prev.classList.remove('picked');
      localStorage.setItem('index' + prev.dataset.counter, parseInt(localStorage.getItem('index' + prev.dataset.counter)) - 1);
      wrap.querySelector('[data-index="index' + prev.dataset.counter + '"]').innerText = localStorage.getItem('index' + prev.dataset.counter);
    }
    if ((!prev) || (prev != this.parentElement)) {
      this.parentElement.classList.add('picked');
      localStorage.setItem('index' + this.parentElement.dataset.counter, parseInt(localStorage.getItem('index' + this.parentElement.dataset.counter)) + 1);
      wrap.querySelector('[data-index="index' + this.parentElement.dataset.counter + '"]').innerText = localStorage.getItem('index' + this.parentElement.dataset.counter);
    }
  };
  
  return{
    create: createPoll
  }
})();

Reactions.create({title: 'What do yout think?', reactions: ['0x1F601','0x1F914','0x1F644']});
