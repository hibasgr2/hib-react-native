const Service = require("../Models/Service")
const { driver , neo4j  } = require("../configNeo4j")


exports.AddService = async (req, res) => {
    try {
        console.log(req.body)
        const service = new Service({
            id: Date.now(),
            titre: req.body.titre,
            description: req.body.description,
            categorie: req.body.categorie.toLowerCase(),
            prix: req.body.prix,
            localisation: req.body.localisation,
            datePublication: req.body.datePublication,
            statut: req.body.statut,
            imageUrls: req.body.imageUrls,
        });
        

        const result = await service.saveService(req.body.userId);
        console.log("result",result)
        res.status(201).json({ 
            message: "Service Créé", 
            service: result
        });
    } catch (err) {
        console.error("Erreur création service:", err);
        res.status(500).json({ 
            error: "Erreur lors de la création du service",
            details: err.message 
        });
    }
};

exports.IncrementerLikesService = async(req,res)=>{
    
}

// exports.AddService = async (req, res) => {
//     try {

//         const service = new Service({
//             id: Date.now(),
//             titre: req.body.titre,
//             description: req.body.description,
//             categorie: req.body.categorie.toLowerCase(),
//             prix: req.body.prix,
//             localisation: req.body.localisation,
//             statut: req.body.statut,
//             imageUrls: req.body.imageUrls,
//         });
        
//         const result = await service.saveService();
//         res.status(201).json({ 
//             message: "Service Créé", 
//             service: result
//         });
//     } catch (err) {
//         console.error("Erreur création service:", err);
//         res.status(500).json({ 
//             error: "Erreur lors de la création du service",
//             details: err.message 
//         });
//     }
// };

exports.getServicesWithUsers = async (req, res) => {
    try {
        const service = new Service();
        const services = await service.getServicesWithUsers();
        res.status(200).json(services);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Erreur récupération services" });
    }
};

// exports.getServicesByCategory = async (req, res) => {
//   try {
//     const category = req.query.category;
//     const session = driver.session();

//     const result = await session.run(
//       `
//       MATCH (s:Service)
//       WHERE s.categorie = $category
//       RETURN s
//       `,
//       { category }
//     );

//     // const services = result.records.map(record => {
//     //   const service = record.get('s').properties;
//     //   const userNode = record.get('u');
//     //   const provider = userNode ? userNode.properties : null;
//     //   return { ...service, provider };
//     // });
     
//     res.status(200).json(result.records);
//     await session.close();
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Erreur récupération services', details: err.message });
//   }
// };

// exports.getServicesByCategory = async (req, res) => {
//   const session = driver.session();
//   try {
//     const category = req.query.category;

//     const result = await session.run(
//       `
//       MATCH (s:Service)
//       WHERE s.categorie = $category
//       RETURN s
//       `,
//       { category }
//     );

//     const services = result.records.map(record =>
//       record.get('s').properties
//     );

//     res.status(200).json(services);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({
//       error: 'Erreur récupération services',
//       details: err.message
//     });
//   } finally {
//     await session.close();
//   }
// };

exports.getAllServices = async (req, res) => {
    try {
        const service = new Service();
        const services = await service.getAllServices();
        res.status(200).json(services);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Erreur récupération services" });
    }
};

exports.getServiceDetails = async (req, res) => {
    try {
        const serviceId = req.params.id;
        const service = new Service();

        const data = await service.getServiceWithUser(serviceId);

        if (!data) {
            return res.status(404).json({ message: "Service introuvable" });
        }

        res.status(200).json(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: "Erreur récupération détails service",
            details: err.message
        });
    }
};

exports.getServicesByCategory = async (req, res) => {
  const session = driver.session();
  try {
    const category = req.query.category;

    const result = await session.run(
      `
      MATCH (s:Service)
      WHERE s.categorie = $category
      RETURN s
      `,
      { category }
    );

    const services = result.records.map(record =>
      record.get('s').properties
    );

    res.status(200).json(services);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: 'Erreur récupération services',
      details: err.message
    });
  } finally {
    await session.close();
  }
};

// exports.getServiceDetails = async (req, res) => {
//     try {
//         const serviceId = req.params.id;
//         const service = new Service();

//         const data = await service.getServiceWithUser(serviceId);

//         if (!data) {
//             return res.status(404).json({ message: "Service introuvable" });
//         }

//         res.status(200).json(data);
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({
//             error: "Erreur récupération détails service",
//             details: err.message
//         });
//     }
// };


exports.approveService = async (req, res) => {
  try {
    const serviceId = Number(req.params.requestId); 
    
    const service = new Service();
    const result = await service.approveService(serviceId);

    if (!result) {
      return res.status(404).json({ message: "Service non trouvé" });
    }

    res.status(200).json({
      message: "Service approuvé",
      data: result
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur approbation service" });
  }
};

exports.rejectService = async (req, res) => {
  try {
   
    const serviceId = Number(req.params.requestId); 

    console.log(serviceId)
    const service = new Service();
    const result = await service.rejectService(serviceId);

    if (!result) {
      return res.status(404).json({ message: "Service non trouvé" });
    }

    res.status(200).json({
      message: "Service rejeté et supprimé"
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur suppression service" });
  }
};

exports.getServiceByUserId = async (req, res) => {
  const userId = Number(req.params.requestId); 
  const session = driver.session();
 
  try {
    const result = await session.run(
   `
            MATCH (u:User {id: $id})-[:CREATED_SERVICE]->(s:Service )
            RETURN s, u
            `,
            { id: Number(userId) }
);

    
    if (result.records.length === 0) {
      console.log("Aucun service trouvé pour cet utilisateur")
      return res.status(200).json(null);
    }

    // Retourne tous les services de l'utilisateur
    const service = result.records[0].get("s").properties;

     
    res.status(200).json(service);

  } catch (err) {
    console.error(err);
    //res.status(500).json({ error: "Erreur récupération services" });
  } finally {
    await session.close();
  }
};



