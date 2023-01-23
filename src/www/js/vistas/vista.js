/**
 * @file Contiene la vista padre de la que heredan las demás vistas
 * @author Miguel Hidalgo Castro <<miguelhidalgocastro.guadalupe@alumnado.fundacionloyola.net>>
 */

export class Vista {
    /**
     * Constructor
     * @param {HTMLElement} div 
     */
    constructor(div) {
        this.div = div;
    }
    /**
     * Método para hacer que los div se muestren o se oculten, según el parámetro de entrada de la función
     * @param {boolean} ver 
     */
    mostrar(ver) {
        if (ver)
            this.div.style.display = 'block'
        else
            this.div.style.display = 'none'

    }
}