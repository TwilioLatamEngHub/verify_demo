// Fill Default Values
document.getElementById("color-input").value = "#f22b44";
document.getElementById("contrast-input").value = "#ffffff";

// Load Saved Customizations
const logoImg = localStorage.getItem("logoImg");
if (logoImg) {
  document.getElementById("logo").src = logoImg;
}
const savedConstrast = localStorage.getItem("contrast");
if (savedConstrast) {
  document.getElementById("contrast-input").value = savedConstrast;
}
const savedColor = localStorage.getItem("color");
if (savedColor) {
  document.getElementById("color-input").value = savedColor;
  document.documentElement.style.setProperty("--color", savedColor);
}

// Input Values
let number = "";
let channel = "sms";
let code = "";

// Customization Listeners
document.getElementById("color-input").addEventListener("change", function () {
  document.documentElement.style.setProperty("--color", this.value);
  localStorage.setItem("color", this.value);
});
document
  .getElementById("contrast-input")
  .addEventListener("change", function () {
    document.documentElement.style.setProperty("--contrastColor", this.value);
  });
document.getElementById("image-input").addEventListener("change", function () {
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    localStorage.setItem("logoImg", reader.result);
    document.getElementById("logo").src = reader.result;
  });
  reader.readAsDataURL(this.files[0]);
});

document.getElementById("logo").onclick = () => {
  const settings = document.getElementById("settings");
  settings.style.display = "flex";
};

document.getElementById("close_settings").onclick = () => {
  const settings = document.getElementById("settings");
  settings.style.display = "none";
};

// Channel Select
var channels = document.querySelectorAll(".channelHolder_channel");
for (var i = 0; i < channels.length; i++) {
  channels[i].onclick = function () {
    console.log(this.id);
    channel = this.id;
    channels.forEach((channel) => {
      channel.style.opacity = 0.25;
    });
    document.getElementById(this.id).style.opacity = 1;
    document;
  };
}

// Send Code
document.getElementById("continue").onclick = function () {
  number = document.getElementById("number").value;

  document.getElementById("channel").textContent = channel;

  document.getElementById("fillCode").style.display = "flex";
  document.getElementById("fillNumber").style.display = "none";

  fetch("http://localhost:3000/sendCode", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ number: number, channel }),
  })
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((e) => {
      console.log("ERROR: ", e);
    });
};

// Confirm Code
document.getElementById("confirm").onclick = function () {
  code = document.getElementById("code").value;

  fetch("http://localhost:3000/verifyCode", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ number: number, code }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      document.getElementById("fillCode").style.display = "none";

      if (data == "approved") {
        console.log("Approved!");
        document.getElementById("confirmed").style.display = "flex";
      } else {
        console.log("Incorrect!");
        document.getElementById("incorrect").style.display = "flex";
      }
    })
    .catch((e) => {
      console.log("ERROR: ", e);
    });
};
