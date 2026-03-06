document.addEventListener("DOMContentLoaded", () => {

const btnNovo = document.getElementById("new-appointment-btn")
const modal = document.getElementById("modal")
const form = document.getElementById("appointment-form")
const container = document.getElementById("appointments-list")
const emptyState = document.getElementById("empty-state")

const deleteModal = document.getElementById("delete-modal")
const confirmDeleteBtn = document.getElementById("confirm-delete-btn")


let agendamentos = JSON.parse(localStorage.getItem("agendamentos")) || []
let editIndex = null
let deleteIndex = null


function salvar(){
localStorage.setItem("agendamentos", JSON.stringify(agendamentos))
}
  

function atualizarContadores(){

document.getElementById("total-appointments").textContent = agendamentos.length

document.getElementById("pending-count").textContent =
agendamentos.filter(a => a.status.toLowerCase() === "pendente").length

document.getElementById("confirmed-count").textContent =
agendamentos.filter(a => a.status.toLowerCase() === "confirmado").length

document.getElementById("completed-count").textContent =
agendamentos.filter(a => a.status.toLowerCase() === "concluido").length

}



function renderizar(){

container.innerHTML = ""

if(agendamentos.length === 0){
emptyState.style.display = "block"
return
}

emptyState.style.display = "none"

agendamentos
.sort((a,b)=> new Date(a.data) - new Date(b.data))
.forEach((a,index)=>{

let statusColor = "text-yellow-400"

if(a.status === "confirmado") statusColor = "text-green-400"
if(a.status === "concluido") statusColor = "text-cyan-400"

const inicial = a.nome.charAt(0).toUpperCase()

const card = document.createElement("div")

card.className = "appointment-card animate-slideIn"

card.innerHTML = `

<div class="flex flex-col items-center text-center gap-2">

<div class="avatar-circle">
${inicial}
</div>

<h3 class="text-white font-semibold text-sm">
${a.nome}
</h3>

<p class="text-gray-400 text-xs">
${a.servico}
</p>

<p class="text-gray-500 text-xs">
${a.data} • ${a.hora}
</p>

<span class="${statusColor} text-xs font-medium">
${a.status}
</span>

<div class="flex gap-2 mt-2">

<button class="btn-edit bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 p-2 rounded-lg"
data-index="${index}">

<svg xmlns="http://www.w3.org/2000/svg"
class="w-4 h-4"
fill="none"
viewBox="0 0 24 24"
stroke="currentColor">

<path stroke-linecap="round"
stroke-linejoin="round"
stroke-width="2"
d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5M18.5 2.5a2.121 2.121 0 113 3L12 15l-4 1 1-4 9.5-9.5z"/>

</svg>

</button>

<button class="btn-delete bg-red-500/20 hover:bg-red-500/30 text-red-400 p-2 rounded-lg"
data-index="${index}">

<svg xmlns="http://www.w3.org/2000/svg"
class="w-4 h-4"
fill="none"
viewBox="0 0 24 24"
stroke="currentColor">

<path stroke-linecap="round"
stroke-linejoin="round"
stroke-width="2"
d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7V4a1 1 0 011-1h4a1 1 0 011 1v3m-7 0h10"/>

</svg>

</button>

<a href="https://wa.me/?text=Olá ${a.nome}, seu agendamento está confirmado!" 
target="_blank"
class="bg-green-500/20 hover:bg-green-500/30 text-green-400 p-2 rounded-lg transition flex items-center justify-center">

<svg xmlns="http://www.w3.org/2000/svg"
width="16"
height="16"
viewBox="0 0 24 24"
fill="currentColor">

<path d="M12 0C5.372 0 0 5.373 0 12c0 2.117.552 4.1 1.517 5.825L0 24l6.39-1.67A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818c-1.88 0-3.62-.5-5.13-1.37l-.366-.217-3.79.992 1.012-3.695-.238-.38A9.77 9.77 0 012.182 12C2.182 6.593 6.593 2.182 12 2.182S21.818 6.593 21.818 12 17.407 21.818 12 21.818zm5.397-7.41c-.295-.147-1.744-.86-2.014-.958-.27-.098-.467-.147-.664.147s-.762.958-.934 1.156c-.172.196-.344.221-.639.074-.295-.147-1.245-.459-2.372-1.462-.876-.781-1.468-1.744-1.64-2.04-.172-.295-.018-.454.13-.601.134-.133.295-.344.442-.516.147-.172.196-.295.295-.491.098-.196.049-.369-.025-.516-.074-.147-.664-1.601-.91-2.193-.239-.574-.482-.496-.664-.505l-.566-.01c-.196 0-.516.074-.787.369s-1.033 1.009-1.033 2.46c0 1.452 1.058 2.854 1.205 3.051.147.196 2.083 3.182 5.047 4.461.705.304 1.254.486 1.682.622.707.225 1.35.193 1.858.117.566-.084 1.744-.712 1.989-1.401.246-.688.246-1.278.172-1.401-.074-.123-.27-.196-.566-.344z"/>

</svg>

</a>

</div>

</div>
`

container.appendChild(card)

})

ativarEventos()
atualizarContadores()

  }


function ativarEventos(){

document.querySelectorAll(".btn-delete").forEach(btn=>{

btn.onclick = function(){

deleteIndex = this.dataset.index

deleteModal.classList.remove("hidden")

}

})


document.querySelectorAll(".btn-edit").forEach(btn=>{

btn.onclick = function(){

editIndex = this.dataset.index

const ag = agendamentos[editIndex]

document.getElementById("client-name").value = ag.nome
document.getElementById("service").value = ag.servico
document.getElementById("date").value = ag.data
document.getElementById("time").value = ag.hora
document.getElementById("status").value = ag.status

modal.classList.remove("hidden")

}

})

}



btnNovo.onclick = ()=>{

editIndex = null
form.reset()

modal.classList.remove("hidden")

}



form.addEventListener("submit",(e)=>{

e.preventDefault()

const nome = document.getElementById("client-name").value
const servico = document.getElementById("service").value
const data = document.getElementById("date").value
const hora = document.getElementById("time").value
const status = document.getElementById("status").value

const novo = {nome,servico,data,hora,status}

if(editIndex !== null){

agendamentos[editIndex] = novo

}else{

agendamentos.push(novo)

}

salvar()
renderizar()

form.reset()
editIndex = null

modal.classList.add("hidden")

})


confirmDeleteBtn.onclick = ()=>{

if(deleteIndex!==null){

agendamentos.splice(deleteIndex,1)

salvar()
renderizar()

deleteIndex=null

}

deleteModal.classList.add("hidden")

}







window.closeModal = ()=>{

modal.classList.add("hidden")

}
  window.closeDeleteModal = () => {
  deleteIndex = null
  deleteModal.classList.add("hidden")
    }



renderizar()

})
