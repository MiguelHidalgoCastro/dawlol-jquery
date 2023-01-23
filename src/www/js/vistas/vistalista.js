/**
 * @file Contiene el controlador de la vista lista de coches
 * @author Miguel Hidalgo Castro <<miguelhidalgocastro.guadalupe@alumnado.fundacionloyola.net>>
 */
import { Vista } from "./vista.js";
/**
 * Vista de la lista de coches
 */
export class VistaLista extends Vista {
    /**
   * Constructor
   * @param {Controlador} controlador 
   * @param {HTMLElement} div 
   */
    constructor(controlador, div) {
        super(div)
        this.controlador = controlador

        /*Containers*/
        this.divListarCRUD = document.getElementById('vistaListaCRUD')
        this.divCrearCRUD = document.getElementById('vistaCrearCRUD')


        /*Nodo enganche lista */
        this.nodoLista = document.getElementById('listaCoches')

        /*Localizo botones*/
        this.btnCrear = document.getElementById('addCoche')
        this.btnCrear.onclick = this.pulsarCrear.bind(this)

        this.btnBorrar = document.getElementById('delCoche')
        this.btnModificarCoche = document.getElementById('modCoche')



        this.btnBuscar = document.getElementById('btnBuscar')
        this.btnBuscar.onclick = this.pulsarBuscar.bind(this)

        this.selectMarca = document.getElementById('enFabq')


    }
    /**
     * Función que carga la lista de objetos en la web
     * La lista viene del controlador, con todos los objetos de la bbdd
     * Mediante DOM crea las tarjetas de los objetos
     * @param {Array} lista 
     */
    cargar(lista) {
        /* Todo esto lo tengo que pasar a la vista */
        this.nodoLista.textContent = ''

        lista.forEach(element => {
            let div1 = document.createElement('div')
            div1.setAttribute('class', 'col-xl-3 col-md-4 col-sm-10 ms-sm-5 border mb-4')
            div1.setAttribute('id', 'coche2')

            let div2 = document.createElement('div')
            div2.setAttribute('class', 'row border')

            let img = document.createElement('img')
            img.src = element.imagen //
            img.alt = 'imagen'
            img.style.width = '100%'
            img.style.height = 'auto'
            img.onclick = this.consultarCoche.bind(this, element.id)

            let div3 = document.createElement('div')
            div3.setAttribute('class', 'row border')

            let h51 = document.createElement('h5')
            h51.setAttribute('class', 'fw-bold text-center')
            h51.textContent = element.marca //

            let div4 = document.createElement('div')
            div4.setAttribute('class', 'row border')

            let h52 = document.createElement('h5')
            h52.setAttribute('class', 'fw-bold text-center')
            h52.textContent = element.modelo //

            let div5 = document.createElement('div')
            div5.setAttribute('class', 'row border text-center')

            let div6 = document.createElement('div')
            div6.setAttribute('class', 'col border')

            let spanMod = document.createElement('span')
            spanMod.setAttribute('id', 'modCoche')
            spanMod.setAttribute('class', 'link-dark')
            spanMod.onclick = this.pulsarModificar.bind(this, element.id)

            let emMod = document.createElement('em')
            emMod.setAttribute('class', 'bi bi-pencil-square')
            emMod.style.fontSize = '3rem'

            let div7 = document.createElement('div')
            div7.setAttribute('class', 'col border')

            let spanDel = document.createElement('span')
            spanDel.setAttribute('id', 'delCoche')
            spanDel.setAttribute('class', 'link-dark')
            spanDel.onclick = this.pulsarBorrar.bind(this, element.id)

            let emDel = document.createElement('em')
            emDel.setAttribute('class', 'bi bi-trash-fill')
            emDel.style.fontSize = '3rem'

            div1.appendChild(div2)
            div2.appendChild(img)
            div1.appendChild(div3)
            div3.appendChild(h51)
            div1.appendChild(div4)
            div4.appendChild(h52)

            div1.appendChild(div5)
            div5.appendChild(div6)
            div6.appendChild(spanMod)
            spanMod.appendChild(emMod)
            div5.appendChild(div7)
            div7.appendChild(spanDel)
            spanDel.appendChild(emDel)

            this.nodoLista.appendChild(div1)

        });

        /*Boton add*/
        let divCrear = document.createElement('div')
        divCrear.setAttribute('class', 'col-xl-3 col-md-4 col-sm-10 ms-sm-5 border mb-4')
        divCrear.style.display = 'flex'
        divCrear.style.alignItems = 'center'
        divCrear.style.justifyContent = 'center'

        let spanAdd = document.createElement('span')
        spanAdd.setAttribute('id', 'addCoche')
        spanAdd.setAttribute('class', 'link-dark')

        let emAdd = document.createElement('em')
        emAdd.setAttribute('class', 'bi bi-plus-square')
        emAdd.style.fontSize = '3rem'
        emAdd.onclick = this.pulsarCrear.bind(this)

        spanAdd.appendChild(emAdd)
        divCrear.appendChild(spanAdd)
        this.nodoLista.appendChild(divCrear)


    }
    /**
     * Función que le manda al controlador lo que el modelo tiene que buscar en la bbdd
     * En éste caso, son todos los objetos
     */

    mostrarCoches() {
        this.controlador.buscar()
    }

    /*eventos de pulsar */
    /**
     * Le pido al controlador que muestre el formulario de crear
     */
    pulsarCrear() {
        this.controlador.mostrarFormularioCrear()

    }
    /**
     *  Le pido al controlador que muestre el formulario de modificar
     */
    pulsarModificar(id) {
        this.controlador.buscarPorID(id, true)
    }
    /**
     * Función que le manda el id del elemento al controlador para buscarlo en la bbdd y borrarlo
     * @param {int} id 
     */
    pulsarBorrar(id) {
        this.controlador.borrar(id)
    }
    /**
     * Función que le manda al controlador lo que el modelo tiene que buscar en la bbdd
     * En éste caso trae las coincidencias de las marcas 
     */
    pulsarBuscar() {
        this.controlador.buscar(this.selectMarca.value)
    }
    /**
     * Función que le manda el id al controlador para buscarlo en la bbdd
     * @param {int} id 
     */
    consultarCoche(id) {
        this.controlador.buscarPorID(id, false)
    }
}