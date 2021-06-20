const express=require('express')
const router=express.Router()
const Author=require('../models/author')

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
    const author =new Author({
        name:req.body.name
    })
    try { 
        const newAuthor= await author.save()
        //res.redirect(`authors/${newAuthor.id}`)
        res.redirect(`authors`)
    } catch { 
        res.render('authors/new',{
            author: author,
            errorMessage: 'Error Creating Author'
        })
    }
   
})
module.exports = router
