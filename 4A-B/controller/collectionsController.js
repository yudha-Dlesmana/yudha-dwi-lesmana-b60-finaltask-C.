const {Sequelize, where} = require('sequelize')

const {Collection, Task, User} = require('../models')

async function renderCollectionsPage(req, res){
    const collectionsList = await Collection.findAll({
        attributes: [
            'id', 'name',
            [Sequelize.fn('COUNT', Sequelize.col('tasks.is_done')), 'task_count'],
            [Sequelize.fn('SUM', Sequelize.literal('CASE WHEN "tasks"."is_done" = true THEN 1 ELSE 0 END')), 'done_count'],
        ],
        include: [
            {
                model: User,
                as: 'user',
                attributes:['id']
            },
            {
                model: Task,
                as: 'tasks',
                attributes: []
            },
        ],

        group: ['Collection.id', 'Collection.name', 'user.id'],
        order: [['id', 'ASC']],
        raw: true,
        nest: true
    })
    // console.log(JSON.stringify(collectionsList, null, 2))

    res.render('collections', {collections: collectionsList}) 
}
function renderAddCollectionsPage(req, res){
    res.render('addCollection')
}
async function addCollection(req, res){
    const user = req.session.user
    const {
        collection,
        taskList
    } = req.body
    console.log(user.id);
    console.log(collection);
    console.log(taskList);

    const newCollection = await Collection.create({
        name: collection,
        user_id: user.id,
    })

    const collectionId = newCollection.id

    for (const task of taskList){
        await Task.create({
            name: task,
            is_done: false,
            collection_id: collectionId
        })
    }
    res.redirect('/collections')
}
async function renderUpdateCollectionPage(req, res){
    const user = req.session.user
    const collectionId = req.params.id
    const collectionStats = await Task.findOne({
        where: {
            collection_id: collectionId
        },
        attributes: [
            'collection_id',
            [Sequelize.fn('COUNT', Sequelize.col('is_done')), 'task_count'],
            [Sequelize.fn('SUM', Sequelize.literal('CASE WHEN is_done = true THEN 1 ELSE 0 END')), 'done_count'],
            [Sequelize.fn('SUM', Sequelize.literal('CASE WHEN is_done = false THEN 1 ELSE 0 END')), 'notDone_count']
        ],
        include: [
            {
                model: Collection,
                as: 'collection',
                attributes: ['name', 'user_id'],
            }
        ],
        group: ['collection_id', 'collection.name', 'collection.id'],
        raw: true,
        nest: true
    })
    console.log(JSON.stringify(collectionStats, null, 2))

    const taskList = await Task.findAll({
        where: {
            collection_id: collectionId
        },
        attributes: [
            'id', 'name', 'is_done'
        ],
        raw: true
    })
    // console.log(JSON.stringify(taskList, null, 2))
    // console.log(`user id: ${user.id}`)
    // console.log(`collection user_id ${collectionStats.collection.user_id}`)

    const doneTask = taskList.filter(task => task.is_done === true)
    const notDoneTask = taskList.filter(task => task.is_done === false)

    res.render('update-collections', {collectionStats, doneTask, notDoneTask, user})
}
async function updateCollection(req, res){
    const collectionId = req.params.id
    // console.log(req.body)
    const {
        collectionName,
        taskList,
        is_done,
    } = req.body
    // console.log(collectionName);
    
    console.log(taskList);
    console.log(is_done);

    const collection = await Collection.findOne({
        where: {
            id: collectionId
        },
        attributes: ['id', 'name']
    })
    await collection.update({name: collectionName })
    // console.log(JSON.stringify(collection, null, 2))

    // const task = await Task.findAll({
    //     where: {
    //         collection_id: collectionId
    //     },
    // })
    // console.log(JSON.stringify(tasks, null, 2))
    res.redirect('/collections')
}
async function deleteCollection(req, res){
    const collectionId = req.params.id
    await Collection.destroy({
        where: {
            id: collectionId
        }
    })
    res.redirect('/collections')
}

module.exports = {
    renderCollectionsPage,
    renderAddCollectionsPage,
    addCollection,
    renderUpdateCollectionPage,
    updateCollection,
    deleteCollection,
}