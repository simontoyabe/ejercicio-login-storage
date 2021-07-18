let formulario = document.forms.elForms;
let h1 = document.querySelector("h1");
let error = document.querySelector("div#error-container");
let loader = document.querySelector("div#loader");
let cerrar = document.querySelector("button#cerrar");

sesionIniciada();

function validarEmail(email) {
    const regex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/g;
    return regex.test(email) ? true : false;
}

function validarContrasenia(contrasenia) {
    return (contrasenia.length < 5) ? false : true;
}

function validarPersona(email, contrasenia) {
    let usuario = baseDeDatos.usuarios.filter((usuario) => {
        return (usuario.email === email && usuario.password === contrasenia);
    });
    if (usuario.length > 0) {
        return [true, usuario[0].name];
    } else {
        return [false];
    }
}

function sesionIniciada() {
    if (localStorage.getItem("nombre") !== null) {
        formulario.classList.add("hidden");
        h1.innerText = `Bienvenido al sitio 😀, ${localStorage.getItem("nombre")}`;
        cerrar.classList.remove("hidden");
    }
}

function validaciones() {
    const email = formulario.emailInput.value;
    const contrasenia = formulario.passwordInput.value;
    const validacionPersona = validarPersona(email, contrasenia);
    if (validarEmail(email) && validarContrasenia(contrasenia) && validacionPersona[0]) {
        loader.classList.add("hidden");
        almacenarInformacion(validacionPersona[1], email);
        formulario.classList.add("hidden");
        h1.innerText = `Bienvenido al sitio 😀, ${validacionPersona[1]}`;
        cerrar.classList.remove("hidden");
    } else {
        error.innerHTML = "<small>Alguno de los datos ingresados son incorrectos</small>";
        loader.classList.add("hidden");
        error.classList.remove("hidden");
    }

}

function almacenarInformacion(nombre, email) {
    localStorage.setItem("nombre", nombre);
    localStorage.setItem("email", email);
}

formulario.addEventListener('submit', (evento) => {
    evento.preventDefault();
    error.classList.add("hidden");
    loader.classList.remove("hidden");
    setTimeout(() => {
        validaciones();
    }, 3000);
})

cerrar.addEventListener('click', () => {
    localStorage.removeItem("nombre");
    localStorage.removeItem("email");
    location.reload();
});


// ACTIVIDAD

// Paso a paso:

// 1) Al momento de que la persona inicia sesión, si las validaciones que ya tenemos implementadas
// han sido exitosas, deberemos almacenar la información del usuario en el LocalStorage.

// 2) Al mensaje de bienvenida que ya teníamos implementado, deberemos agregarle el nombre de la
// persona y un botón de "Cerrar Sesión".

// 3) Una vez iniciada la sesión, la misma se deberá mantener en ese estado para el caso de que la persona
// recargue la página. Para ello, deberás validar si existe información del usuario al momento en
// que se produce la carga de la página, y en base a dicha condción decidir que elementos mostrar.

// 3) Para el caso de que la persona haga click en el botón "Cerrar Sesión", se deberá eliminar
// la información del usuario, mostrar un mensaje indicando que se ha cerrado la sesión, y recargar
// la página para mostrar nuevamente el formulario de login.

/* 
TIPS:
  - Para lograr los objetivos de este ejercicio, deberás valerte de algunos eventos y métodos que vimos en
    las clases anteriores. Te invitamos a que revises los recursos en caso de que tengas dudas, ya que allí
    encontrarás todas las respuestas que necesitas para completar la actividad.

  - Recuerda que puedes seleccionar y manipular los elementos del archivo index.html, usando los
    recursos que Javascript te ofrece para ello. Además, en el archivo styles.css tiene algunas clases y 
    estilos predefinidos para ayudarte a completar la actividad.

  - Al momento de guardar información del usuario en el navegador, recuerda que debemos almacenar solo la 
    información necesaria, y EN NINGUN CASO DEBEMOS GUARDAR LA CONTRASEÑA. Por ello, deberás seleccionar y
    separar la información que tienes que almacenar, a partir del objeto que contiene la información del 
    usuario.

   ¡Manos a la obra!
 */