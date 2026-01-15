const { driver , neo4j  } = require("../configNeo4j")
class User{
    constructor(data={}){
        this.id = data.id;
        this.nomComplet = data.nomComplet;
        this.email = data.email;
        this.telephone = data.telephone;
        this.motdepasse = data.motdepasse;
        this.dateInsription = data.dateInsription || new Date().toISOString();
        this.image = data.image;
        this.localisation = data.localisation;
        this.Bio = data.Bio;
        this.CIN = data.CIN; 
        //Objet de type Service
        this.service = data.service;
        this.rating = data.rating;  
        this.compteProfessionnel = data.compteProfessionnel;
    }
    async saveUser(){
            const session = driver.session();
            try {
                const result = await session.run(
                `CREATE (s:User {
                    id: $id,
                    nomComplet: $nomComplet,
                    email: $email,
                    telephone: $telephone,
                    motdepasse: $motdepasse,
                    dateInsription: $dateInsription,
                    image: $image,
                    CIN: $CIN,
                    localisation: $localisation,
                    compteProfessionnel: $compteProfessionnel
                })
                RETURN s`,
                {
                    id: this.id,
                    nomComplet: this.nomComplet,
                    email: this.email,
                    telephone: this.telephone,
                    motdepasse: this.motdepasse,
                    dateInsription: this.dateInsription,
                    image: this.image,
                    CIN: this.CIN,
                    localisation: this.localisation,
                    compteProfessionnel: this.compteProfessionnel
                }
            );
                return result.records[0];
            } finally {
                await session.close();
            }
    }

    async FindUserByEmail(email){
        const session = driver.session();
        try{
            const result = await session.run(
                "MATCH(u:User {email:$email}) RETURN u",{email:email}
            )
            return result.records[0].get('u');
        }finally{
            await session.close();
        }
    }

     async ChangerCompte(id,bio){
            const session = driver.session();
            try{
                const result = await session.run(
                    `MATCH(u:User {id:$id})
                    SET u.compteProfessionnel = true,
                    u.Bio = $bio,
                    u.service = $service,
                    u.rating = 0
                    `,
                    {
                        id:id,
                        bio:bio,
                        service:this.service,
                    }
                )
                return result.records;
            }finally{
                await session.close();
            }
        }
}

module.exports = User;