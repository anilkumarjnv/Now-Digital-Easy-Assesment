import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Routes,useLocation } from 'react-router-dom';
import { Button, Container, Typography,Card, CardContent, AppBar, Toolbar} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';

const API_URL = 'https://jsonplaceholder.typicode.com/posts'

const App = () => {
  const [posts, setPosts] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => setPosts(data.slice(0, 10))); 
  }, []);

  const addToFavorites = (postId) => {
    var id=0;
    for(let i=0;i<favorites.length;i++){
      if(favorites[i]===postId){
        id=id+1;
      }
    }
    if(id===0){
      setFavorites([...favorites, postId]);
    }else{
      console.log("already added to favourites")
    }
    
  };

  return (
    <Router>
      <div>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Button variant="text" color='inherit'component={Link} to="/">Simple Blog App</Button>
            </Typography>
            <Button color="inherit" component={Link} to="/favorites">
             Favorites<FavoriteIcon /> {favorites.length}
            </Button>
          </Toolbar>
        </AppBar>
        <Container>
          <Routes>
            <Route path="/favorites" element={<FavoritesPage favorites={favorites} posts={posts} />} />
            <Route path="/posts/:postId" element={<SinglePostPage posts={posts} addToFavorites={addToFavorites} />} />
            <Route path="/" element={<PostListPage posts={posts} addToFavorites={addToFavorites} />} />
          </Routes>
        </Container>
      </div>
    </Router>
  );
};

const PostListPage = ({ posts, addToFavorites }) => {
  return (
    <div>
      <Typography variant="h4" component="h1" sx={{ marginBottom: 2 }}>
        Blog Posts
      </Typography>
      {posts.map((post) => (
        <Card key={post.id} sx={{ marginBottom: 2 }}>
          <CardContent>
            <Typography variant="h6" component="div">
              <Link to={`/posts/${post.id}`} state={{title:post.title,id:post.id}}>{post.title}</Link>
            </Typography>
            <Button onClick={() => addToFavorites(post.id)} sx={{ marginTop: 1 }}>
              Add to Favorites
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

const SinglePostPage = ({addToFavorites }) => {
  const imageUrl = 'https://source.unsplash.com/collection/928423/1280x720';
  const location = useLocation();
  const {title,id}=location.state


  return (
    <div>
      <Typography variant="h4" component="h1" sx={{ marginBottom: 2 }}>
        Single Post
      </Typography> 
        <Card   sx={{ marginBottom: 2 }}>
          <CardContent>
            <Typography variant="h6" component="div">
            {title}
            </Typography>
            <img src={imageUrl} alt="Random" style={{ width: '100%', height: 'auto', marginTop: 1, marginBottom: 1 }} />
            <Typography variant="body1" component="div">
              Post Content goes here...
            </Typography>
            <Button onClick={() => addToFavorites(id)} sx={{ marginTop: 1 }}>
              Add to Favorites
            </Button>
          </CardContent>
        </Card>
     
    </div>
  );
};

const FavoritesPage = ({ favorites, posts }) => {
  return (
    <div>
      <Typography variant="h4" component="h1" sx={{ marginBottom: 2 }}>
        Favorites
      </Typography>
      {favorites.map((postId) => {
        const post = posts.find((p) => p.id === postId);
        return (
          <Card key={post.id} sx={{ marginBottom: 2 }}>
            <CardContent>
              <Typography variant="h6" component="div">
              <Link to={`/posts/${post.id}`} state={{title:post.title,id:post.id}}>{post.title}</Link>
              </Typography>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default App;
