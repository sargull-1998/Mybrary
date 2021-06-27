const express=require('express')
const author = require('../models/author')
const router=express.Router()
const Author=require('../models/author')
const Book = require('../models/book') 

//all authors route ,i wata case insenstive a
router.get('/', async (req,res) =>{
    let searchOptions = {}
    if(req.query.name != null && req.query.name !== ''){
        searchOptions.name = new RegExp(req.query.name, 'i')
    }
    try {
const authors =await Author.find(searchOptions)
//authors ka nawe hamu authorakana yaksana baw authors variable a
res.render('authors/index',{ authors: authors,
     searchOptions: req.query
    })
    } catch {
res.redirect('/')
    }
})
//new author route, just to display the form
router.get('/new', (req,res) =>{
    res.render('authors/new',{ author: new Author()}) //lera datanin passe chand variable aki bkaen danerdre lo ejs file bas yakamjar dabi importe bkaen awa save e author naka bas authore drust daka datanin bakare binin lo create u delete u update e data
})
//this route create the author for us
router.post('/', async (req,res)=>{
 
const author = new Author({
    name:req.body.name
})
try{
author = await Author.findById(req.params.id)
await author.save()
res.redirect(`authors/${newAuthor.id}`)
}catch{
    res.render('authors/new',{
        author: author,
        errorMessage: 'Error Creating Author'
    })
}
    })

router.get('/:id', async (req,res)=>{
 try{
const author = await Author.findById(req.params.id)
const books = await Book.find({ author : author.id }).limit(6).exec()
res.render('authors/show' , {
    author  : author,
    booksByAuthor: books
})

 }catch(err){
console.log(err)
res.redirect('/')
 }
})
router.get('/:id/edit',async (req,res)=>{
    try{
        const author= await Author.findById(req.params.id)
        res.render('authors/edit',{ author: author}) 
    }catch{
res.redirect('/authors')
    }
})
router.put(':/id', async (req,res)=>{
    let author
    try { 
         author = await Author.findById(req.params.id)
         author.name = req.body.name
         await author.save()
        res.redirect(`/authors/${author.id}`)
        
    } catch { 
        if(author == null){
            res.redirect('/')
        }else{
            res.render('authors/edit',{
                author: author,
                errorMessage: 'Error Updating Author'
            }) 
        }
    }
})
router.delete('/:id',async (req,res)=>{
    let author
    try { 
         author = await Author.findById(req.params.id)
         await author.remove()
        res.redirect(`/authors`)
        
    } catch { 
        if(author == null){
            res.redirect('/')
        }else{
           res.redirect(`/authors/${author.id}`)
    }
  }
})
module.exports = router
