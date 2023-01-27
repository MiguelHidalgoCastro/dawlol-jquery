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
        this.divListarCRUD = $('#vistaListaCRUD')
        this.divCrearCRUD = $('#vistaCrearCRUD')

        /*Nodo enganche lista */
        this.nodoLista = $('#listaCoches')

        /*Localizo botones*/
        this.btnCrear = $('#addCoche')
        this.btnBorrar = $('#delCoche')
        this.btnModificarCoche = $('#modCoche')
        this.btnBuscar = $('#btnBuscar')

        /*SELECT */
        this.selectMarca = $('#enFabq')

        /*EVENTOS */
        this.btnCrear.on('click', this.pulsarCrear.bind(this))
        this.btnBuscar.on('click', this.pulsarBuscar.bind(this))


        this.graficoD3JS()
    }
    /**
     * Función que carga la lista de objetos en la web
     * La lista viene del controlador, con todos los objetos de la bbdd
     * Mediante DOM crea las tarjetas de los objetos
     * @param {Array} lista 
     */
    cargar(lista) {
        /* Todo esto lo tengo que pasar a la vista */
        this.nodoLista.text('')


        lista.forEach(element => {
            let divN1 = $('<div></div>').addClass('col-xl-3 col-md-4 col-sm-10 ms-sm-5 border mb-4').attr('id', 'coche2')
            let divN2 = $('<div></div>').addClass('row border')
            let divN3 = $('<div></div>').addClass('row border')
            let divN4 = $('<div></div>').addClass('row border')
            let divN5 = $('<div></div>').addClass('row border text-center')
            let divN6 = $('<div></div>').addClass('col border')
            let divN7 = $('<div></div>').addClass('col border')

            let imgN1 = $('<img>').attr('src', element.imagen).attr('alt', 'imagen coche')
            imgN1.css({
                "width": "100%",
                "height": "auto"
            })
            // imgN1.click(this.consultarCoche.bind(this, element.id))
            imgN1.on('click', this.consultarCoche.bind(this, element.id))

            let h51N = $('<h5></h5>').addClass('fw-bold text-center').text(element.marca)
            let h52N = $('<h5></h5>').addClass('fw-bold text-center').text(element.modelo)

            let spanModN = $('<span></span>').addClass('link-dark').attr('id', 'modCoche').on('click', this.pulsarModificar.bind(this, element.id))
            let emModN = $('<em></em>').addClass('bi bi-pencil-square').css({ 'fontSize': '3rem' })

            let spanDelN = $('<span></span>').addClass('link-dark').attr('id', 'modCoche').on('click', this.pulsarBorrar.bind(this, element.id))
            let emDelN = $('<em></em>').addClass('bi bi-trash-fill').css({ 'fontSize': '3rem' })

            this.nodoLista.append(divN1[0])
            divN1.append(divN2)
            divN2.append(imgN1)
            divN1.append(divN3)
            divN3.append(h51N)
            divN1.append(divN4)
            divN4.append(h52N)

            divN1.append(divN5)
            divN5.append(divN6)
            divN6.append(spanModN)
            spanModN.append(emModN)

            divN5.append(divN7)
            divN7.append(spanDelN)
            spanDelN.append(emDelN)

        })

        /*Boton add*/
        let divCrear = $('<div></div>').addClass('col-xl-3 col-md-4 col-sm-10 ms-sm-5 border mb-4').css({
            'display': 'flex',
            'alignItems': 'center',
            'justifyContent': 'center'
        })
        let spanAdd = $('<span></span>').attr('id', 'addCoche').addClass('link-dark')
        let emAdd = $('<em></em>').addClass('bi bi-plus-square').css({ 'fontSize': '3rem' }).on('click', this.pulsarCrear.bind(this))
        spanAdd.append(emAdd)
        divCrear.append(spanAdd)
        this.nodoLista.append(divCrear)
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
    /**
     * Gráfico con la librería D3JS
     */
    graficoD3JS() {
        var datos = [150, 235, 250, 182, 225, 175];
        var config = { columnWidth: 45, columnGap: 5, margin: 10, height: 300 };

        d3.select("svg")
            .selectAll("rect")
            .data(datos)
            .enter().append("rect")
            .attr("width", config.columnWidth)
            .attr("x", function (d, i) {
                return config.margin + i * (config.columnWidth + config.columnGap)
            })
            .attr("y", function (d, i) { return config.height - d })
            .attr("height", function (d, i) { return d });
    }
}