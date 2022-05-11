function listendom(no) {
  console.log(no);
  console.log(document.getElementById(no));
  document.getElementById("chat-input").value = no.innerHTML;
  insertMessage();
}

document.getElementById("myForm").onsubmit = (e) => {
  e.preventDefault();
  insertMessage();

  serverMessage("hello");
};

function insertMessage() {
  // msg = $('.message-input').val();
  msg = document.getElementById("chat-input")[0].value;
  if (msg.trim() == "") {
    return false;
  }
  $('<div class="message message-personal">' + msg + "</div>")
    .appendTo($(".mCSB_container"))
    .addClass("new");
    fetchmsg()

  // $(".message-input").val(null);
  document.getElementById("chat-input")[0].value = "";
  // updateScrollbar();
}




