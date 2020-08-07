var City = require('../model/City');
var State = require('../model/State');
var sequelize = require('../model/database');

const controller = {}


controller.create = async (req, res) => {
    const {city, state} = req.body;
    console.log(req.body);
    const data = await City.create({
        name: city,
        stateId: state
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
    const data = await City.findAll({
        include: [State]
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
    const data = await City.findAll({
        where: { id: id },
        include: [State]
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
    const query = 'SELECT C.ID, C.NAME, S.STATE, S.FU FROM cities C LEFT JOIN states S ON C.stateId = S.id'
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
    const {city, state} = req.body;
    const data = await City.update({
        name: city,
        stateId: state
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
    const del = await City.destroy({
        where: {id: id}
    })
    res.json({success: true, deleted: del, message: "Excluído com sucesso!"});
}

module.exports = controller;