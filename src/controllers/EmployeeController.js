var Employee = require('../model/Employee');
var Role = require('../model/Role');
var State = require('../model/State');
var City = require('../model/City');
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
    const {name, email, address, phone, role, city} = req.body;

    const data = await Employee.create({
        name: name,
        email: email,
        address: address,
        phone: phone,
        roleId: role,
        cityId: city
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
        include: [
            {
                model: City, include: State
            },
            {
                model: Role
            }
        ]
    })
    .then(function(data) {
        console.log(data);
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
        include: [
            {
                model: City, include: State
            },
            {
                model: Role
            }
        ]
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
    //const query = 'SELECT E.id, E.name, E.email, E.address, E.phone, R.role, C.name, S.state, S.fu FROM employees E    LEFT JOIN roles R ON E.roleId = R.id     LEFT JOIN cities C ON E.cityId = C.id     LEFT JOIN states S ON C.stateId = S.id';
    const query = 'SELECT * FROM VW_EMPLOYEE';
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
    const {name, email, address, phone, role, city} = req.body;
    const data = await Employee.update({
        name: name,
        email: email,
        address: address,
        phone: phone,
        roleId: role,
        cityId: city,
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

State.create({
    state:  'GOIAS',
    fu: 'GO'
});

City.create({
    name: 'Jataí',
    stateId: 1
})

//Create role
Role.create({
    role:  'Admin'
});

// create employee
Employee.create({
    name: 'Malena Morgan',
    email:  'malena@mail.com',
    address: 'California Cll 108',
    phone: '123456789',
    roleId:1,
    cityId: 4
});

module.exports = controller;