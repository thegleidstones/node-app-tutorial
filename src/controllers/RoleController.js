var Role = require('../model/Role');
var sequelize = require('../model/database');

const controller = {}

controller.create = async (req, res) => {
    const {role} = req.body;

    const data = await Role.create({
        role: role
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
    const data = await Role.findAll({
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
    const data = await Role.findAll({
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

controller.update = async (req, res) => {
    const { id } = req.params;
    const {role} = req.body;
    const data = await Role.update({
        role: role
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
    const del = await Role.destroy({
        where: {id: id}
    })
    res.json({success: true, deleted: del, message: "Excluído com sucesso!"});
}

module.exports = controller;