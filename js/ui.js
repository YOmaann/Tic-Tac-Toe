var ui = {
  disabled: false,
  chance: 1,
  sct: null,
  status: "GAME STARTED",
  g: [],
  end: false,
};
function disable() {
  var a = document.getElementById("over");
  a.classList.toggle("hide");
  a.classList.toggle("show");
  ui.disabled = ui.disabled ? false : true;
}
function pstatus() {
  ui.status =
    ui.chance % 2 == 0 ? "Machine is thinking!" : "ITS UR CHANCE TO PLAY";
  supdate();
}
function restart() {
  window.location = window.location.href;
}
function flipped() {
  ui.sct.removeEventListener("click", flip);
}
function supdate() {
  document.getElementById("status").innerHTML = ui.status;
}
function choice() {
  return ui.chance % 2 == 0 ? "X" : "O";
}
function up() {
  if (!ui.end) pstatus();
  ui.sct.classList.remove("td");
  ui.sct.classList.add("close");
  ui.sct.classList.add("select");
  if (ui.chance % 2 == 1) ui.sct.innerHTML = choice();
  else ui.sct.classList.add("machine");
  flipped();
  update(ui.j.indexOf(ui.sct));
}
function flip() {
  ui.sct = this;
  up();
  ui.chance++;
  machine();
}
function start() {
  pstatus();
  var el = document.getElementsByTagName("td");
  ui.m = el;
  ui.j = Array.from(ui.m);
  for (i = 0; i < el.length; i++) {
    ["click", "touchend"].forEach((e) => {
      el[i].addEventListener(e, flip);
    });
    // el[i].addEventListener("click", flip);
  }
  document.getElementsByClassName("button").classList = "hide";
  document.getElementsByClassName("overlap")[0].classList.add("hide-sl");
  setTimeout(function () {
    document.getElementsByClassName("overlap")[0].classList.remove("hide-sl");
    document.getElementsByClassName("overlap")[0].classList.add("hide");
    document.getElementById("grid").classList.remove("hide");
    document.getElementsByTagName("body")[0].classList.remove("bdd");
    document.getElementsByTagName("body")[0].classList.add("bd");
  }, 400);
}
