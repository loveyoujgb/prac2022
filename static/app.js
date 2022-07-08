$(document).ready(function () {
showList();
});

// 1. 페이지 로드 시 GET 요청
function showList() {
$.ajax({
    type: 'GET',
    url: '/todo',
    data: {},
    success: function (response) {
        const todolist = (response['todo_list'])
        $('#todoList').empty()
        for (let i=0; i<todolist.length; i++) {
            let number = todolist[i]['number']
            let list = todolist[i]['list']
            let done = todolist[i]['done']
            //바뀔 일 없으면 const로 선언하자
            let temp_html = ``
            if (done === 0) {
                temp_html= `<li class="delete" id=${number}><span>${list}</span>
                               <button onclick="doneList(${number})">완료</button>
                               <button onclick="editList(${number})">수정</button>
                               <button onclick="deleteList(${number})">삭제</button>
                            </li>`
            } else {
                temp_html= `<li class="delete">
                              <span style="text-decoration: line-through">${list}</span>
                              <button onclick="deleteList(${number})">삭제</button>
                              <button onclick="doneCancel(${number})">완료 취소</button>
                            </li>`
            }
            $('#todoList').append(temp_html)
        }
        }
    });
}
//
// $(document).on('click', '.testbtn', (e) => {
//     console.log(e.target.parentElement.children[0].innerText)
// })


// 2. 리스트 추가 시 POST 요청
function addList() {
    const list = $('#listInput').val()
    $.ajax({
        type: 'POST',
        url: '/todo',
        data: {list_give: list},
        success: function (response) {
            alert(response["msg"])
            showList()
        //    새로고침 대신에 쓰는게 나음!!
        }
    })
}

// 3. 리스트 완료 시 POST 요청
function doneList(number) {
    if (confirm("완료 하시겠습니까?") === true){
        $.ajax({
            type: 'POST',
            url: '/todo/done',
            data: {done_give: number},
            success: function (response) {
            showList()
            }
        });
        alert("완료를 축하합니다!");
    }else{}
}

// 3-1. 완료 취소 시 POST 요청
function doneCancel(number) {
    $.ajax({
        type: 'POST',
        url: '/todo/done_cancel',
        data: {done_give: number},
        success: function (response) {
            showList()
        }
    });
}

// 4. 리스트 삭제 시 POST 요청
function deleteList(number) {
    if (confirm("삭제 하시겠습니까?") === true) {
        $.ajax({
            type: 'POST',
            url: '/todo/delete',
            data: {delete_give: number},
        success: function (response) {
            alert(response["msg"])
            showList()
            }
        })
        }else{
        return false
    }
}

// 리스트 수정 버튼 클릭 시
function editList(number){
    let list = document.getElementById(number).innerText
    let temp_html =`<div class = "editInput">
                        <input id = "listInput" type = "text" placeholder = ${list} >
                        <button onclick = "editSuccess(${number})" > 수정 </button>
                        <button onclick = "clickOut()" > 취소 </button>
                      </div>`
    $('div').empty('.edit')
    $(".edit").append(temp_html)
}

function clickOut() {
    $('div').empty('.editInput')
    $(".edit").append(`<div className="input">
        <input id="listInput" type="text" placeholder="To-Do List를 입력하세요">
            <button onClick="addList()">추가</button>
    </div>`)

}

// 5. 리스트 수정 시 POST 요청
function editSuccess(number) {
    const change_list = $('#listInput').val()
    $.ajax({
        type: 'POST',
        url: '/todo/success',
        data: {change_give: change_list,number_give:number},
        success: function (response) {
            alert(response["msg"])
            showList()
            clickOut()
        }
    });
}