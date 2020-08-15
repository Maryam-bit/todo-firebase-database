var list = document.getElementById("list")

firebase.database().ref('todos').on('child_added',function(data){
    console.log(data.val())
    var li = document.createElement('li')
    var liText = document.createTextNode(data.val().value)
    li.appendChild(liText)
    li.setAttribute('class' , 'text')
    var delBtn = document.createElement('button')
    var delText = document.createElement('i')
    delBtn.setAttribute('class', 'icon3 fa fa-trash')
    // delBtn.setAttribute('id', 'icon3')
    delBtn.setAttribute('id', data.val().key)
    delBtn.setAttribute('onclick', 'deleteItem(this)')

    var editBtn = document.createElement('button')
var editText= document.createElement('i')
editBtn.setAttribute('class', 'icon4 fa fa-pencil-square-o')
// editBtn.setAttribute('id', 'icon4')
editBtn.appendChild(editText)
editBtn.setAttribute('id',data.val().key)
editBtn.setAttribute('onclick', 'editItem(this)')
li.appendChild(delBtn)
li.appendChild(editBtn)
list.appendChild(li)

})


function addTodo(){
    var todo_item = document.getElementById("todo-item")
// console.log(todo_item.value)

var database = firebase.database().ref('todos')
var key = database.push().key;
var todo = {
    value : todo_item.value,
    key : key
}
database.child(key).set(todo)

    todo_item.value = ''
}
function deleteItem(e){
    firebase.database().ref('todos').child(e.id).remove()
    e.parentNode.remove()
    // console.log(e.id)
}
function deleteAll(){
    firebase.database().ref('todos').remove()
    list.innerHTML=""
}
function editItem(e){
    var val = e.parentNode.firstChild.nodeValue
    editVal = prompt("enter edit value" , val)
    var editTodo={
        value : editVal,
        key : e.id
    }
    firebase.database().ref('todos').child(e.id).set(editTodo)
    e.parentNode.firstChild.nodeValue = editVal
}




