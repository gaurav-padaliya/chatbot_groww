var INDEX = 0;
var isLoggedIn = false;
var $mainPopUp = $(".main-popup");
var $signIn = $("#sign-in");
var $register = $("#register");
var $formSignIn = $("form.sign-in");
var $formRegister = $("form.register");
var $avatar = $(".nav-item.dropdown");

if (sessionStorage.getItem("isLoggedIn") === "true") {
  isLoggedIn = true;
  document.querySelector(".kyc-dis").style.display = "none";
  document.querySelector(".kyc-user").style.display = "block";
}
toggleIsLoggedIn(isLoggedIn);

document.getElementById("logout").onclick = () => {
  sessionStorage.clear();
  document.querySelector(".kyc-dis").style.display = "block";
  document.querySelector(".kyc-user").style.display = "none";
  location.reload();
};

document.getElementById("chat-submit").onclick = (e) => {
  e.preventDefault();
  var msg = document.getElementById("chat-input").value;
  if (msg.trim() == "") {
    return false;
  }
  generate_message(msg, "self");

  fetchmsg(msg);
  setTimeout(function () {
    // generate_message(msg, 'user');
  }, 1000);
};

var generate_message = (msg, type) => {
  INDEX++;

  var str = "";
  str += `<div id='cm-msg-${INDEX}' class="chat-msg ${type}">`;
  str += `          <span class="msg-avatar">`;
  // str += `            <img src="https://image.crisp.im/avatar/operator/196af8cc-f6ad-4ef7-afd1-c45d5231387c/240/?1483361727745\">`;
  str += `          </span>`;
  str += `          <div class="cm-msg-text">`;
  str += msg;
  str += `          </div>`;
  str += `        </div>`;
  $(".chat-logs").append(str);
  // document.getElementsByClassName("chat-logs").;
  $("#cm-msg-" + INDEX)
    .hide()
    .fadeIn(300);
  if (type == "self") {
    $("#chat-input").val("");
  }
  $(".chat-logs")
    .stop()
    .animate({ scrollTop: $(".chat-logs")[0].scrollHeight }, 1000);
};

document.getElementById("open").onclick = openForm;
document.getElementById("close").onclick = closeForm;

function openForm() {
  var element = document.querySelector(".chat-box").style.display;
  if (element == "none")
    document.querySelector(".chat-box").style.display = "block";
  else document.querySelector(".chat-box").style.display = "none";
}
function closeForm() {
  document.querySelector(".chat-box").style.display = "none";
}

function fetchmsg(text) {
  var url = "http://localhost:3030/tq";
  var userId = "gaurav" + Math.floor(Math.random() * (1000 - 100 + 1) + 100);
  let data = {
    text: `"${text}"`,
    userId: `"${userId}"`,
  };
  let fetchData = {
    method: "POST",
    body: JSON.stringify(data),

    headers: new Headers({
      "Content-Type": "application/json; charset=UTF-8",
    }),
  };

  fetch(url, fetchData)
    .then((res) => {
      return res.json();
    })
    .then((response) => {
      serverMessage(response.fulfillmentText);
    })
    .catch((error) => console.error("gaurav Error h:", error));
}

function serverMessage(msg) {
  INDEX++;
  var str = "";
  str += `<div id='cm-msg-${INDEX}' class="chat-msg user}">`;
  str += `          <div class="cm-msg-text">`;
  str += msg;
  str += `          </div>`;
  str += `        </div>`;
  $(".chat-logs").append(str);
  $("#cm-msg-" + INDEX)
    .hide()
    .fadeIn(300);

  $(".chat-logs")
    .stop()
    .animate({ scrollTop: $(".chat-logs")[0].scrollHeight }, 1000);
}

// login/Register form code starts
function toggleIsLoggedIn(isValid) {
  if (isValid) {
    isLoggedIn = true;
    sessionStorage.setItem("isLoggedIn", true);
    document.getElementById("loginRegisterBtn").style.display = "none";
    $mainPopUp.removeClass("visible");
    $avatar.removeClass("invisible");
    $avatar.addClass("visible");
  } else {
    isLoggedIn = false;
    sessionStorage.setItem("isLoggedIn", false);
    document.getElementById("loginRegisterBtn").style.display = "inline";
  }
}

document.getElementById("register-submit").onclick = (e) => {
  e.preventDefault();
  var email = document.getElementById("email-register").value;
  var password = document.getElementById("password-register").value;
  var url = "http://localhost:3030/register";
  (async () => {
    const rawResponse = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password }),
    });
    const content = await rawResponse.status;
    if (content == "201") {
      $mainPopUp.removeClass("visible");
    }
  })();
};

document.getElementById("login-submit").onclick = (e) => {
  e.preventDefault();
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;

  var url = "http://localhost:3030/login";
  (async () => {
    const rawResponse = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password }),
    });
    const content = await rawResponse.json();
    toggleIsLoggedIn(content.isLoggedIn);
  })();
};

$(".loginRegisterBtn").on("click", function () {
  $mainPopUp.addClass("visible");
  $signIn.addClass("active");
  $register.removeClass("active");
  $formRegister.removeClass("move-left");
  $formSignIn.removeClass("move-left");
});
$("#popup-close-button a").on("click", function (e) {
  e.preventDefault();
  $mainPopUp.removeClass("visible");
});

$signIn.on("click", function () {
  $signIn.addClass("active");
  $register.removeClass("active");
  $formSignIn.removeClass("move-left");
  $formRegister.removeClass("move-left");
});

$register.on("click", function () {
  $signIn.removeClass("active");
  $register.addClass("active");
  $formSignIn.addClass("move-left");
  $formRegister.addClass("move-left");
});

$(".closeBtn").on("click", function () {
  $mainPopUp.removeClass("visible");
});
// login/Register form code ends

function handleFaq(el) {
  // console.log(el.outerText);
  const msg = el.outerText;
  generate_message(msg, "self");
  fetchmsg(msg);
  document.querySelector(".sug").style.opacity = "0";
  setTimeout(() => {
    document.querySelector(".chat-logs").style.height = "100%";
    document.querySelector(".sug").style.display = "none";
  }, 1000);
}
