let textarea = document.querySelector("#input"),
  button = document.querySelector("#criptografar"),
  button2 = document.querySelector("#descriptografar"),
  resultado = document.querySelector(".resultado_copiar"),
  copiar = document.querySelector("#copiar");

textarea.addEventListener("keypress", (event) => {
  const charCode = event.charCode;
  if (!((charCode >= 32 && charCode <= 126) || charCode === 13)) {
    event.preventDefault();
  }
});

function verificarBotao() {
  const textExists = !!textarea.value;
  button.disabled = button2.disabled = !textExists;
  button.classList.toggle("botao-desativado", !textExists);
  button2.classList.toggle("botao-desativado", !textExists);
}

textarea.addEventListener("input", verificarBotao);
verificarBotao();

function processarTexto(texto, isEncrypt) {
  const replacements = {
    e: "enter",
    i: "imes",
    a: "ai",
    o: "ober",
    u: "ufa",
  };
  if (!isEncrypt) {
    Object.entries(replacements).forEach(([key, value]) => {
      texto = texto.replace(new RegExp(value, "g"), key);
    });
  } else {
    Object.entries(replacements).forEach(([key, value]) => {
      texto = texto.replace(new RegExp(key, "g"), value);
    });
  }
  return texto.toLowerCase();
}

function handleButtonClick(isEncrypt) {
  resultado.textContent = processarTexto(textarea.value, isEncrypt);
  document.getElementById("imagemMenina").style.display = "none";
  document.getElementById("conteudoChatH1").style.display = "none";
  document.getElementById("conteudoChatP").style.display = "none";
  copiar.style.display = "inline";
  copiarTexto(resultado.textContent);
}

button.onclick = () => handleButtonClick(true);
button2.onclick = () => handleButtonClick(false);

function conteudoChat() {
  document.getElementById("imagemMenina").style.display = "none";
  document.getElementById("ConteudoChatH1").style.display = "none";
  document.getElementById("ConteudoChatP").style.display = "none";
}

function copiarTexto(texto) {
  navigator.clipboard.writeText(texto);
}
