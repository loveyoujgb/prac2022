$(document).ready(function () {
show_list();
});

// 1. 페이지 로드 시 GET 요청
function show_list() {
$.ajax({
    type: 'GET',
    url: '/todo',
    data: {},
    success: function (response) {
        const todolist = (response['todo_list'])
        for (let i=0; i<todolist.length; i++) {
            let number = todolist[i]['number']
            let list = todolist[i]['list']
            let done = todolist[i]['done']
            let temp_html = ``
            if (done == 0) {
                temp_html= `<ul class="delete">
                              <li id=${number}>${list}</li>                      	
	                	<button onclick="done_list(${number})">완료</button>
                        <button onclick="edit_list(${number})">수정</button>
                        <button onclick="delete_list(${number})">삭제</button>
                            </ul>`
            } else {
                temp_html= `<ul class="delete">
                              <li style="text-decoration: line-through">${list}</li>
                              <button onclick="delete_list(${number})">삭제</button>
                              <button onclick="done_cancel(${number})">완료 취소</button>
                            </ul>`
            }
            $('#todo_List').append(temp_html)
        }
        }
    });
}

// 2. 리스트 추가 시 POST 요청
function add_list() {
    const list = $('#list_input').val()
    $.ajax({
        type: 'POST',
        url: '/todo',
        data: {list_give: list},
        success: function (response) {
            alert(response["msg"])
            window.location.reload()
        }
    })
}

// 3. 리스트 완료 시 POST 요청
function done_list(number) {
    if (confirm("완료 하시겠습니까?") == true){
                $.ajax({
            type: 'POST',
            url: '/todo/done',
            data: {done_give: number},
            success: function (response) {
                window.location.reload()
            }
        });
        alert("완료를 축하합니다!");
    }else{}
}

// 3-1. 완료 취소 시 POST 요청
function done_cancel(number) {
    $.ajax({
        type: 'POST',
        url: '/todo/done_cancel',
        data: {done_give: number},
        success: function (response) {
            window.location.reload()
        }
    });
}

// 4. 리스트 삭제 시 POST 요청
function delete_list(number) {
    if (confirm("취소 하시겠습니까?") == true) {
        $.ajax({
            type: 'POST',
            url: '/todo/delete',
            data: {delete_give: number},
        success: function (response) {
            alert(response["msg"])
            window.location.reload()
            }
        })
        }else{}
}

// 리스트 수정 버튼 클릭 시
function edit_list(number){
    let list = document.getElementById(number).innerHTML
    let temp_html =`<div id = "edit_input" className = input>
                        <input id = "list_input" type = "text" placeholder = ${list} >
                        <button onclick = "edit_success(${number})" > 수정 </button>
                        <button onclick = "clickout()" > 취소 </button>
                      </div>`
    $('#edit').empty()
    $('#edit').append(temp_html)
}

function clickout() {
    window.location.reload()
}

// 5. 리스트 수정 시 POST 요청
function edit_success(number) {
    const change_list = $('#list_input').val()
    $.ajax({
        type: 'POST',
        url: '/todo/success',
        data: {change_give: change_list,number_give:number},
        success: function (response) {
            alert(response["msg"])
            window.location.reload()
        }
    });
}