var Reactions = (function() {

  function createPoll(data) {
      localStorage.setItem('title', data.title);

      data.reactions.forEach(function(item, i, arr) {
        localStorage.setItem('picked_emoji_' + i, String.fromCodePoint(item));
      });

      let wrap = document.createElement('div');
      wrap.className = 'wrapper';
      document.body.append(wrap);
      let poll_title = document.createElement('span');
      poll_title.className = 'poll_title';
      poll_title.innerText = localStorage.getItem('title');
      wrap.append(poll_title);
      let i = 0;
      while (localStorage.getItem('picked_emoji_' + i)) {
        let counter = document.createElement('div');
        counter.className = 'counter';
        wrap.append(counter);
        let label = document.createElement('label');
        label.className = 'picked_emoji';
        label.textContent = localStorage.getItem('picked_emoji_' + i);
        label.setAttribute('data-counter', i);
        counter.append(label);
        let input = document.createElement('input');
        input.type = 'radio';
        input.name = 'poll';
        input.addEventListener('click', pollClick);
        label.append(input);
        let index = document.createElement('span');
        index.setAttribute('data-index', 'index' + i);
        if(!localStorage.getItem('index' + i)){
          localStorage.setItem('index' + i, 0);
        }
        index.innerText = localStorage.getItem('index' + i);
        counter.append(index);
        i++;
    }
  };

  function pollClick() {
    if (document.querySelector('.picked')) {
      var prev = document.querySelector('.picked');
      prev.classList.remove('picked');
      localStorage.setItem('index' + prev.getAttribute('data-counter'), parseInt(localStorage.getItem('index' + prev.getAttribute('data-counter'))) - 1);
      document.querySelector('[data-index="index' + prev.getAttribute('data-counter') + '"]').innerText = localStorage.getItem('index' + prev.getAttribute('data-counter'));
    }
    if ((!prev) || (prev != this.parentElement)) {
      this.parentElement.classList.add('picked');
      this.parentElement.getAttribute('data-counter');
      localStorage.setItem('index' + this.parentElement.getAttribute('data-counter'), parseInt(localStorage.getItem('index' + this.parentElement.getAttribute('data-counter'))) + 1);
      document.querySelector('[data-index="index' + this.parentElement.getAttribute('data-counter') + '"]').innerText = localStorage.getItem('index' + this.parentElement.getAttribute('data-counter'));
    }
  };
  
  return{
    create: createPoll
  }
})();

Reactions.create({title: 'What do yout think?', reactions: ['0x1F601','0x1F914','0x1F644']});
