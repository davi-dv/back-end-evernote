var express = require('express');
var router = express.Router();
const Note = require('../../models/note');
const withAuth = require('../middlewares/auth');



//coloquei o withAuth para antes de fazer o post verificar se o usuario está autenticado
router.post('/',withAuth,async(req,res)=>{
    const {title,body} = req.body;
    
    try {
        let note = new Note ({title:title,body:body,author:req.user._id});
        await note.save();
        res.status(200).json(note)
    } catch (error) {
        res.status(500).json({error:'Erro ao criar uma nova nota!'})
    }
})

//baixa uma nota
router.get('/:id',withAuth,async(req,res)=>{
    try {
    const {id} = req.params;
    let note = await Note.findById(id)
    
     //confere se o usuário é dono da nota que vai baixar
    if(isOwner(req.user,note))
       res.json(note)
    else
       res.status(403).json({error:'você não tem permissão para acessar essa nota!'})  

    } catch (error) {
        res.status(500).json({error:'Erro ao pegar nota!'})  
    }
})

//busca por todas as nota de um usuário
router.get('/',withAuth,async(req,res)=>{
    try {
        let notes = await note.find({author:req.user._id})
        res.json(notes)
    } catch (error) {
        res.json({error:error}).status(500);
        
    }
})

//para alterar uma nota já existente
router.put('/:id',withAuth,async(req,res)=>{
    const {title,body} = req.body;

    const {id} = req.params

    try {
        let note = await Note.findById(id)
        if(isOwner(req.user,note)){
            
            let note = await Note.findOneAndUpdate(
                {_id:id},
                {$set:{title:title,body:body}},
                {upsert:true,'new':true}
                );

                res.json(note)
        }else{
            res.status(403).json({error:'permissão negada!'})
        }
        
        
    } catch (error) {
        res.status(500).json({error:'Erro ao atualizar nota!'})
    }
})


//essa função verifica se o usuario é dono de uma nota
const isOwner=(user,note)=>{
    if(JSON.stringify(user._id) == JSON.stringify(note.author._id))
    return true
    else{
        return false;
    }
}

module.exports = router;