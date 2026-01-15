const { driver , neo4j  } = require("../configNeo4j")
class Avis{
    constructor(data={}){
        this.id = data.id;
        this.clientId = data.clientId;
        this.destinataireId = data.destinataireId;
        this.note = data.note;
        this.commentaire = data.commentaire;
        this.datePublication = data.datePublication || new Date().toISOString();
    }

    async ajouterAvis(){
         const session = driver.session();
        try{
            const result = await session.run(
                `
                MATCH (service:Service {id: $id_service})
                MATCH (client:User {id: $id_user})
                CREATE (avis:Avis {
                    id: $id,
                    note: $note,
                    commentaire: $commentaire,
                    datePublication: $datepublication
                })
                CREATE (client)-[:A_FAIT {
                    date: datetime()
                }]->(avis)
                CREATE (avis)-[:CONCERNE]->(service)
                RETURN service,client,avis
                `,
                {
                    id: this.id,                    
                    note: this.note,                
                    commentaire: this.commentaire,  
                    datepublication: this.datePublication,
                    id_service: this.destinataireId,
                    id_user: this.clientId
                }
            )
            return result.records[0];
        }finally{
            await session.close();
        }
    }
}

module.exports = Avis;