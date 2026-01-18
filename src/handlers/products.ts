import { Request,Response } from "express"
import Product from "../models/Product"
import {check, validationResult} from 'express-validator'

export const getProductById = async (req:Request,res:Response)=>{
        const id = +req.params.id;
        const product = await Product.findByPk(id)
        if(!product){
            return res.status(404).json({error:'Producto No Encontrado'})
        }
        res.json({data:product})
}

export const getProducts = async (req:Request,res:Response)=>{
        const product = await Product.findAll({
            attributes:{exclude:['createdAt','updatedAt'],
            },
            order: [
                ['id','ASC']
            ]
        });
        res.json({data:product})
}

export const createProduct = async(req:Request,res:Response)=>{
    // const product = new
    //  Product(req.body)
    // const saveProduct = await product.save();
    //validacion
    // await check('name')
    // .notEmpty()
    // .withMessage('El nombre de producto no puede ir vacio')
    // .run(req)
    // await check('price')
    // .notEmpty().withMessage('El precio no debe estar vacio')
    // .isNumeric().withMessage('Valor no valido')
    // .custom((value)=>value>0).withMessage('El valor no puede ser negativo')
    // .withMessage('Precio no valido')
    // .run(req)
    //validacion sin middleware
    // let errors = validationResult(req);
    // if(!errors.isEmpty()){
    //     return res.status(400).json({errors: errors.array()})
    // }
        const product = await Product.create(req.body)
        res.status(201).json({data:product})
}

export const updateProduct = async (req:Request,res:Response)=>{
        const id = +req.params.id;
        const product = await Product.findByPk(id);
        if(!product){
            return res.status(404).json({error:'Producto No Encontrado'})
        }
        //Actualizar
        //este no serie el comportamiento de put ya que put hace modificaciones totales con la info
        //dada
        await product.update(req.body);
        //este seria el comportamiento real modifica todos los datos
        // product.name = req.body.name;
        // product.price = req.body.price;
        // product.availability = req.body.availability;
        // ya no es necesario utilizarlo con updata
        await product.save();
        res.json({data:product})
}

export const updateAvailability = async (req:Request,res:Response)=>{
        const id = +req.params.id;
        const product = await Product.findByPk(id);
        if(!product){
            return res.status(404).json({error: 'No existe'})
        }
        product.availability = !product.dataValues.availability
        await product.save();
        res.json({data:product})
}

export const deleteProduct = async (req:Request,res:Response)=>{
        const id = +req.params.id;
        const product = await Product.findByPk(id);
        if(!product){
            return res.status(404).json({error: 'No existe'})
        }
        await product.destroy();
        res.json({data:'Producto Eliminado'})
}