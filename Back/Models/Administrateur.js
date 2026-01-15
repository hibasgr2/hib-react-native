const { driver , neo4j  } = require("../configNeo4j")

class Administrateur {
    constructor(data={}){
        this.id = data.id;
        this.nomComplet = data.nomComplet;
        this.email = data.email;
        this.motdepasse = data.motdepasse;  
    }

    async saveAdmin(){
            const session = driver.session();
            try {
              const result = await session.run(
                `CREATE (s:Administrateur {
                    id: $id,
                    nomComplet: $nomComplet,
                    email: $email,
                    motdepasse: $motdepasse
                })
                RETURN s`,
                {
                    id: this.id,
                    nomComplet: this.nomComplet,
                    email: this.email,
                    motdepasse: this.motdepasse
                }
            );
            console.log(result.records[0])
                return result.records[0];
            } finally {
                await session.close();
            }
    }

    async FindAdminByEmail(email){
        const session = driver.session();
        try{
            const result = await session.run(
                "MATCH(a:Administrateur {email:$email}) RETURN a",{email:email}
            )
            return result.records[0].get('a');
        }finally{
            await session.close();
        }
    }
}

module.exports = Administrateur;