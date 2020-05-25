const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const ong_id = request.headers.authorization;
        console.log('Requisição do carinha ai');
        const incidents = await connection('incidents')
            .where('ong_id', ong_id)
            .select('*');
        console.log({incidents});
        return response.json(incidents);
    }
}