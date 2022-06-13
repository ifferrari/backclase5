const fs = require('fs')
const express = require ('express')
const app = express()

class Contenedor {
    constructor(fileName) {
        this.fileName = fileName
    
    }

    async save(objeto){
        let data = await fs.promises.readFile(`./${this.fileName}`,'utf-8')
        if (!data){
            objeto.id = 1
            const arr = []
            await fs.promises.writeFile((`./${this.fileName}`,JSON.stringify(arr)))
            return objeto.id
        } else{
            data = JSON.parse(data)
            objeto.id = data.length + 1
            data.push(objeto)
            await fs.promises.writeFile((`./${this.fileName}`, JSON.stringify(data)))
            return objeto.id
        }
    }

    async getByID(id){
        const data = JSON.parse(await fs.promises.readFile(`./${this.fileName}`,'utf-8'))
        return data[id - 1]
    }

    async getAll(){
        try {
            let data = await fs.promises.readFile(`./${this.fileName}`,'utf-8')
            data = JSON.parse(data)
            return data
        } catch {
            console.log('ERROR: No se puede leer el archivo')
        }
    }

    async getRandom(){
        try {
            let data = await fs.promises.readFile(`./${this.fileName}`,'utf-8')
            const random = Math.floor(Math.random() * data.length)
            data = JSON.parse(random, data[random])
            return data
        } catch {
            console.log('ERROR: No se puede leer el archivo')
        }
    }


}

const productos = new Contenedor('productos.txt')


app.get('/', (req,res) => {
    res.send('<h1 style= "color: red">  "Bienvenido a mi servidor"</h1>')
})

app.get('/productos', async (req,res) => {
    const respuesta = await productos.getAll()
    res.send(respuesta)
})

app.get('/productoRandom', async(req,res) => {
    const respuestaRandom = await productos.getRandom()
    res.send(respuestaRandom)
})

app.listen(8080, () => {
    console.log('servidor escuchando puerto 8080')
})