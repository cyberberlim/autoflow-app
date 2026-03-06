document.addEventListener("DOMContentLoaded", () => {

const btnNovo = document.getElementById("new-appointment-btn")
const modal = document.getElementById("modal")
const form = document.getElementById("appointment-form")
const container = document.getElementById("appointments-list")
const emptyState = document.getElementById("empty-state")

const deleteModal = document.getElementById("delete-modal")
const confirmDeleteBtn = document.getElementById("confirm-delete-btn")
const cancelDeleteBtn = document.getElementById("cancel-delete")

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
atualizarContadores()
return
}

emptyState.style.display = "none"

agendamentos
.sort((a,b)=> new Date(a.data) - new Date(b.data))
.forEach((a,index)=>{

let statusClass=""

if(a.status.toLowerCase()==="pendente") statusClass="bg-yellow-500/20 text-yellow-400"
if(a.status.toLowerCase()==="confirmado") statusClass="bg-green-500/20 text-green-400"
if(a.status.toLowerCase()==="concluido") statusClass="bg-blue-500/20 text-blue-400"


const card = document.createElement("div")

card.className =
"flex items-center justify-between bg-darkcard border border-white/10 rounded-xl p-4 hover:border-autoflow/40 transition-all duration-300 shadow-sm"
card.innerHTML = `

<div class="flex flex-col gap-1">

<h3 class="text-white font-semibold text-sm">
${a.nome}
</h3>

<p class="text-gray-400 text-xs">
${a.servico}
</p>

<p class="text-gray-500 text-xs">
${a.data} • ${a.hora}
</p>

</div>


<div class="flex items-center gap-2">

<span class="px-2 py-1 text-xs rounded-full ${statusClass}">
${a.status}
</span>


<button class="btn-edit bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 p-2 rounded-lg transition"
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


<button class="btn-delete bg-red-500/20 hover:bg-red-500/30 text-red-400 p-2 rounded-lg transition"
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


if(editIndex!==null){

agendamentos[editIndex] = novo

}else{

agendamentos.push(novo)

}

salvar()
renderizar()

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



cancelDeleteBtn.onclick = ()=>{

deleteIndex=null
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
