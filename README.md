# reactions
  Create reactions poll on your page
## How to use 
add 
```
Reactions.create({parent: element, title: '', reactions: ['','','']});
```
where 
* parent - parent element for poll, can be element id or selector (example: parent: document.body)
* title - reactions poll title (example: title: 'What do you think?')
* reactions - array of emojis (example: ['0x1F600','0x1F914','0x1F644'])

Reactions.create({parent: document.body, title: 'What do you think?', reactions: ['0x1F600','0x1F914','0x1F644']});

If invalid parent element selector was passed, module will throw an error 'Parent element is not found'

  
