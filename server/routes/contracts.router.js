const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// Get all of the contract requests a manager has sent out
router.get('/outbox/:id', (req, res) => {
    const responses = {
        projectResponse: [],
        designerResponse: [],
        managerResponse: [],
    };
    const projectQueryText = `
        SELECT * FROM contract_requests
        JOIN projects ON projects.id = contract_requests.project_id
        JOIN software ON software.id = contract_requests.software_id
        WHERE requesting_manager_id = $1
        GROUP BY contract_requests.id, projects.id, software.id;`;

    const designerQueryText = `
        SELECT * FROM contract_requests
        JOIN designers ON designers.id = contract_requests.contracted_designer_id
        JOIN "user" ON "user".designer_id = designers.id
        WHERE requesting_manager_id = $1;`;

    const managerQueryText = `
        SELECT "user".* FROM contract_requests
        JOIN designers ON designers.id = contract_requests.contracted_designer_id
        JOIN "user" ON "user".id = designers.manager_id
        WHERE requesting_manager_id = $1
        group by "user".id;`;

    

    pool.query(projectQueryText, [req.params.id])
        .then(response1 => {
            responses.projectResponse = response1.rows;
            console.log('outbox GET - projectQuery SUCCESS - reponses=', responses);
            pool.query(designerQueryText, [req.params.id])
                .then(response2 => {
                    responses.designerResponse = response2.rows;
                    console.log('outbox GET - designerQuery SUCCESS - reponses=', responses);
                    pool.query(managerQueryText, [req.params.id])
                        .then(response3 => {
                            responses.managerResponse = response3.rows;
                            console.log('outbox GET - managerQuery SUCCESS - reponses=', responses);
                            res.send(responses);
                        }).catch(error => {
                            console.log('Error in contracts.router /outgoing GET:', error)
                            res.sendStatus(500);
                        });
                }).catch(error => {
                    console.log('Error in contracts.router /outgoing GET:', error)
                    res.sendStatus(500);
                });
        }).catch(error => {
            console.log('Error in contracts.router /outgoing GET:', error)
            res.sendStatus(500);
        });
});

router.post('/', (req, res) => {
    
});

module.exports = router;