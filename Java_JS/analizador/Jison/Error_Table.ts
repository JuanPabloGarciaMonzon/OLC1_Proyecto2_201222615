export default class Error_Table
{
    public lexema:String;
    public fila:String;
    public columna:String;
    public tipo:String;


    constructor(lexema:String, fila:String, columna:String, tipo:String){
        this.lexema = lexema;
        this.fila = fila;
        this.columna = columna;
        this.tipo = tipo;
    }

    public errorTable() {
        console.log("ESTO ES PRUEBA:"+this.lexema)
    }

}