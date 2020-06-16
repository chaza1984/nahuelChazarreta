const { Router } = require('express')  //requiero expres desde el metodo router
const router = Router()
const fs = require('fs') //modulo file sisteme que viene con node
const multer = require('multer')
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
  limits: { fileSize: 1000000 },
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  }
}).single('photoUpload');


function checkFileType(file, cb) {
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  }
  else {
    cb('Error: Images Only!');
  }
}








//--------------------------------------------





router.get('/', (req, res) => {
  res.render('index.ejs', {
  })
})



router.get('/Frozen2', (req, res) => {
  res.render('Frozen2')
})

router.get('/PawPatrol', (req, res) => {
  res.render('PawPatrol')
})

router.get('/infantiles', (req, res) => {
  res.render('index.ejs')
})

router.get('/progreso', (req, res) => {
  res.render('progreso.ejs')
})


//upload.single('photoUpload'),

router.post('/Frozen2', (req, res) => {

  upload(req, res, (err) => {

    if (err) {
      res.render('Frozen2', {
        msg: err
      });
    }
    else {
      if (req.file == undefined) {
        res.render('Frozen2', {
          msg: 'Error: No File Selected'
        })
      }

      else {
        console.log(req.file)
        
        let fechaNombre = Date.now()
        const { fecha1, fecha2, mensaje1, mensaje2, direccion1, direccion2, direccion3, despedida1, despedida2 } = req.body

        if (!fecha1 || !direccion1 || !direccion2 || !despedida1) {
          res.render('Frozen2.ejs', {
            msg: 'Error: Completa todos los campos'
          })
        }




        const job = {
          "template": {
            "src": "file:///C:/Users/chaza/Desktop/paginas/invitaciones/assets/frozen 2/after effects/frozen2ok15.aep",
            "composition": "frozen2"
          },
          "assets": [
            {
              "src": "file:///C:/Users/chaza/Desktop/paginas/invitaciones/prueba 4/src/public/images/" + archivoFoto,
              "type": "image",
              "layerName": "fotomia"
            },
            {
              "type": "data",
              "layerName": "1fecha",
              "property": "Source Text",
              "value": fecha1
            }
            ,
            {
              "type": "data",
              "layerName": "2fecha",
              "property": "Source Text",
              "value": fecha2
            },
            {
              "type": "data",
              "layerName": "3mensaje",
              "property": "Source Text",
              "value": mensaje1
            },
            {
              "type": "data",
              "layerName": "4mensaje",
              "property": "Source Text",
              "value": mensaje2
            },
            {
              "type": "data",
              "layerName": "5direccion",
              "property": "Source Text",
              "value": direccion1
            },
            {
              "type": "data",
              "layerName": "6direccion",
              "property": "Source Text",
              "value": direccion2
            },
            {
              "type": "data",
              "layerName": "7direccion",
              "property": "Source Text",
              "value": direccion3
            },
            {
              "type": "data",
              "layerName": "8despedida",
              "property": "Source Text",
              "value": despedida1
            },
            {
              "type": "data",
              "layerName": "9despedida",
              "property": "Source Text",
              "value": despedida2
            }



          ],
          "actions": {


            "postrender": [
              {
                "module": "@nexrender/action-encode",
                "output": "encode.mp4",
                "preset": "mp4",
                "params": { "-vcodec": "libx264", "-r": 25 }
              },

              {
                "module": "@nexrender/action-copy",
                "output": "C:/Users/chaza/Documents/nexrender/exports mp4 copis/thisIsACopy" + fechaNombre + ".mp4"
              },

            ]
          },

          onChange: (job, state) => console.log("testing onChange en json:", state),


          onRenderProgress: (job, value) => ("onrender progres:", value)





        }



        console.log(job)
        const json_videos = JSON.stringify(job)


        //solo si trabajo nexrender por cmd
        //fs.writeFileSync('src/video'+ Date.now() +'.json' ,json_videos, 'utf-8')


        console.log(json_videos)

        //res.send('recibido')

        const main = async () => {

          const result = await render(job, {
            workpath: 'C:/Users/chaza/Documents/nexrender/',
            //binary: 'C:/Program Files/Adobe After Effects CC 2019/Support Files/aerender.exe',
            binary: 'C:/Program Files/Adobe/Adobe After Effects CC 2018/Support Files/aerender.exe',
            skipCleanup: true,
            addLicense: false,
            debug: true,

          })
         

        }

        main().catch(console.error);
        console.log("error catch del main")

        main().finally(function () {
          console.log("Tarea finalizada!!!!!!!!!!!!!!!!!!!!!!!!!!")
          
        })


       main().then (function(){

        //aca es cuando termina, tiene que abrir una pagina ya con el video
        res.render('frozen2', {
          msgProgress: "Estado del proceso 1:" 
        })
        
       })

       //esto tendria que estar en javascript de front end para que abra la pagina cuando se toque el boton y no trabe el proceso.
        //res.render('progreso', {
          //msgProgress: "Estado del proceso 1:" 
       // })









      }

    }

  })



})







module.exports = router





//comando nexrender 
//nexrender-cli-win64.exe --file prueba.json --binary="c:/program files/adobe after effects cc 2019/support files/aerender.exe" --skip-cleanup
//nexrender-cli-win64.exe --file prueba.json --binary="C:/Program Files/Adobe/Adobe After Effects CC 2018/Support Files/aerender.exe" --skip-cleanup