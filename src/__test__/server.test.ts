
import {connectdb} from '../server'
import db from '../config/db'
jest.mock('../config/db')
describe('connectdb',()=>{
    it('Should handle database connection error',async()=>{
        jest.spyOn(db,'authenticate').mockRejectedValueOnce(new Error('Hubo un error al conectar a la BD'));
        const consoleSpy = jest.spyOn(console,'log');
        await connectdb()
        expect(consoleSpy).toHaveBeenCalledWith(
            expect.stringContaining('Hubo un error al conectar a la BD')
        )
    })
})