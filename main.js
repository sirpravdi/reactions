(function (){
  let wrap = document.createElement('div');
  wrap.className = 'wrapper';
  document.body.append(wrap);
  let text1 = document.createElement('h1');
  text1.innerText = 'Step 1. Specify poll title';
  wrap.append(text1);
  let title = document.createElement('input');
  title.className = 'title';
  title.placeholder = 'insert your text here...';
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
  if (this.checked){
          this.parentElement.classList.add('label_checked');
      }
      else{
        this.parentElement.classList.remove('label_checked');
      }
};

function createPoll(){
  if (checkInput()) {
  }
};

function checkInput(){
  let title = document.querySelector('title');
  if (title.value == ''){
    title.classList.add('incomplete');
    return false;
  }
  else{
    let moodbox = document.getElementsByClassName('title');
  }
};
