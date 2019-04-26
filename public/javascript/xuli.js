var socket = io("https://messagevd.herokuapp.com/");

$("#btnDangNhap").click(function(){
    socket.emit('Client-send-login',$("#txtAccount").val())
})

$("#btnDangKi").click(function(){
    socket.emit('Client-send-logup',$("#txtAccountNew").val());
})

$("#btnLogout").click(function(){
    socket.emit('Client-send-logout',$("#user-name").html());
    $("#login").show(1000);
    $("#wrapper").hide(1000);
})

$('#btnSend').click(function(){
    socket.emit('Client-send-message',$('#text-message').val())
})

socket.on('Server-send-data',function(data){
    $("#listOnline-body").html("");
    data.forEach(function(i){
        $("#listOnline-body").append("<div class='user'>"+i+"</div>");
    });
})

socket.on('Server-send-loginSuccess',function(data){
    console.log(data)
    $("#user-name").html(data);
    $("#login").hide(1000);
    $("#wrapper").show(1000);
})

socket.on('Server-send-loginFail',function(){
    alert('Đăng nhập không thành công')
    $("#wrapper").hide(1000);
    $("#login").show(1000);
})

socket.on('Server-send-logupFail',function(){
    alert('Đăng kí không thành công');
})


socket.on('Server-send-message',function(data){
    console.log(data);
    $('#table-message').append('<div id="ms">'+data.user+": "+data.text+'</div>');
})