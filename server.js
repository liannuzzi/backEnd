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
        const minId= Math.min.apply(Math,arrayProductos.map(item=>item.id))

        const max = Math.floor(maxId);
        const min = Math.ceil(minId);
        
        const randomNumber=parseInt(Math.floor(Math.random() * (max - min + 1) + min));

        return randomNumber
    }

    getAll(){
        return fs.promises.readFile(this.filePath,'utf-8')
        .then( productos =>{
            const arrayProductos= JSON.parse(productos);
            return arrayProductos
            
        })
        .catch ( error => {
            console.log('No se puede leer archivo', error)
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

let randomProduct = productos.getRandomProduct()
console.log(randomProduct)

app.get('/productoRandom',(req,res)=>{
   
    res.send({productoRandom:randomProduct})
})

