const {Collection, Task} = require('../models')

function renderCollectionsPage(req, res){
    res.render('collections')
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

module.exports = {
    renderCollectionsPage,
    renderAddCollectionsPage,
    addCollection,
}