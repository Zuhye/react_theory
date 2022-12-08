import './App.css';
import {useEffect, useState} from 'react';
import {useImmer} from 'use-immer'
import { Link, Route, Routes, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

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

const Control = () => {
  return <ul>
          <li><Link to="/create">Create</Link></li>
          <li><Link to="/update">Update</Link></li>
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

const Read = ({topics})=> {
  const params = useParams();
  const id = Number(params.id);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  useEffect(()=>{
    axios.get(`/topics/${id}`).then(result=>{
      setTitle(result.data.title);
      setBody(result.data.body);
    })
  });
  return <Article title={title} body={body}> </Article>
}

function App(){

  const [topics, setTopics] = useImmer([]);

  const fetchTopics = async()=> {
    const topics = await axios.get('http://localhost:3232/topics');
    setTopics(topics.data);
  }
  // 서버랑 통신하는 코드
  useEffect(()=> {
    fetchTopics();
  }, []);

  const navigate = useNavigate();
   const saveHandler = (title, body) => {

    axios.post('/topics', {title, body}).then(result => {
      setTopics(draft=> {
        draft.push(result.data);
      })
      navigate(`/read/${result.data.id}`);
    })
  }

  return (
    <div className="App">
      <Header title="웹"></Header>
      <Nav topics={topics}></Nav>
      <Routes>
        <Route path="/" element={<Article title="Hello" body = "Welcome, WEB!"/>}></Route>
        <Route path="/create" element={<Create onSave={saveHandler}></Create>}></Route>
        <Route path="/update" element={<Article title="UPDATE" body = "hello"/>}></Route>
        <Route path="/read/:id" element={<Read topics={topics}/>}></Route>
      </Routes>
      <Control/>
    </div>
  );
}

export default App;