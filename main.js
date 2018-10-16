(function (){
  var wrap = document.createElement('div');
  wrap.className = 'wrapper';
  document.body.append(wrap);
  var title = document.createElement('input');
  title.className = 'title';
  wrap.append(title);
  var moodbox = document.createElement('div');
  moodbox.className = 'moodbox';
  wrap.append(moodbox);
  
  for(let i = 600; i < 638; i++){
    let label = document.createElement('label');
    label.setAttribute('data-emoji', String.fromCodePoint('0x1F' + i));
    label.textContent = String.fromCodePoint('0x1F' + i);
    moodbox.append(label);
  }
  
})();


