var express = require('express');
var router = express.Router();
const Instagram = require('instagram-web-api')
router.get('/',function (req, res, next) {
    return res.render('index', {username: null, followers: null, followings: null, profilePic: null, edgearray: 0});
    next();
  });
router.get('/login',function (req, res, next) {
    return res.render('login');
  });
router.post('/login',function (req, res, next) {
    var user=req.body.username
    var pass=req.body.password
    const client = new Instagram({ username: user, password: pass }, { language: 'es-CL' });   
(async () => {
    await client.login()
    const feed = await client.getHome('KGEAxpEdUwUrxxoJvxRoQeXFGooSlADHZ8UaDdSWbnOIxxoUUhyciJ7EGlxNlZjaYcUaXTgUM00qyBrgBhUsLezIGqVTlxqausga5W-fVax9xRryaBdN1EnIGvdQFgzxoMgaFoLO7v7xWQA=')
    const pic=await (feed.data.user.profile_pic_url)
    const profile = await client.getProfile()
    //await console.log(profile)
    var follow = await client.getFollowers({ userId: feed.data.user.id })
    var following = await client.getFollowings({ userId: feed.data.user.id })
    var photos=await client.getPhotosByUsername({ username: user })
    var edge=await photos.user.edge_owner_to_timeline_media.edges
    return res.render('index', {username: user, followers: follow.count, followings: following.count, profilePic: pic, edgearray: edge, bio:profile.biography});
  })()
  });
module.exports = router;