const express=require('express')

const app=express()

const PORT = 8080

const server= app.listen(PORT, () =>{
    console.log(`Servidor escuchando en el puerto ${PORT}`)
})

const fs=require('fs')

class Contenedor{

    constructor(filePath){
        this.filePath=filePath
    }

    getRandomProduct(){
        const productos = fs.readFileSync(this.filePath,'utf-8')
        const arrayProductos=JSON.parse(productos)
        const maxId= Math.max.apply(Math,arrayProductos.map(item=>item.id))
        const randomNumber=parseInt(Math.ceil( Math.random() * maxId))
        const resultadoBusqueda = arrayProductos.find(product=>product.id===parseInt(randomNumber))

        return resultadoBusqueda
    }

    getAll(){
        return fs.promises.readFile(this.filePath,'utf-8')
        .then( productos =>{
            const arrayProductos= JSON.parse(productos)
            return arrayProductos
            
        })
        .catch ( error => {
            
            const msjError = `No se puede leer el archivo ${error}`
            return msjError
        })

    }

}

const productos= new Contenedor('./files/productos.json')

app.get('/', (req,res)=>{
    res.send(`<h1 style='color:blue'> Bienvenidos al servidor express`)
})

let allProducts
productos.getAll()
.then(productos=>{
    allProducts=productos
})


app.get('/productos',(req,res)=>{

    res.send(allProducts)
})

app.get('/productoRandom',(req,res)=>{
   
    res.send({productoRandom:productos.getRandomProduct()})
})

