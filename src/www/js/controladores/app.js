/**
 * @file Contiene el controlador principal de la app
 * @author Miguel Hidalgo Castro <<miguelhidalgocastro.guadalupe@alumnado.fundacionloyola.net>>
 */
import { VistaLista } from "../vistas/vistalista.js"
import { VistaFormulario } from "../vistas/vistaformulario.js"
import { Modelo } from "../modelos/modelo.js"
/**
 * Controlador principal de la app
 */
class Controlador {
    /**
     * Constructor de la clase
     * Carga el método iniciar al cargar la página
     */
    constructor() {
        this.modelo = new Modelo(this)
        window.onload = this.iniciar.bind(this)
    }
    /**
     * Inicia la aplicación
     * Muestra la vista de la lista de coches y, carga las vistas y el modelo
     */
    iniciar() {
        //aqui cargaría el modelo

        /*Containers de los divs*/
        this.divListaCRUD = document.getElementById('vistaListaCRUD')
        this.divFormulario = document.getElementById('vistaFormulario')


        this.vistaListaCoches = new VistaLista(this, this.divListaCRUD)
        this.vistaFormulario = new VistaFormulario(this, this.divFormulario)

        /*Para ocultar titulo y botones del formulario */
        this.tituloCrear = document.getElementById('tituloCrear')
        this.tituloModificar = document.getElementById('tituloModificar')
        this.tituloConsultar = document.getElementById('tituloConsultar')

        this.btnAceptar = document.getElementById('btnAceptar')
        this.btnModificar = document.getElementById('btnModificar')

        this.imagenNav = document.getElementById('imgNav')
        this.imagenNav.onclick = this.recargar.bind(this)

        /*Mensajes */
        this.divMensajes = document.getElementById('mensajes')
        this.mensajeCrear = document.getElementById('mensajeCrear')
        this.mensajeModificar = document.getElementById('mensajeModificar')
        this.mensajeBorrar = document.getElementById('mensajeBorrar')

        //Cargamos la vista principal
        this.mostrarIndex()

        //Cargamos la lista inicial
        this.buscar()

    }
    /**
     * Función que recarga la aplicación
     */
    recargar() {
        this.iniciar()
    }
    /**
     * Muestra la lista de coches
     */
    mostrarIndex() {
        this.ocultarTodo()
        this.vistaListaCoches.mostrar(true)
        this.vistaFormulario.mostrar(false)
    }
    /**
     * Para volver al Index
     */
    back() {
        this.mostrarIndex()
    }
    /**
     * Función que oculta todos los divs
     */
    ocultarTodo() {
        this.vistaListaCoches.mostrar(false)
        this.vistaFormulario.mostrar(false)
        this.mensajeCrear.style.display = 'none'
        this.mensajeModificar.style.display = 'none'
        this.mensajeBorrar.style.display = 'none'
    }

    /**
     * Para mostrar los componentes necesarios para crear un coche
     */
    mostrarFormularioCrear() {
        this.vistaListaCoches.mostrar(false)
        this.vistaFormulario.mostrar(true)
        this.btnModificar.style.display = 'none'
        this.tituloModificar.style.display = 'none'
        this.btnAceptar.style.display = 'inline'
        this.tituloCrear.style.display = 'block'
        this.vistaFormulario.cambiarEstadoCampos(false)
        this.tituloConsultar.style.display = 'none'
    }
    /**
     * Para mostrar los componentes necesarios para modificar un coche
     */
    mostrarFormularioModificar() {
        this.vistaListaCoches.mostrar(false)
        this.vistaFormulario.mostrar(true)
        this.btnModificar.style.display = 'inline'
        this.tituloModificar.style.display = 'block'
        this.btnAceptar.style.display = 'none'
        this.tituloCrear.style.display = 'none'
    }
    /**
     * Para mostrar los componentes necesarios para consultar un coche
     */
    mostrarConsultar() {
        this.vistaListaCoches.mostrar(false)
        this.vistaFormulario.mostrar(true)
        this.btnModificar.style.display = 'none'
        this.tituloModificar.style.display = 'none'
        this.btnAceptar.style.display = 'none'
        this.tituloCrear.style.display = 'none'

    }

    /**
     * Función que pasa los datos al modelo del coche que tiene que insertar en al bbdd
     * @param {Object} coche 
     */
    insertarCoche(coche) {
        this.modelo.insertar(coche, this.insertarCocheOK.bind(this))
    }
    /**
     * Función de callback que avisa al usuario de la correcta insercción del coche en la bbdd
     */
    insertarCocheOK() {
        this.ocultarTodo()
        this.mensajeCrear.style.display = 'block'
        setTimeout(this.recargar.bind(this), 3000)
    }
    /**
     * Función que pasa los datos al modelo del coche y el id que tiene que modificar en al bbdd
     * @param {int} id 
     * @param {Object} coche 
     */
    insertarCochePorID(id, coche) {
        this.modelo.insertarCochePorID(id, coche, this.insertarCochePorIDOK.bind(this))
    }
    /**
     * Función de callback que avisa al usuario de la correcta modificación del coche en la bbdd
     */
    insertarCochePorIDOK() {
        this.ocultarTodo()
        this.vistaFormulario.borrarCampos()
        this.mensajeModificar.style.display = 'block'
        setTimeout(this.recargar.bind(this), 3000)
    }
    /**
     * Funcion que pasa la marca al modelo para buscar las coincidencias en la base de datos
     * @param {string} marca 
     */
    buscar(marca) {
        this.modelo.buscar(marca, this.buscarOK.bind(this))
    }
    /**
     * Función de callback que le da a la vista la lista de coches de la coincidencia de búsqueda
     * @param {Array} lista 
     */
    buscarOK(lista) {
        this.vistaListaCoches.cargar(lista)
    }
    /**
     *  Función que pasa el dato del id del coche al modelo para borrarlo
     * @param {int} id 
     */
    borrar(id) {
        this.modelo.borrar(id, this.borrarOK.bind(this))
    }
    /**
     * Función de callback que avisa al usuario del borrado 
     */
    borrarOK() {
        this.ocultarTodo()
        this.mensajeBorrar.style.display = 'block'
        setTimeout(this.recargar.bind(this), 3000)
    }
    /**
     * Función que le pasa el id al modelo para buscarlo en la bbdd
     * @param {int} id 
     */
    buscarPorID(id, boolean) {
        if (boolean === true)
            this.modelo.buscarPorID(id, this.buscarPorIDOK.bind(this, id))
        if (boolean === false)
            this.modelo.buscarPorID(id, this.consultarPorIDOK.bind(this, id))

    }

    /**
     * Función de callback que regresa del modelo para pasarle a la vista el coche buscando
     * @param {int} id 
     * @param {Object} coche 
     */
    buscarPorIDOK(id, coche) {
        this.mostrarFormularioModificar()
        this.vistaFormulario.cargarCoche(id, coche, 'modificar')
    }
    /**
     *  Función de callback que regresa del modelo para pasarle a la vista el coche buscando
     * @param {int} id 
     * @param {Object} coche 
     */
    consultarPorIDOK(id, coche) {
        this.mostrarConsultar()
        this.vistaFormulario.cargarCoche(id, coche, 'consultar')
    }


}

const app = new Controlador()