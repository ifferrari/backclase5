const express = require ('express')
const app = express()

async function leerArchivo (){
    try{
        const contenido = await fs.promises.readFile('/backch/productos.txt','utf-8')
        console.log(contenido)
    }
    catch(err){
        console.log('Error de lectura',err)
    }
}


app.use((req,res,next) => {
    visitas ++
    next ()
})


app.get('/', (req,res) => {
    res.send('<h1 style= "color: blue">  "Bienvenido al Servidor express"</h1>')
})

app.get('/productos', (req,res) => {
    res.send(leerArchivo())
})

app.get('/productoRandom', (req,res) => {
    res.send(getByID(2))
})

app.listen(8080, () => {
    console.log('servidor escuchando puerto 8080')
})