const Admin = require("../Models/Administrateur")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.Signup = async (req,res)=>{
    try{
        
        const saltRounds = 10;
        let hashpass = await bcrypt.hash(req.body.motdepasse,saltRounds)
        let admin = new Admin({
            id:Date.now(),
            nomComplet : req.body.nomComplet,
            email : req.body.email,
            motdepasse : hashpass,
        })
        
        const result = await admin.saveAdmin();
        res.status(201).json({ 
            message: "admin Créé", 
            client: result
        });
    }catch(err){
        res.status(500).json({ 
            error: "Erreur lors de la création d admin",
            details: err.message 
        });
    }  
}

exports.LoginAdmin = async(req,res)=>{
    try{
        
        let user = await new Admin().FindAdminByEmail(req.body.email)
        
        
        if(!user){
            res.status(401).json({ 
                error: "User null",
                details: err.message 
            });
        }
        
        
        // res.json({user:user})
        // // res.json({verif:user.})
        const verifpass = await bcrypt.compare(req.body.motdepasse, user.properties.motdepasse);
         if (!verifpass) {
            return res.status(401).json({
                error: "Email ou mot de passe incorrect"
            });
        }


        
        const token = jwt.sign(
            {
                user:user.properties  
            },
            process.env.JWT_SECRET,
            { expiresIn: '30min' }
        );
        
        res.json({
            success: true,
            message: "Connexion réussie",
            token: token,
            user: user
        });

        
       

    }catch(err){
        res.status(500).json({ 
            error: "Makinsh admin",
            details: err.message 
        });
    }
}


