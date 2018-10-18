(function Init(){
  let wrap = document.createElement('div');
  wrap.className = 'wrapper';
  document.body.append(wrap);
  let text1 = document.createElement('h1');
  text1.innerText = 'Step 1. Specify poll title';
  wrap.append(text1);
  let title = document.createElement('input');
  title.className = 'title';
  title.placeholder = 'insert your text here...';
  title.addEventListener('input', function(){document.querySelector('.title').classList.remove('incomplete');});
  wrap.append(title);
  
  let text2 = document.createElement('h1');
  text2.innerText = 'Step 2. Select emojis';
  wrap.append(text2);
  let moodbox = document.createElement('div');
  moodbox.className = 'moodbox';
  wrap.append(moodbox);
  
  for(let i = 600; i < 638; i++){
    let label = document.createElement('label');
    label.setAttribute('data-emoji', String.fromCodePoint('0x1F' + i));
    label.textContent = String.fromCodePoint('0x1F' + i);
    label.className = 'moodbox_label';
    moodbox.append(label);
    let input = document.createElement('input');
    input.type = 'checkbox';
    input.name = 'emojis';
    input.addEventListener('click', emojiCheck);
    label.append(input);
  }
  
  let btn_line = document.createElement('div');
  let btn = document.createElement('button');
  btn_line.className = 'moodbox_btnline';
  btn.className = 'moodbox_submit';
  btn.type = 'button';
  btn.innerText = 'Submit';
  wrap.append(btn_line);
  btn_line.append(btn);
  btn.addEventListener('click', createPoll);
  
})();

function emojiCheck(){
  document.querySelector('.moodbox').classList.remove('incomplete');
  if (this.checked){
          this.parentElement.classList.add('label_checked');
      }
      else{
        this.parentElement.classList.remove('label_checked');
      }
};

function createPoll(){
  if (checkInput()) {
    localStorage.setItem('title', document.querySelector('.title').value);
    
    let selected = Array.from(document.querySelectorAll('.moodbox input')).filter(function(item){return item.checked;});
    selected.forEach(function(item, i, arr){
      localStorage.setItem('picked_emoji_' + i, item.parentElement.getAttribute('data-emoji'));
    });
    
    let wrap = document.querySelector('.wrapper');
    wrap.innerHTML = '';
    wrap.style['flex-flow'] = 'row';
    let poll_title = document.createElement('span');
    poll_title.className = 'poll_title';
    poll_title.innerText = localStorage.getItem('title');
    wrap.append(poll_title);
    let i = 0;
    while(localStorage.getItem('picked_emoji_' + i)){
      let counter = document.createElement('div');
      counter.className = 'counter';
      wrap.append(counter);
      let label = document.createElement('label');
      label.className = 'picked_emoji';
      label.textContent = localStorage.getItem('picked_emoji_' + i);
      counter.append(label);
      let input = document.createElement('input');
      input.type = 'radio';
      input.name = 'poll';
      input.addEventListener('click', pollClick);
      label.append(input);
      let index = document.createElement('span');
      index.id = 'index' + i;
      index.innerText = '0';
      localStorage.setItem('index' + i, 0);
      counter.append(index);
      i++;
    }
    
  }
};

function pollClick(){
   if (document.querySelector('.picked')){
    document.querySelector('.picked').classList.remove('picked');
   }
   this.parentElement.classList.add('picked');
};

function checkInput(){
  let title = document.querySelector('.title');
  if (title.value == ''){
    title.classList.add('incomplete');
  }
  let selected = Array.from(document.querySelectorAll('.moodbox input')).filter(function(item){return item.checked;});
  if (selected == ''){
    document.querySelector('.moodbox').classList.add('incomplete');
  }
  if((title.value == '')||(selected == '')){
    return false;
  }
  return true;
};
