const User = require("../Models/User")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.Signup = async (req,res)=>{
    try{
        const saltRounds = 10;
        let hashpass = await bcrypt.hash(req.body.motdepasse,saltRounds)
        let user = new User({
            id:Date.now(),
            nomComplet : req.body.nomComplet,
            email : req.body.email,
            telephone : req.body.telephone,
            motdepasse : hashpass,
            image :  "",
            CIN:req.body.CIN,
            localisation:req.body.localisation,
            compteProfessionnel : false,
        })
        const result = await user.saveUser();
        res.status(201).json({ 
            message: "Client Créé", 
            client: result
        });
    }catch(err){
        res.status(500).json({ 
            error: "Erreur lors de la création du client",
            details: err.message 
        });
    }  
}

exports.LoginUser = async(req,res)=>{
    try{
        console.log(req.body)
        
        let user = await new User().FindUserByEmail(req.body.email)
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
            { expiresIn: '10min' }
        );
        
        res.json({
            success: true,
            message: "Connexion réussie",
            token: token,
            user: user
        });
       

    }catch(err){
        res.status(500).json({ 
            error: "Makinsh client",
            details: err.message 
        });
    }
}


exports.changerStatut = async(req,res)=>{
    try{
        const headerobj = req.headers.authorization;
        const token = headerobj.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await new User().ChangerCompte(decoded.user.userId,req.body.bio)
        res.status(200).json({
            message : "Cmpt tmodifia",
            resultat : user
        })
    }catch(err){
        res.status(500).json({ 
            error: "Erreur dans le switch dyal user",
            details: err.message 
        });
    }
}

exports.profileuser = (req,res) =>{
    const headerobj = req.headers.authorization;
    const token = headerobj.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
     res.status(200).json({
        message : "compte user",
        resultat : decoded.user
    })
}