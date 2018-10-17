(function (){
  let wrap = document.createElement('div');
  wrap.className = 'wrapper';
  document.body.append(wrap);
  let title = document.createElement('input');
  title.className = 'title';
  title.placeholder = 'insert your text here...';
  wrap.append(title);
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
    input.onclick = function(){
      if (this.checked){
          this.parentElement.classList.add('label_checked');
      }
      else{
        this.parentElement.classList.remove('label_checked');
      }
    }
    label.append(input);
  }
  let btn_line = document.createElement('div');
  let btn = document.createElement('button');
  btn_line.className = 'moodbox_btnline';
  btn.className = 'moodbox_submit';
  btn.type = 'button';
  wrap.append(btn_line);
  btn_line.append(btn);
  
})();


