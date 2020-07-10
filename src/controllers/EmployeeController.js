var Employee = require('../model/Empolyee');
var Role = require('../model/Role');
var sequelize = require('../model/database');

const controller = {}

controller.test = (req, res) => {

    const data = {
        name: 'Gleidson Morais',
        age: 37,
        city: 'London'
    }

    console.log("Send data from controller employee");
    res.json(data);
};

controller.testdata = async (req, res) => {
    const response = await sequelize.sync().then(function(){
        const data = Employee.findAll();
        return data;
    })
    .catch(err => {
        return err;
    });

    res.json(response)
}

controller.create = async (req, res) => {
    const {name, email, address, phone, role} = req.body;

    const data = await Employee.create({
        name: name,
        email: email,
        address: address,
        phone: phone,
        roleId: role
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
    const data = await Employee.findAll({
        include: [Role]
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
    const data = await Employee.findAll({
        where: { id: id },
        include: [Role]
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
    const {name, email, address, phone, role} = req.body;
    const data = await Employee.update({
        name: name,
        email: email,
        address: address,
        phone: phone,
        roleId: role
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
    const del = await Employee.destroy({
        where: {id: id}
    })
    res.json({success: true, deleted: del, message: "Excluído com sucesso!"});
}

module.exports = controller;