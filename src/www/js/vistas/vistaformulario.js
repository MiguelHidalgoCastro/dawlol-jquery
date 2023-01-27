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

        /*Botones y eventos */
        this.btnAceptar = $('#btnAceptar').on('click', this.aceptar.bind(this))
        this.btnVolver = $('#btnCancelar').on('click', this.back.bind(this))
        this.btnModificar = $('#btnModificar').on('click', this.modificar.bind(this))

        //inputs
        this.marca = $('#imarca')
        this.modelo = $('#imodelo')
        this.fecha = $('#ifecha')
        this.enFab = $('#enFab')
        this.descripcion = $('#textDescripcion')

        this.extra1 = $('#extra1')
        this.extra2 = $('#extra2')
        this.extra3 = $('#extra3')
        this.extra4 = $('#extra4')
        this.extra5 = $('#extra5')

        //Imagen base64   
        this.imagen = $('#imagen')
        this.base64 = null

        this.imagen.on('change', e => {
            const archivo = this.imagen[0].files[0]
            const lector = new FileReader()
            lector.addEventListener('load', () => {
                this.base64 = lector.result
            })
            lector.readAsDataURL(archivo)
        })

        this.autocompletar()
        this.cambiarSelectEnFab()
        this.cambiarChecks()
        this.cambiarInputFecha()
        this.addtool()
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
        if (!expMarca.test(this.marca.val())) {
            if (mensaje == '')
                mensaje = "La marca debe de tener la primera letra mayúscula, sin números y un máximo de 20 caracteres"

            mostrarAlerta = true
        }

        let expModelo = /^[A-Z0-9][A-z0-9]{1,20}$/
        if (!expModelo.test(this.modelo.val())) {
            if (mensaje == '')
                mensaje = "Modelo debe de tener la primera letra mayúscula y mínimo dos caracteres, máximo 20"
            else
                mensaje = mensaje + "\nModelo debe de tener la primera letra mayúscula y mínimo dos caracteres, máximo 20"
            mostrarAlerta = true
        }

        if (this.fecha.val() == '') {
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

        extras.push(this.extra1.prop('checked'))
        extras.push(this.extra2.prop('checked'))
        extras.push(this.extra3.prop('checked'))
        extras.push(this.extra4.prop('checked'))
        extras.push(this.extra5.prop('checked'))

        if (this.descripcion.val() == '')
            this.descripcion.val('No descripción')

        if (mostrarAlerta)
            alert(mensaje)

        else {
            //los empaqueto
            let coche = new Coche(this.marca.val(), this.modelo.val(), this.fecha.val(), this.enFab.val(), this.descripcion.val(), extras, this.base64)

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
        this.marca.val('')
        this.modelo.val('')
        this.fecha.val('')
        this.extra1.prop('checked', false)
        this.extra2.prop('checked', false)
        this.extra3.prop('checked', false)
        this.extra4.prop('checked', false)
        this.extra5.prop('checked', false)
        this.descripcion.val('')
        this.base64 = ''
        this.imagen.src = ''
        this.imagen.val('')

        $('#divImagenPrevia').css({
            'display': 'none'
        })
        $('#imagenPrevia').attr('src', '')

    }
    /**
     * Funcion para que el controlador modifique las vistas 
     * Se utiliza una vez que has pulsado el botón aceptar y comunicar al controlador que le toca modificar las vistas
     */
    back() {
        this.borrarCampos()
        this.controlador.back()
    }
    /**
     * Función para cargar los datos del coche que se desea modificar
     * El id que me entra por parámetro desde el controlador, lo guardo en un input hidden para no perderlo
     * @param {int} id 
     * @param {Object} coche 
     * @param {String} string Aquí me dice que voy a hacer si modificar o consultar
     */
    cargarCoche(id, coche, string) {

        this.marca.val(coche.marca)
        this.modelo.val(coche.modelo)
        this.fecha.val(coche.fechaFabricacion)
        this.descripcion.val(coche.descripcion)

        this.extra1.prop('checked', coche.extras[0])
        this.extra2.prop('checked', coche.extras[1])
        this.extra3.prop('checked', coche.extras[2])
        this.extra4.prop('checked', coche.extras[3])
        this.extra5.prop('checked', coche.extras[4])

        this.enFab.val(coche.enFabricacion)

        $('#divImagenPrevia').css({
            'display': 'block'
        })
        $('#imagenPrevia').attr('src', coche.imagen)
        $('#idCoche').val(id)


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
        let idCoche = $('#idCoche').val()

        //Validamos los campos
        let mensaje = ''
        let mostrarAlerta = false

        // Expresiones regulares
        let expMarca = /^[A-Z][A-z]{3,20}$/
        if (!expMarca.test(this.marca.val())) {
            if (mensaje == '')
                mensaje = "La marca debe de tener la primera letra mayúscula, sin números y un máximo de 20 caracteres"

            mostrarAlerta = true
        }

        let expModelo = /^[A-Z0-9][A-z0-9]{1,20}$/
        if (!expModelo.test(this.modelo.val())) {
            if (mensaje == '')
                mensaje = "Modelo debe de tener la primera letra mayúscula y mínimo dos caracteres, máximo 20"
            else
                mensaje = mensaje + "\nModelo debe de tener la primera letra mayúscula y mínimo dos caracteres, máximo 20"
            mostrarAlerta = true
        }

        if (this.fecha.val() == '') {
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
        extras.push(this.extra1.prop('checked'))
        extras.push(this.extra2.prop('checked'))
        extras.push(this.extra3.prop('checked'))
        extras.push(this.extra4.prop('checked'))
        extras.push(this.extra5.prop('checked'))

        if (this.descripcion.val() == '')
            this.descripcion.val('No descripción')
        if (mostrarAlerta)
            alert(mensaje)
        else {
            //los empaqueto
            let coche = new Coche(this.marca.val(), this.modelo.val(), this.fecha.val(), this.enFab.val(), this.descripcion.val(), extras, $('#imagenPrevia').attr('src'))

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
            this.marca.prop('disabled', true)
            this.modelo.prop('disabled', true)
            this.fecha.prop('disabled', true)
            this.descripcion.prop('disabled', true)
            this.enFab.prop('disabled', true)
            this.extra1.prop('disabled', true)
            this.extra2.prop('disabled', true)
            this.extra3.prop('disabled', true)
            this.extra4.prop('disabled', true)
            this.extra5.prop('disabled', true)
            this.imagen.prop('disabled', true)
        }
        else {
            this.marca.prop('disabled', false)
            this.modelo.prop('disabled', false)
            this.fecha.prop('disabled', false)
            this.descripcion.prop('disabled', false)
            this.enFab.prop('disabled', false)
            this.extra1.prop('disabled', false)
            this.extra2.prop('disabled', false)
            this.extra3.prop('disabled', false)
            this.extra4.prop('disabled', false)
            this.extra5.prop('disabled', false)
            this.imagen.prop('disabled', false)
        }

    }

    /** JQUERY UI  */

    /**
     * Autocompletar marcas coche en el formulario
     * Sugiere una marca
     */
    autocompletar() {
        let availableTags = [
            "Mercedes",
            "Alfa Romeo",
            "Aston Martin",
            "Audi",
            "Autovaz",
            "Bentley",
            "Bmw",
            "Cadillac",
            "Caterham",
            "Chevrolet",
            "Chrysler",
            "Citroen",
            "Cupra",
            "Daihatsu",
            "Dodge",
            "Ferrari",
            "Fiat",
            "Ford",
            "Honda",
            "Hummer",
            "Hyundai",
            "Isuzu",
            "Jaguar",
            "Jeep",
            "Kia",
            "Lamborghini",
            "Lancia",
            "Land Rover",
            "Lexus",
            "Lotus",
            "Maserati",
            "Mazda",
            "Mercedes Benz",
            "MG",
            "Mini",
            "Mitsubishi",
            "Morgan",
            "Nissan",
            "Opel",
            "Peugeot",
            "Porsche",
            "Renault",
            "Rolls Royce",
            "Rover",
            "Saab",
            "Seat",
            "Skoda",
            "Smart",
            "Ssangyong",
            "Subaru",
            "Suzuki",
            "Tata",
            "Toyota",
            "Volkswagen",
            "Volvo",
        ]
        $('#imarca').autocomplete({ source: availableTags })
    }
    /**
     * Función para cambiar el tipo de select y utilizar el de JQuery UI
     */
    cambiarSelectEnFab() {
        $('#enFab').selectmenu().addClass('form-select col-6')
    }
    /**
     * Cambio el tipo del grupo de los checksbox del formulario por el de JQuery UI
     */
    cambiarChecks() {
        $('#extra1').checkboxradio({ icon: false })
        $('#extra2').checkboxradio({ icon: false })
        $('#extra3').checkboxradio({ icon: false })
        $('#extra4').checkboxradio({ icon: false })
        $('#extra5').checkboxradio({ icon: false })
    }

    /**
     * Cambia los input fecha por los de JQuery UI
     */

    cambiarInputFecha() {
        $('#ifecha').datepicker()
        $('#ifecha').datepicker("option", "showAnim", 'bounce')
    }
    /**
     * Añade un dato al text area para cuando hay mouseover
     */
    addtool() {
        $('#textDescripcion').tooltip()
    }
}