var socket = io("https://messagevd.herokuapp.com/");
var statusObject = 'all';

$('#all').click(function(){
    statusObject = 'all'
    document.getElementById('all').style.backgroundColor = 'aqua';
    document.getElementById('friend').style.backgroundColor = 'white'
})

$('#txtUser').change(function(e){
    socket.emit('Client-send-logup',$('#txtUser').val())
})

$("#btnLogout").click(function(){
    socket.emit('Client-send-logout',$("#user-name").html());
    $("#login").show(1000);
    $("#wrapper").hide(1000);
    document.getElementById('text-message').focus();
})

$('#btnSend').click(function(){
    socket.emit('Client-send-message',$('#text-message').val())
    $('#text-message').val('')
})

$('#text-message').change(function(){
    if(statusObject === 'all'){
        socket.emit('Client-send-messageAll',$('#text-message').val())
        $('#text-message').val('')
    }else{
        
    }
})

socket.on('Server-send-data',function(data){
    $("#listOnline-body").html("");
    data.forEach(function(i){
        $("#listOnline-body").append("<div class='user' id='user_"+i+"'>"+i+"</div>");
        const id = 'user_'+i
        $('#'+id).click(function(){
            // document.getElementById(id).style.backgroundColor = 'green'
            statusObject = 'friend';
            document.getElementById('all').style.backgroundColor = 'white';
            document.getElementById('friend').style.backgroundColor = 'aqua'
        })
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


socket.on('Server-send-messageAll',function(data){
    console.log(data);
    $('#table-message').append('<div id="ms">'+data.user+": "+data.text+'</div>');
})