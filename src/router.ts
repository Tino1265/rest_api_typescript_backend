import { Router } from "express";
import { createProduct, deleteProduct, getProducts, updateAvailability, updateProduct } from "./handlers/products";
import { body, param } from "express-validator";
import { handleInputErrors } from "./middleware";
import { getProductById } from "./handlers/products";
const router = Router();
/**
 * @swagger
 * components:
 *  schemas:
 *      Product:
 *          type: object
 *          properties:
 *              id:
 *                  type: integer
 *                  example: 1
 *                  description: The product id
 *              name: 
 *                  type: string
 *                  example: monitor curvo
 *                  description: The product name
 *              price:
 *                  type: number
 *                  example: 400
 *                  description: The product price
 *              availability:
 *                  type: boolean
 *                  example: true
 *                  description: Tre product avalilability
 */

/**
 * @swagger
 * /api/products:
 *      get:
 *          summary: Get a list of products
 *          tags: 
 *              - Products
 *          description: Return a list of Products
 *          responses: 
 *              200:
 *                  description: Successful Response
 *                  content: 
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/Product'
 */
//Routing
router.get('/',getProducts)
/**
 * @swagger
 * /api/products/{id}:
 *      get:
 *        summary: Get a product by ID
 *        tags:
 *          - Products
 *        description: Return a product based on its unique ID
 *        parameters:
 *            - in: path
 *              name: id
 *              description: The ID of the product to retrieve
 *              required: true
 *              schema: 
 *                  type: integer
 *        responses:
 *            200:
 *                  description: Successful response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Product'
 *            404:
 *                  description: not found
 *            400:  
 *                  description: Bad Request - Invalid Id
 */
router.get('/:id',
    param('id').isInt().withMessage('ID no valido'),
    handleInputErrors,
    getProductById)

/**
 * @swagger
 * /api/products:
 *      post:
 *          summary: creates a new product
 *          tags: 
 *              - Products
 *          description: Return a new record in the database
 *          requestBody: 
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              name:
 *                                  type: string
 *                                  example: "Monitor curvo 49 pulgadas"
 *                              price:
 *                                  type: number
 *                                  example: 399
 *                                      
 *          responses:
 *              201:
 *                  description: Successful response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Product'
 *              400:
 *                  description: Bad Request - invalid input data
 */
router.post('/',
    body('name')
    .notEmpty()
    .withMessage('El nombre de producto no puede ir vacio')
    ,
    body('price')
    .notEmpty().withMessage('El precio no debe estar vacio')
    .isNumeric().withMessage('Valor no valido')
    .custom((value)=>value>0).withMessage('El valor no puede ser negativo')
    .withMessage('Precio no valido'),
    handleInputErrors,
    createProduct)
/**
 * 
 * 
 * 
 * @swagger
 * /api/products/{id}:
 *      put:
 *          summary: Updates a product with user input
 *          tags:
 *              - Products
 *          description: Returns the updated product
 *          parameters:
 *              - in: path
 *                required: true
 *                name: id 
 *                description: The ID of the product to retrieve
 *                schema:
 *                    type: integer
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              name:
 *                                  type: string
 *                                  example: "Monitor Curvo 49 pulgadas"
 *                              price:
 *                                  type: number
 *                                  example: 399
 *                              availability:
 *                                  type: boolean
 *                                  example: true
 *          responses:
 *              200:
 *                  description: Successful response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Product'
 *              400:
 *                  description: Bad Request - Invalid ID or Invalid input data
 *              404:
 *                  description: Product Not Found
 */     
router.put('/:id',
    param('id').isInt().withMessage('ID no valido'),
    body('name').notEmpty().withMessage('El nombre no debe estar vacio'),
    body('price').isNumeric().withMessage('Valor no valido').notEmpty().withMessage('El precio del producto no debe estar vacio')
    .custom((value)=>value>0).withMessage('Precio no valido'),
    body('availability').notEmpty().withMessage('no debe estar vacio').isBoolean().withMessage('Valor para disponibilidad no valido'),
    handleInputErrors,
    updateProduct)
/**
 * @swagger
 * /api/products/{id}:
 *  patch:
 *      summary: Update product availability
 *      tags:
 *          - Products
 *      description: Returns the updated availability
 *      parameters:
 *        - in: path
 *          required: true
 *          name: id
 *          schema:
 *              type: integer 
 *          description: The ID of the product to retrieve
 *      responses:
 *          200:
 *              description: Successful response
 *              content: 
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/Product"
 *          404:
 *              description: Product Not Found
 *          400:
 *              description: Bad Request - Invalid ID or Invalid Input Data
 */
router.patch('/:id',
    param('id').isInt().withMessage('ID no valido'),
    handleInputErrors,
    updateAvailability)

/**
 * @swagger
 * /api/products/{id}:
 *  delete:
 *      summary: delete a product from the DB by ID
 *      tags:
 *          - Products
 *      description: return delete message
 *      parameters: 
 *            - in: path
 *              name: id
 *              required: true
 *              description: the ID of the product to delete
 *              schema:
 *                  type: integer
 *      responses:
 *              200:
 *                  description: Successful response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: string
 *                              value: 'Producto Eliminado'
 *              400:
 *                  description: Bad Request - Invalid ID or Invalid Input Data
 *              404:
 *                  description: Not Found
 */
router.delete('/:id',
    param('id').isInt().withMessage('ID no valido'),
    handleInputErrors,
    deleteProduct
)

export default router;
