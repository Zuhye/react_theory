import './App.css';
import {useState} from 'react';

const Header = ({title, onChangeMode})=> {
  return <header>
    <h1><a href="index.html" onClick={(event)=> {
      event.preventDefault();
      onChangeMode("WELCOME");
    }}>{title}</a></h1>
  </header>;
}

const Nav = ({topics, onChangeMode})=> {
  const litag = topics.map((t)=> {
    return <li key={t.id}>
      <a href={`/read/${t.id}`} onClick={(event=>{
        event.preventDefault();
        onChangeMode('READ', t.id);
      })}>{t.title}
      </a>
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

const Control = ({ onChangeMode}) => {
  return <ul>
          <li><a href="/create" onClick={(event)=> {
            event.preventDefault();
            onChangeMode('CREATE')
          }}>Create</a></li>
          <li><a href="/update" onClick={(event)=> {
            event.preventDefault();
            onChangeMode('UPDATE')
          }}>Update</a></li>
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


function App(){
  const [mode, setMode] = useState("WELCOME"); //화면전환
  const [id, setId] = useState(null); //선택한 글 표시
  const [nextId, setNextId] = useState(4) //글 추가할 때 다음 아이디 지정
  const [topics, setTopics] = useState([
    {id:1, title:'html', body:'html is ...'},
    {id:2, title:'css', body:'css is ...'},
    {id:3, title:'js', body:'js is ...'}
  ]);
  
  const changeModeHandler = (_mode2,id) => {
    setMode(_mode2);
    if(id !== undefined) {
      setId(id);
    }
  }

   const saveHandler = (title, body) => {
    let newTopics = [...topics];
    newTopics.push({id:nextId, title, body})
    setTopics(newTopics);
    setMode('READ');
    setId(nextId);
    setNextId(oldNextId => oldNextId + 1);
  }


  let content = null;
  if(mode === "WELCOME") {
    content = <Article title="Hello" body = "Welcome, WEB!"/>
  } else if (mode === "READ") {
    const selected = topics.find(t=> t.id === id);
    content = <Article title={selected.title} body={selected.body}/>
  } else if (mode === "CREATE") {
    content = <Create onSave={saveHandler}/>
  } else if (mode === "UPDATE") {
    content = <Article title="UPDATE" body = "hello"/>
  }

  return (
    <div className="App">
      <Header title="웹"onChangeMode={changeModeHandler}></Header>
      <Nav topics={topics} onChangeMode={changeModeHandler}></Nav>
      {content}
      <Control onChangeMode = {changeModeHandler}/>
    </div>
  );
}

export default App;
