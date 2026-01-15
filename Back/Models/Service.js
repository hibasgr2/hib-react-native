const { driver , neo4j  } = require("../configNeo4j")

class Service{
    constructor(data={}){
        this.id = data.id;
        this.titre = data.titre;
        this.description = data.description;
        this.categorie = data.categorie;
        this.prix = data.prix ;
        this.localisation = data.localisation;
        this.datePublication = data.datePublication || new Date().toISOString();
        this.statut = data.statut;
        this.imageUrls = data.imageUrls || [];
        this.likes = data.likes || 0;
        
    }


    // CREATE (c:Client {
    //                 idC: $idC,
    //                 name: $name,
    //                 email: $mail,
    //                 phone: $phone
    //             })

    async saveService(userId){
        const session = driver.session();
        try {
            const result = await session.run(
                `
                Match(c:User { id: $userId})
                CREATE (s:Service {
                    id: $id,
                    titre: $titre,
                    description: $description,
                    categorie: $categorie,
                    prix: $prix,
                    localisation: $localisation,
                    datePublication : $datePublication,
                    statut : $statut,
                    imageUrls : $imageUrls,
                    likes:0
                })
                CREATE (c)-[:CREATED_SERVICE {
                    date: $datetime
                }]->(s)

                RETURN s,c`,
                {
                    id: this.id,
                    titre: this.titre,
                    description: this.description,
                    categorie: this.categorie,
                    prix: this.prix,
                    localisation: this.localisation,
                    datePublication : this.datePublication,
                    statut : this.statut,
                    imageUrls : this.imageUrls,
                    likes:this.likes,
                    userId,
                    datetime:"2026-01-05T13:01:00Z"
                }
            );
            console.log( result)
            return result.records[0];
        } finally {
            await session.close();
        }
    }

    // Models/Service.js
    async getAllServices() {
        const session = driver.session();
        try {
            const result = await session.run(
                `MATCH (s:Service) RETURN s ORDER BY s.datePublication DESC`
            );
            return result.records.map(record => record.get('s').properties);
        } finally {
            await session.close();
        }
    }


//     async getServiceWithUser() {
//     const session = driver.session();
//     try {
//         const result = await session.run(
//              `MATCH (u:User)-[:CREATED_SERVICE]->(s:Service)
//                 RETURN s, u
//                 ORDER BY s.datePublication DESC`,
           
//         );

//         if (result.records.length === 0) return null;

//         return {
//             service: result.records[0].get('s').properties,
//             user: result.records[0].get('u').properties
//         };
//     } finally {
//         await session.close();
//     }
// }

async getServicesWithUsers() {
  const session = driver.session();

  try {
    const result = await session.run(`
      MATCH (u:User)-[:CREATED_SERVICE]->(s:Service)
      RETURN s, u
      ORDER BY s.datePublication DESC
    `);

    return result.records.map(record => {
      const s = record.get('s');
      const u = record.get('u');

      return {
        service: s.properties,
        user: u.properties
      };
    });

  } finally {
    await session.close();
  }
}


    async deleteAllServices(){
        const session = driver.session()
        const res = await session.run(
            `MATCH(s:Service) DELETE s`
        )
        return res.records;
    }

    async GetServices(id){
        const session = driver.session()
        const res = await session.run(
            `MATCH(s:Service {id:$id}) RETURN s`,{id:id}
        )
        return res.records;
    }
}

module.exports = Service