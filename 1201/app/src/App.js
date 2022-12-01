import './App.css';
import {useEffect, useState} from 'react';
import {useImmer} from 'use-immer'
import axios from 'axios'
import { Link, Route, Routes, useNavigate, useParams } from 'react-router-dom';


const Header = ({title})=> {
  return <header>
    <h1><Link to="/">{title}</Link></h1>
  </header>;
}

const Nav = ({topics})=> {
  const litag = topics.map((t)=> {
    return <li key={t.id}>
      <Link to={`/read/${t.id}`}>{t.title}
      </Link>
      </li>
  })
  return <nav>
    <ul>
      {litag}
    </ul>
  </nav>;
}

const Article = ({title, body})=> {
  return <article>
    <h2>{title}</h2>
   {body}
  </article>;
}

const Control = ({onDelete}) => {
  const params = useParams();
  const id = Number(params.id);
  let contextUI = null;
  if(id) {
    contextUI = <>
      <li><Link to={`/update/${id}`}>Update</Link></li>
      <li><button onClick={() =>{onDelete(id)}}>Delete</button></li>
    </>
  }
  return <ul>
          <li><Link to="/create">Create</Link></li>
          {contextUI}
        </ul>
}

const Create = ({onSave}) => {
  const submitHandler = (event)=> {
    event.preventDefault(); //기본 동작 금지(새로고침)
    const title = event.target.title.value;
    const body = event.target.body.value;
    onSave(title, body)
  }
  return <form onSubmit={submitHandler}>
  <p><input type="text" name="title" placeholder="title"></input></p>
  <p><textarea name="body" placeholder='body'></textarea></p>
  <p><input type="submit" value="Create"></input></p>
</form>
}

const Read = ()=> {
  const params = useParams();
  const id = Number(params.id);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  useEffect(()=>{
    axios.get(`http://localhost:3232/topics/${id}`).then(result=>{
      setTitle(result.data.title);
      setBody(result.data.body);
    })
  }, [id]);
  return <Article title={title} body={body}> </Article>
}

const Update = ({onSave}) => {
  const params = useParams();
  const id = Number(params.id);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  useEffect(()=>{
    axios.get(`/topics/${id}`).then(result=>{
      setTitle(result.data.title);
      setBody(result.data.body);
    })
  }, [id]);
  const submitHandler = (evt)=>{
    evt.preventDefault();
    const title = evt.target.title.value;
    const body = evt.target.body.value;
    onSave(id, title, body);
  }

  const titleHandler = (evt)=> {
    setTitle(evt.target.value);
  }

  const bodyHandler = (evt)=> {
    setBody(evt.target.value);
  }

  return <form onSubmit={submitHandler}>
    <p><input type="text" name="title" placeholder="title" value={title} onChange={titleHandler} /></p>
    <p><textarea name="body" placeholder="body" value={body} onChange={bodyHandler}></textarea></p>
    <p><input type="submit" value="Create" /></p>
  </form>
}


function App() {

  const [topics, setTopics] = useImmer([]);

  const fetchTopics = async()=> {
    const topics = await axios.get('/topics');
    setTopics(topics.data);
  }
  // 서버랑 통신하는 코드
  useEffect(()=> {
    fetchTopics();
  }, []);

  const navigate = useNavigate();

  const createHandler = (title, body) => {

   axios.post('/topics', {title, body}).then(result => {
     setTopics(draft=> {
       draft.push(result.data);
     })
     navigate(`/read/${result.data.id}`);
   })
 }

 
 const updateHandler = (id, title, body) => {

  axios.patch(`/topics/${id}`, {title, body}).then(result => {
    setTopics(draft=> {
      const index = draft.findIndex(t=> t.id === id);
      draft[index].title = title;
      draft[index].body = body;
    })
    navigate(`/read/${id}`);
  })
}

const deleteHandler = async (id) => {
  await axios.delete(`/topics/${id}`);
  fetchTopics();
  navigate(`/read/${id}`);
}

  return (
    <div className="App">
      <Header title="웹" />
      <Nav topics={topics}/>
      <Routes>
        <Route path="/" element={<Article title="Hello" body = "Welcome, WEB!"/>}></Route>
        <Route path="/create" element={<Create onSave={createHandler}></Create>}></Route>
        <Route path="/read/:id" element={<Read topics={topics}/>}></Route>
        <Route path="/update/:id" element={<Update onSave={updateHandler}></Update>}></Route>
      </Routes>

      <Routes>
        <Route path="/" element={<Control/>}></Route> 
        <Route path="/create" element={<Control/>}></Route> 
        <Route path="/read/:id" element={<Control onDelete={deleteHandler}/>}></Route>
        <Route path="/update/:id" element={<Control onDelete={deleteHandler}/>}></Route>  
      </Routes>
    </div>
  );
}

export default App;
