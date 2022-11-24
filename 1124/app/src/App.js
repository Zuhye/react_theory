import './App.css';
import {useState} from 'react';
import {useImmer} from 'use-immer'
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
  const topic = topics.find(t=> t.id===id);
  return <Article title={topic.title} body={topic.body}> </Article>
}

function App(){

  const [nextId, setNextId] = useState(4) //글 추가할 때 다음 아이디 지정
  const [topics, setTopics] = useImmer([
    {id:1, title:'html', body:'html is ...'},
    {id:2, title:'css', body:'css is ...'},
    {id:3, title:'js', body:'js is ...'}
  ]);
  const navigate = useNavigate();
  
   const saveHandler = (title, body) => {
    setTopics(draft => {
      draft.push({id:nextId, title, body})
    });
    //url을 생성된 컨텐츠의 주소로 변경
    navigate(`/read/${nextId}`);
    setNextId(oldNextId => oldNextId + 1);
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