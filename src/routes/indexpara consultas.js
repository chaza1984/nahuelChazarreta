const {Router} = require('express')  //requiero expres desde el metodo router
const router = Router()
const fs = require('fs') //modulo file sisteme que viene con node
const multer  =   require('multer')
var path = require('path')
const { render } = require('@nexrender/core')

const videos = []


//----------------------------------------------------------------------------------
//MULTER FILE UPLOADER
//----------------------------------------------------------------------------------

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'src/public/images/')
    },
    filename: (req, file, cb) => {
        archivoFoto = file.fieldname + '-' + Date.now() + path.extname(file.originalname)
        //fieldname va a estampar en el archivo el nombre que tenga "name" en la etiqueta input. (para no usar el nombre que viene con el archivo.)
          cb(null, archivoFoto) 
    
    }
});

const upload = multer({
    storage: storage,
    limits:{fileSize: 1000000},
    fileFilter: function(req, file, cb){
      checkFileType(file, cb);
    }
  }).single('photoUpload');


function checkFileType(file, cb){
    // Allowed ext
    const filetypes = /jpeg|jpg|png|gif/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);
  
    if(mimetype && extname){
      return cb(null,true);
    }
     else {
      cb('Error: Images Only!');
    }
  }








//--------------------------------------------





router.get('/',(req,res)=>{
    res.render('index.ejs', { 
    })
})



router.get('/Frozen2',(req,res)=>{
    res.render('Frozen2')
})

router.get('/PawPatrol',(req,res)=>{
  res.render('PawPatrol')
})

router.get('/infantiles',(req,res)=>{
  res.render('index.ejs')
})

router.get('/progreso',(req,res)=>{
  res.render('progreso.ejs')
})


//upload.single('photoUpload'),

router.post('/Frozen2',  (req,res)=>{

  //funcion para guardar una imagen en el disco con multer
   upload(req,res,(err)=>{
  //Chequeo de errores   
        if(err){
           res.render('Frozen2',{
               msg:err
                                  });
              } 
        else{
                if(req.file == undefined){
               res.render('Frozen2', {
                   msg:'Error: No File Selected'
               })
               } 
    //1)si no hay errores en la captura de la imagen guarda los campos del formulario en variables            
                else {
                console.log(req.file)     
                let fechaNombre = Date.now()
                const {fecha1,fecha2,mensaje1,mensaje2,direccion1,direccion2,direccion3,despedida1,despedida2} = req.body
    //verificar que existan datos en los campos
        if(!fecha1 ||!direccion1|| !direccion2|| !despedida1)
         {
                 res.render('Frozen2.ejs', {
                  msg:'Error: Completa todos los campos'})
          } 
     //2)crea el archivo json con los campos del formulario   
         const job = {
                     //Json DATA

                    }
    
  const json_videos = JSON.stringify(job)

//3)Procesa la imagen y los datos del formulario con un modulo
  const main = async () => {
  
       const result = await render(job, {
       workpath: 'C:bla bla bla', 
       binary: 'C:bla bla bla',
       skipCleanup: true,
       addLicense: false,
       debug: true,
       
   })
 
}
  main().catch(console.error);
  console.log(render.onRenderProgress)

  main().finally(function(){
    console.log("Tarea finalizada!!!!!!!!!!!!!!!!!!!!!!!!!!")
    res.render('VideoCompletado')
  })




res.render('progreso',{
  msgProgress:"Estado del proceso:" + render.value
                     })









            }
            
       }
       
   })
  
    

})







module.exports = router





//comando nexrender 
//nexrender-cli-win64.exe --file prueba.json --binary="c:/program files/adobe after effects cc 2019/support files/aerender.exe" --skip-cleanup
//nexrender-cli-win64.exe --file prueba.json --binary="C:/Program Files/Adobe/Adobe After Effects CC 2018/Support Files/aerender.exe" --skip-cleanup