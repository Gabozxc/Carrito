// Variables

// contiene el carrito
const carrito = document.getElementById('carrito')
    // contiene los articulos del body
const listaCursos = document.getElementById('lista-cursos')

// contiene la tabla
const CarritoLista = document.querySelector('#lista-carrito tbody')

// vaciar carrito
const vaciarCarritoBtn = document.getElementById('vaciar-carrito')

console.log(listaCursos)

//Listeners
cargarEventos();

function cargarEventos() {
    // dispara cuando se presionsa en agregar carrito
    listaCursos.addEventListener('click', comprarCurso)

    // cuando se elimina curso del carrito

    carrito.addEventListener('click', borrarCursoDoom);
    vaciarCarritoBtn.addEventListener('click', vaciarTodo)

    //al cargar el documento mostrar del local storage

    document.addEventListener('DOMContentLoaded', leerLocalStorage)



}




// Funciones 


// Funcion que agrega el curso al carrito
function comprarCurso(e) {


    e.preventDefault()

    console.log(e)
    console.log('malditasea es ilogico')

    // delegetion para agregar carrito si tiene la clase agregar carrito



    if (e.target.classList.contains('agregar-carrito')) {

        // seleccionar el card completo
        const curso = e.target.parentElement.parentElement
            // Enviamos el curso seleccionado para tomar sus datos
        leerDatos(curso);

    }


}

// lee los datos del curso

function leerDatos(curso) {
    //Va leer los datos que trae el parametro curso 

    //     console.log(curso);

    // Creo el objeto infoCurso, y en cada curso.queryselector, colocare el valor que me trae el parametro 


    const InfoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id')
    }

    // mandare mi objeto Info curso a la funcion insertarCarrito
    InsertarCarrito(InfoCurso);

}

//Muestra el curso seleccionado en el carrito


function InsertarCarrito(curso) {

    const row = document.createElement('tr');
    row.innerHTML = `
      
            <td> <img src="${curso.imagen}" width=100></td>
            <td>${curso.titulo}</td>
            <td>${curso.precio}</td>
            <td><a href="#" class="borrar-curso" data-id="${curso.id}">X</a></td>`;

    // al gregar al carrito
    CarritoLista.appendChild(row)

    // mandar al local storage
    guardarCursoLocalStorage(curso);

}

//almacena en el localstorage

function guardarCursoLocalStorage(curso) {
    let cursos

    // Toma el valor de un arreglo con datos del local storage o vacio 
    cursos = VerificarLocalStorage();

    // EL curso seleccionado se agrega al arreglo
    cursos.push(curso)

    localStorage.setItem('cursos', JSON.stringify(cursos));
}


// Comprueba que haya elementos en local storage
function VerificarLocalStorage() {

    let cursosLS

    // comprobamos si hay algo en localStorage

    if (localStorage.getItem('cursos') === null) {
        cursosLS = []
    } else {
        cursosLS = JSON.parse(localStorage.getItem('cursos'));
    }

    return cursosLS

}


// elimina curso de carrito en el doom
function borrarCursoDoom(e) {
    e.preventDefault

    console.log(e)

    let curso, cursoID

    if (e.target.classList.contains('borrar-curso')) {
        e.target.parentElement.parentElement.remove()

        // para mandarlo a la funcion de eliminarCursosLocalStorage
        curso = e.target.parentElement.parentElement
        cursoID = curso.querySelector('a').getAttribute('data-id')

        console.log(cursoID)
        console.log(curso)
    }


    EliminarCursoLocalStorage(cursoID)

}

// imprime los cursos de local storage en el carrito
function leerLocalStorage() {
    let cursosLS

    cursosLS = VerificarLocalStorage()

    // recorrer el array con objetos del local storage
    cursosLS.forEach(function(curso) {

        const row = document.createElement('tr');
        row.innerHTML = `
        
              <td> <img src="${curso.imagen}" width=100></td>
              <td>${curso.titulo}</td>
              <td>${curso.precio}</td>
              <td><a href="#" class="borrar-curso" data-id="${curso.id}">X</a></td>`;

        // al gregar al carrito
        CarritoLista.appendChild(row)

    })


}


// eliminar del local storage gracias al id

function EliminarCursoLocalStorage(cursoID) {
    // obtenemos el arreglo del curso
    let cursosLS = VerificarLocalStorage();

    // iteramos comparando el id del curso borrado con los del local storage
    cursosLS.forEach(function(cursos, index) {

        if (cursos.id === cursoID) {
            cursosLS.splice(index, 1);
        }
    })

    //a;adimos el arreglo actual a local storage
    localStorage.setItem('cursos', JSON.stringify(cursosLS))
}

//Elimina cursos del carrito en el doom
function vaciarTodo(e) {

    if (e.target.classList.contains('vaciar-carrito')) {

        //borrar todo del carrito
        //   CarritoLista.innerHTML = ''

        //forma recomendada para borrar todo del carrtio por ser mas rapida

        while (CarritoLista.firstChild) {
            CarritoLista.removeChild(CarritoLista.firstChild)

        }
        vaciarLocalStorage();
        // evitar salto al cerrar el video
        return false;
    }



}


// eliminar todo local storage

function vaciarLocalStorage() {

    localStorage.clear()

}