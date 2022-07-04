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
        alert(response["msg"])
        }
    })}

// 2. 리스트 추가 시 POST 요청
function add_list() {
    $.ajax({
        type: 'POST',
        url: '/todo',
        data: {list_give: '리스트 전송!'},
        success: function (response) {
            alert(response["msg"])
            window.location.reload()
        }
    })
}

// 3. 리스트 완료 시 POST 요청
function done_list() {
    $.ajax({
        type: 'POST',
        url: '/todo/done',
        data: {done_give: '리스트 완료!'},
        success: function (response) {
            alert(response["msg"])
            window.location.reload()
        }
    })
}

// 4. 리스트 삭제 시 POST 요청
function delete_list() {
    $.ajax({
        type: 'POST',
        url: '/todo/delete',
        data: {delete_give: '리스트 삭제!'},
        success: function (response) {
            alert(response["msg"])
            window.location.reload()
        }
    })
}

// 5. 리스트 수정 시 POST 요청
function edit_list() {
    $.ajax({
        type: 'POST',
        url: '/todo/edit',
        data: {edit_give: '리스트 수정!'},
        success: function (response) {
            alert(response["msg"])
            window.location.reload()
        }
    })
}