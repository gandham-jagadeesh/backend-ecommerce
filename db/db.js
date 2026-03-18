const pg = require("pg-promise")({
    connect(e){
        const cp = e.client.connectionParameters;
        console.log("connected to db: ",cp.database);
    },
    disconnect(e){
       console.log("disconnected: ",e);
    },

    error(e){
        console.log("error: ",e)
    }
});
// const cn = "postgresql://neondb_owner:npg_nLtXK3JB2CSY@ep-divine-night-adj0mf23-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
//format: postgresql://<user>:<password>@<host>:<port>/<database>?<query_params>
const options = {
    user: "neondb_owner",
    password:"npg_nLtXK3JB2CSY",
    ssl:true,
    host:"ep-divine-night-adj0mf23-pooler.c-2.us-east-1.aws.neon.tech",
    database:"neondb",
    port: 5432
}

const db = pg(options);
module.exports = db;
