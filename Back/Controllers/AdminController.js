const Admin = require("../Models/Administrateur")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { driver , neo4j  } = require("../configNeo4j")


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


// exports.getStats = async (req,res) => {
//   const session = driver.session();

//   try {
//     // Total de services
//     const totalRequestsResult = await session.run(
//       `MATCH (s:Service) RETURN count(s) AS totalRequests`
//     );
//     const totalRequests = totalRequestsResult.records[0].get("totalRequests").toInt();

//     // Services en attente
//     const pendingRequestsResult = await session.run(
//       `MATCH (s:Service {status: false}) RETURN count(s) AS pendingRequests`
//     );
//     const pendingRequests = pendingRequestsResult.records[0].get("pendingRequests").toInt();

//     // Utilisateurs fournisseurs
//     const totalProvidersResult = await session.run(
//       `MATCH (u:User {compteProfessionnel: true}) RETURN count(u) AS totalProviders`
//     );
//     const totalProviders = totalProvidersResult.records[0].get("totalProviders").toInt();

//     // Utilisateurs clients
//     const totalClientsResult = await session.run(
//       `MATCH (u:User {compteProfessionnel: false}) RETURN count(u) AS totalClients`
//     );
//     const totalClients = totalClientsResult.records[0].get("totalClients").toInt();

//     // Services terminés
//     const completedServicesResult = await session.run(
//       `MATCH (s:Service {status: true}) RETURN count(s) AS completedServices`
//     );
//     const completedServices = completedServicesResult.records[0].get("completedServices").toInt();

  
//     // Retourner sous forme clé/valeur
//     return {
//       totalRequests,
//       pendingRequests,
//       totalProviders,
//       totalClients,
//       completedServices,
//     };
//   } catch (error) {
//     console.error(error);
//      res.status(500).json({ 
//             error: "stats none",
//             details: err.message 
//         });
//     return null;
//   } finally {
//     await session.close();
//   }
// };

exports.getStats = async (req, res) => {
  const session = driver.session();

  try {
    // Total de services
    const totalRequestsResult = await session.run(
      `MATCH (s:Service) RETURN count(s) AS totalRequests`
    );
    const totalRequests = totalRequestsResult.records[0].get("totalRequests").toInt();

    // Services en attente
    const pendingRequestsResult = await session.run(
      `MATCH (s:Service {statut: false}) RETURN count(s) AS pendingRequests`
    );
    const pendingRequests = pendingRequestsResult.records[0].get("pendingRequests").toInt();

    // Utilisateurs fournisseurs
    const totalProvidersResult = await session.run(
      `MATCH (u:User {compteProfessionnel: true}) RETURN count(u) AS totalProviders`
    );
    const totalProviders = totalProvidersResult.records[0].get("totalProviders").toInt();

    // Utilisateurs clients
    const totalClientsResult = await session.run(
      `MATCH (u:User {compteProfessionnel: false}) RETURN count(u) AS totalClients`
    );
    const totalClients = totalClientsResult.records[0].get("totalClients").toInt();

    // Services terminés
    const completedServicesResult = await session.run(
      `MATCH (s:Service {statut: true}) RETURN count(s) AS completedServices`
    );
    const completedServices = completedServicesResult.records[0].get("completedServices").toInt();

    // Retourner les stats sous forme JSON
    res.json({
      totalRequests,
      pendingRequests,
      totalProviders,
      totalClients,
      completedServices,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Impossible de récupérer les stats",
      details: error.message
    });
  } finally {
    await session.close();
  }
};





