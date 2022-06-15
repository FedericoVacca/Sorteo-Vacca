document.querySelector('#btn-agregar').addEventListener('click', agregarParticipante);
document.querySelector('#btn-eliminar').addEventListener('click', eliminarParticipante);
document.querySelector('#btn-sortear').addEventListener('click', sortear);
document.querySelector('#ingresar').addEventListener('click', ingresarUsuario);
document.querySelector('#cuenta').addEventListener('click', cuentaExistente);
document.querySelector('#participante').addEventListener('keyup', function (event) {
    if (event.code === 'Enter')
        agregarParticipante();
})


let participantes = [];

function ingresarUsuario() {
    let firstName = document.querySelector('#validationCustom01').value;
    let lastName = document.querySelector('#validationCustom02').value;
    let userName = document.querySelector('#validationCustomUsername').value;
    if (firstName == "" || lastName == "" || userName == "") {
        Swal.fire(
            'Antes de continuar',
            'Por favor, completar los tres campos',
            'info'
        )
        return
    }
    const jsonDatos = {
        id: userName,
        nombre: firstName,
        apellido: lastName
    };
    localStorage.setItem('datosDeUsuario', JSON.stringify(jsonDatos));
    document.getElementById("formulario").reset();
    fSwitch()
}


function fSwitch(){
    document.getElementById('formlogin').style.display='none';
    document.getElementById('formsorteo').style.display= 'block';



    
}

function cuentaExistente() {
    datos = localStorage.getItem('datosDeUsuario');
    if (datos == null) {
        Swal.fire(
            'No hay datos de ningun usuario registrado.',
            'Por favor registrate primero',
            'warning'
        )
    } else {
        let nombre = JSON.parse(datos).nombre
        let usuario = document.querySelector('#user')
        usuario.innerHTML = "Bienvenido/a: " + nombre
        fSwitch()
    }
}


function agregarParticipante() {
    let participante = document.querySelector('#participante').value;
    if (participante == "") {
        Swal.fire(
            'No hay participantes',
            'Indique el nombre del participante, por favor',
            'warning'
        )
        return
    }
    participantes.push(participante);
    console.log(participantes);
    document.getElementById('participante').value = "";
    lista();
}

function lista() {
    let grupo = document.querySelector('.list-group');
    grupo.innerHTML = '';
    for (let personas of participantes) {
        grupo.innerHTML += '<li class="list-group-item">' + personas + '</li>';
    }
}

function eliminarParticipante() {
    if (participantes.length == 0) {
        Swal.fire(
            'No hay participantes para eliminar',
            'Ingrese los participantes',
            'error'
        )
        return
    }
    participantes.pop();
    lista();
}

function sortear() {
    if (participantes.length == 0) {
        Swal.fire(
            'No hay participantes',
            'Antes de sortear debe ingresar los participantes',
            'warning'
        )
        return
    }
    let random = Math.floor(Math.random() * participantes.length);
    Swal.fire({
        title: 'Felicitaciones',
        text: `El ganador es ${participantes[random]}`,
        imageUrl: '../img/Winners_Isometric.svg',
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: 'ganador',
    })
}