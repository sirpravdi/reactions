(function (){
  var wrap = document.createElement('div');
  wrap.className = 'wrapper';
  document.body.append(wrap);
  var title = document.createElement('input');
  title.className = 'title';
  title.placeholder = 'insert your text here...';
  wrap.append(title);
  var moodbox = document.createElement('div');
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
  
})();


