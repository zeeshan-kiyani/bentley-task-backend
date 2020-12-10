import { Request, Response } from "express";
const status =  require('../common/status-code')
const router = require('express-promise-router')();
const { Request, Response }=require('express');
const getLargestNo = (req:Request,res:Response) =>{
    const input_array: number[] = req.body.input_array;
    let first:number,second:number;
    first  =  input_array[0];
    second = 0;
    input_array.map(value =>{
        if(first < value){
            second = first;
            first = value;
        }else if(value > second && value != first){
            second = value;
        }
    });
    return res.status(status.successCode).json({largest_no : first , second_largest : second})
}
router.post('/', getLargestNo);
module.exports = router;