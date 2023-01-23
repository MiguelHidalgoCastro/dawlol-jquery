/**
 * @file Contiene el controlador de la vista crear de coches
 * @author Miguel Hidalgo Castro <<miguelhidalgocastro.guadalupe@alumnado.fundacionloyola.net>>
 */

import { Vista } from "./vista.js";
import { Coche } from "../modelos/coche.js";
/**
 * Vista para Crear coches
 */
export class VistaFormulario extends Vista {
    /**
    * Constructor
    * @param {Controlador} controlador 
    * @param {HTMLElement} div 
    */
    constructor(controlador, div) {
        super(div)
        this.controlador = controlador

        this.btnAceptar = document.getElementById('btnAceptar')
        this.btnAceptar.onclick = this.aceptar.bind(this)

        this.btnVolver = document.getElementById('btnCancelar')
        this.btnVolver.onclick = this.back.bind(this)

        this.btnModificar = document.getElementById('btnModificar')
        this.btnModificar.onclick = this.modificar.bind(this)

        //inputs
        this.marca = document.getElementById('imarca')
        this.modelo = document.getElementById('imodelo')
        this.fecha = document.getElementById('ifecha')
        this.enFab = document.getElementById('enFab')
        this.descripcion = document.getElementById('textDescripcion')

        this.extra1 = document.getElementById('extra1')
        this.extra2 = document.getElementById('extra2')
        this.extra3 = document.getElementById('extra3')
        this.extra4 = document.getElementById('extra4')
        this.extra5 = document.getElementById('extra5')

        //Imagen base64   
        this.imagen = document.getElementById('imagen')
        this.base64 = null

        this.imagen.addEventListener('change', e => {
            const archivo = this.imagen.files[0]
            const lector = new FileReader()
            lector.addEventListener('load', () => {
                this.base64 = lector.result
            })
            lector.readAsDataURL(archivo)
        })
    }
    /**
     * Evento al pulsar el botón aceptar. Recojo todos los datos, los empaqueto y se los doy al controlador
     */
    aceptar() {

        //Validamos los campos
        let mensaje = ''
        let mostrarAlerta = false

        // Expresiones regulares
        let expMarca = /^[A-Z][A-z]{3,20}$/
        if (!expMarca.test(this.marca.value)) {
            if (mensaje == '')
                mensaje = "La marca debe de tener la primera letra mayúscula, sin números y un máximo de 20 caracteres"

            mostrarAlerta = true
        }

        let expModelo = /^[A-Z0-9][A-z0-9]{1,20}$/
        if (!expModelo.test(this.modelo.value)) {
            if (mensaje == '')
                mensaje = "Modelo debe de tener la primera letra mayúscula y mínimo dos caracteres, máximo 20"
            else
                mensaje = mensaje + "\nModelo debe de tener la primera letra mayúscula y mínimo dos caracteres, máximo 20"
            mostrarAlerta = true
        }

        if (this.fecha.value == '') {
            if (mensaje == '')
                mensaje = "Selecciona una fecha valida"
            else
                mensaje = mensaje + "\nSelecciona una fecha valida"
            mostrarAlerta = true
        }
        else {
            //cuando la fecha sea mayor que la de hoy, enfabricación no puede ser si
            //enfab por defecto va a ser si
        }

        //relleno array de extras

        let extras = []

        extras.push(this.extra1.checked)
        extras.push(this.extra2.checked)
        extras.push(this.extra3.checked)
        extras.push(this.extra4.checked)
        extras.push(this.extra5.checked)

        if (this.descripcion.value == '')
            this.descripcion.value = 'No descripción'

        if (mostrarAlerta)
            alert(mensaje)

        else {
            //los empaqueto
            let coche = new Coche(this.marca.value, this.modelo.value, this.fecha.value, this.enFab.value, this.descripcion.value, extras, this.base64)

            // los mando al controlador como un objeto coche
            this.controlador.insertarCoche(coche)

            // borro los campos
            this.borrarCampos()
        }


    }
    /**
     * Función que borra los inpunts del formulario 
     */
    borrarCampos() {
        this.marca.value = ''
        this.modelo.value = ''
        this.fecha.value = ''
        this.extra1.checked = false
        this.extra2.checked = false
        this.extra3.checked = false
        this.extra4.checked = false
        this.extra5.checked = false
        this.descripcion.value = ''
        this.base64 = ''
        this.imagen.src = ''
        this.imagen.value = ''

        document.getElementById('divImagenPrevia').style.display = 'none'
        document.getElementById('imagenPrevia').src = ''
    }
    /**
     * Funcion para que el controlador modifique las vistas 
     * Se utiliza una vez que has pulsado el botón aceptar y comunicar al controlador que le toca modificar las vistas
     */
    back() {
        this.borrarCampos()
        this.controlador.back()
        this.controlador.recargar()
    }
    /**
     * Función para cargar los datos del coche que se desea modificar
     * El id que me entra por parámetro desde el controlador, lo guardo en un input hidden para no perderlo
     * @param {int} id 
     * @param {Object} coche 
     * @param {String} string Aquí me dice que voy a hacer si modificar o consultar
     */
    cargarCoche(id, coche, string) {

        this.marca.value = coche.marca
        this.modelo.value = coche.modelo
        this.fecha.value = coche.fechaFabricacion
        this.descripcion.value = coche.descripcion

        this.extra1.checked = coche.extras[0]
        this.extra2.checked = coche.extras[1]
        this.extra3.checked = coche.extras[2]
        this.extra4.checked = coche.extras[3]
        this.extra5.checked = coche.extras[4]

        this.enFab.value = coche.enFabricacion

        document.getElementById('divImagenPrevia').style.display = 'block'
        document.getElementById('imagenPrevia').src = coche.imagen
        document.getElementById('idCoche').value = id


        if (string === 'consultar')
            this.cambiarEstadoCampos(true)
        else
            this.cambiarEstadoCampos(false)



    }
    /**
     * Función que empaqueta los datos nuevos del coche y 
     * se los manda al controlador para que avise al modelo que tiene que modificar un objeto en la bbdd
     */
    modificar() {
        let idCoche = document.getElementById('idCoche').value


        //Validamos los campos
        let mensaje = ''
        let mostrarAlerta = false

        // Expresiones regulares
        let expMarca = /^[A-Z][A-z]{3,20}$/
        if (!expMarca.test(this.marca.value)) {
            if (mensaje == '')
                mensaje = "La marca debe de tener la primera letra mayúscula, sin números y un máximo de 20 caracteres"

            mostrarAlerta = true
        }

        let expModelo = /^[A-Z0-9][A-z0-9]{1,20}$/
        if (!expModelo.test(this.modelo.value)) {
            if (mensaje == '')
                mensaje = "Modelo debe de tener la primera letra mayúscula y mínimo dos caracteres, máximo 20"
            else
                mensaje = mensaje + "\nModelo debe de tener la primera letra mayúscula y mínimo dos caracteres, máximo 20"
            mostrarAlerta = true
        }

        if (this.fecha.value == '') {
            if (mensaje == '')
                mensaje = "Selecciona una fecha valida"
            else
                mensaje = mensaje + "\nSelecciona una fecha valida"
            mostrarAlerta = true
        }
        else {
            //cuando la fecha sea mayor que la de hoy, enfabricación no puede ser si
            //enfab por defecto va a ser si
        }

        //relleno array de extras

        let extras = []

        extras.push(this.extra1.checked)
        extras.push(this.extra2.checked)
        extras.push(this.extra3.checked)
        extras.push(this.extra4.checked)
        extras.push(this.extra5.checked)

        if (this.descripcion.value == '')
            this.descripcion.value = 'No descripción'

        if (mostrarAlerta)
            alert(mensaje)

        else {
            //los empaqueto
            let coche = new Coche(this.marca.value, this.modelo.value, this.fecha.value, this.enFab.value, this.descripcion.value, extras, document.getElementById('imagenPrevia').src)

            // los mando al controlador como un objeto coche
            this.controlador.insertarCochePorID(idCoche, coche)

            //borro los campos
            this.borrarCampos()
        }


    }
    /**
     * Función que me deshabilita los campos o me los habilita según la entrada
     * @param {boolean} boolean 
     */
    cambiarEstadoCampos(boolean) {
        if (boolean) {
            this.marca.disabled = true
            this.modelo.disabled = true
            this.fecha.disabled = true
            this.descripcion.disabled = true
            this.enFab.disabled = true
            this.extra1.disabled = true
            this.extra2.disabled = true
            this.extra3.disabled = true
            this.extra4.disabled = true
            this.extra5.disabled = true
            this.imagen.disabled = true
        }
        else {
            this.marca.disabled = false
            this.modelo.disabled = false
            this.fecha.disabled = false
            this.descripcion.disabled = false
            this.enFab.disabled = false
            this.extra1.disabled = false
            this.extra2.disabled = false
            this.extra3.disabled = false
            this.extra4.disabled = false
            this.extra5.disabled = false
            this.imagen.disabled = false
        }

    }
}