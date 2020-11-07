const express = require('express')
const Team = require('../models/Team')
//const date = require('../models/date')
const router = new express.Router()

router.post('/team', async (req, res) => {
    const team = new Team(req.body)

    try {
        await team.save()
        res.status(201).send(team)
    } catch (e) {
        res.status(400).send(e)
    }
})


router.get('/teams', async (req, res) => {
    try {
        const teams = await Team.find({})
        res.send(teams)
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/combination', async (req, res) => {
    try {
        let newarray = []
        newarray = await Team.find(req.team)
        array = newarray.map((number) => number.name)
        let results = [];
        let a = 1;

        for (let i = 0; i < array.length - 1; i++) {
            for (let j = i + 1; j < array.length; j++) {
                // vr = []
                // results[i]= [array[i] , array[j]] 
                results.push(`${array[i]} ${array[j]}`)
            }
        }
        var myobject = {}
        for (let i = 0; i < results.length; i++) {
            let newresult = []
            newresult = results[i].split(" ")
            myobject[i] = [newresult[0], newresult[1]]
        }

        let withdate = { ...myobject };
        let teamsdate = {}
        let d = new Date();
        let date = d.getDate();
        teamsdate[0] = [withdate[0][0], withdate[0][1], `${date}/${d.getMonth()}/${d.getFullYear()}`]
        for (let a = 0; a < results.length - 1; a++) {
            if (!(withdate[a].includes(myobject[a + 1][0]) || withdate[a].includes(myobject[a + 1][1]))) {
                date = date + 1
                teamsdate[a + 1] = [withdate[a + 1][0], withdate[a + 1][1], `${date}/${d.getMonth()}/${d.getFullYear()}`]
            } else {
                date = date + 2
                teamsdate[a + 1] = [withdate[a + 1][0], withdate[a + 1][1], `${date}/${d.getMonth()}/${d.getFullYear()}`]

            }
        }
        res.send(teamsdate)
    } catch (e) {
        res.status(500).send()
    }
})


router.patch('/team/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['points']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const team = await Team.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    
        if (!team) {
            return res.status(404).send()
        }

        res.send(team)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/allpoints', async (req, res) => {
    try {
        let newarray = []
        newarray = await Team.find(req.team)
        array = newarray.map((number) => number.name)
        
        let pointsarray = []
        pointsarray = await Team.find(req.team)
        points = pointsarray.map((number) => number.points)
       
        let results = [];


        for (let i = 0; i < array.length - 1; i++) {
            for (let j = i + 1; j < array.length; j++) {
                results.push(`${array[i]} ${points[j]}`)
            }
        }

        var myobject = {}
        for (let i = 0; i < results.length; i++) {
            let newresult = []
            newresult = results[i].split(" ")
            myobject[i] = [newresult[0], newresult[1]]
        }

       
        res.send(myobject)
    } catch (e) {
        res.status(500).send()
    }
})


module.exports = router