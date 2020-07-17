var State = require('../model/State');
var sequelize = require('../model/database');

const controller = {}

controller.create = async (req, res) => {
    const {state, fu} = req.body;

    const data = await State.create({
        state: state,
        fu: fu
    })
    .then(function(data) {
        return data;
    })
    .catch(error => {
        console.log("Erro na inclusão " + error)
        return error;
    });

    res.status(200).json({
        success: true,
        message: "Salvo com sucesso",
        data: data
    });
}

controller.list = async (req, res) => {
    const data = await State.findAll({
    })
    .then(function(data) {
        return data;
    })
    .catch(error => {
        return error;
    });

    res.json({success: true, data:data});
}

controller.get = async (req, res) => {
    const { id } = req.params;
    const data = await State.findAll({
        where: { id: id },
    })
    .then(function(data) {
        return data;
    })
    .catch(error => {
        return error;
    });

    res.json({success: true, data: data});
}

controller.xlsx = async (req, res) => {
    const query = 'SELECT * FROM States';
    const data = await sequelize.query(query)
    .then(function(data) {
        return data;
    })
    .catch(error => {
        return error;
    })

    res.json({success: true, data: data});
}

controller.update = async (req, res) => {
    const { id } = req.params;
    const {state, fu} = req.body;
    const data = await State.update({
        state: state,
        fu: fu
    },
    {    
        where: {id: id}
    })
    .then( function(data) {
        return data;
    })
    .catch(error => {
        return error;
    })
    res.json({success:true, data:data, message:"Atualizado com sucesso"});
}

controller.delete = async (req, res) => {
    const { id } = req.body;
    const del = await State.destroy({
        where: {id: id}
    })
    res.json({success: true, deleted: del, message: "Excluído com sucesso!"});
}

module.exports = controller;