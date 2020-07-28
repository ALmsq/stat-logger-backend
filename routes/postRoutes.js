import { addNewPost, getPost, getPostById, updatePost, deletePost } from "../controllers/postControllers"

const routes = (app) => {
    app.route('/posts')
    //GET
        .get(getPost)
    //POST
        .post(addNewPost)
    
    app.route('/post/:PostId')
    //GET post
        .get(getPostById)
    //Update post
        .put(updatePost)
    //Delete post
        .delete(deletePost)
}
export default routes