import React, { useEffect, useState } from "react";
import "./style.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Title from "../../components/Titles";
import firebase from "../../services/firebase";
import { toast } from "react-toastify";
import { FiUpload } from "react-icons/fi";

type InputFilesType = {
  name: string;
};

export default function PostRenevues() {
  const [ingredientes, setIngrediente] = useState("");
  const [datauser, setDatauser] = useState<any>();
  const [dataingredientes, setDatangrediente] = useState<string[]>([]);
  const [datafiles, setDatafiles] = useState<any>();
  const [title, setTitle] = useState<string>("");
  const [nivel, setNivel] = useState<string>("");
  const [categoria, setCategoria] = useState<string>("");
  const [tipo, setTipo] = useState<string>("");
  const [modo, setModo] = useState<string>("");
  const [load, setLoad] = useState<boolean>(false);
  const [tempo, setTempo] = useState<string>("");



  useEffect(() => {
    const userdata = JSON.parse(localStorage.getItem("@receitasweb") as string) || {};
    setDatauser(userdata?.user);
  }, []);



  async function FilesRegister(files: any) {
    if (!datauser) {
      return;
    }
    setLoad(true);
    const arquives = files.target.files;
    const arrayfiles = [];

    for (let i = 0; i < arquives?.length; i++) {
      arrayfiles.push(arquives[i]);
    }
    if(arrayfiles.length > 2){
      toast.info('Maximo de 2 fotos!')
      return;
    }
    setDatafiles(arrayfiles);

    arrayfiles.forEach(async (item) => {
      await firebase
        .storage()
        .ref(`/files/${datauser?.uid}`)
        .child(`${datauser?.uid}-${item.name}`)
        .put(item)
        .then(async () => {
          await firebase
            .storage()
            .ref(`/files/${datauser?.uid}`)
            .child(`${datauser?.uid}-${item.name}`)
            .getDownloadURL()
            .then((url) => {
              let data: [""] = JSON.parse(localStorage.getItem("@files") as any) || [];
              data.push(url);
              localStorage.setItem("@files", JSON.stringify(data));
              setLoad(false);
            });
        })
        .catch((err) => {
          console.log(err);
          toast.error("Ops, tente novamente mais tarde!");
        });
    });
  }

  async function handleformrenevues(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!datauser) {
      return;
    }
    if (!title || !modo || !dataingredientes || !tipo || !categoria || !nivel) {
      toast.info("Preencha todos os campos!");
      return;
    }

    const banners: [""] = JSON.parse(localStorage.getItem("@files") as any) || [];

    let data = {
      user: datauser?.uid,
      created_at: new Date().getDate(),
      title,
      nivel,
      categoria,
      tipo,
      banners,
      dataingredientes,
      modo,
      avaliacoes: 0,
      tempoPreparo: tempo,
    };
    

    await firebase
      .firestore()
      .collection("receitas")
      .doc(`${datauser?.uid}-${title}`)
      .set(data)
      .then(() => {
        toast.success("Receita criada com sucesso!");
        localStorage.removeItem("@files");
      })
      .catch(() => {
        toast.error("Ops, tente novamente mais tarde!");
      });
  }

  async function handleDeletefile(name:string,index:number){
    await firebase.storage().ref(`/files/${datauser?.uid}`).child(`${datauser?.uid}-${name}`).delete()
    .then(()=>{
      const newArrayFiles:[''] = datafiles?.filter((item:InputFilesType) => item.name !== name)
      setDatafiles(newArrayFiles)
      const localstoragedata:[''] = JSON.parse(localStorage.getItem("@files") as any) || {};
      const filterLocalstorage = localstoragedata.filter((item:any,ind:number) => ind !== index )

      localStorage.setItem('@files',JSON.stringify(filterLocalstorage))

      if(!newArrayFiles.length){
         document.getElementById('files')?.setAttribute('type','text')
         document.getElementById('files')?.setAttribute('type','file')  
        return;
      }

      toast.success('Foto removida!')
    })
    .catch((err)=>{
      console.log(err)
      toast.error('ops, tente novamente mais tarde!')
    })
  }

  return (
    <div className="container-post-renevues">
      <Header></Header>
      <form className="container-form-post" onSubmit={(e) => handleformrenevues(e)}>
        <Title
          color="coral"
          level="600"
          size="30px"
          title="Compartilhe suas melhores receitas 😋"
        ></Title>

        <div className="box-input-form">
          <input
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            name="title"
            placeholder="Nome da sua receita:"
            className="inputformrenevues"
          />
          <div className="inputformringredientes">
            <input
              type="text"
              name="ingredientes"
              placeholder="ingredientes:"
              onChange={(e) => setIngrediente(e.target.value)}
              value={ingredientes}
            />
            <button
              type="button"
              onClick={() => {
                if (!ingredientes) {
                  toast.info('Adicione os ingredientes')
                  return;
                }
                setDatangrediente([...dataingredientes, ingredientes]);
                setIngrediente("");
              }}
            >
              +
            </button>
          </div>
          <select onChange={(e) => setNivel(e.target.value)} className="inputformrenevues">
            <option style={{fontWeight:"600"}}>Nivel de dificuldade</option>
            <option value={"facil"}>facil</option>
            <option value={"medio"}>medio</option>
            <option value={"dificil"}>dificil</option>
          </select>
          <select onChange={(e) => setTipo(e.target.value)} className="inputformrenevues">
            <option style={{fontWeight:"600"}}>Tipo</option>
            <option value={"doce"}>doce</option>
            <option value={"salgado"}>salgado</option>
          </select>
          <select onChange={(e) => setCategoria(e.target.value)} className="inputformrenevues">
            <option style={{fontWeight:"600"}}>Categoria</option>
            <option value={"massas"}>massas</option>
            <option value={"carnes"}>carnes</option>
            <option value={"bebidas"}>bebidas</option>
            <option value={"sopas"}>sopas</option>
            <option value={"fitness"}>fitness</option>
            <option value={"lanches"}>lanches</option>
          </select>
          <input
            onChange={(e) => setTempo(e.target.value)}
            className="inputformrenevues"
            placeholder="Tempo ex: 45min/45minutos "
          ></input>
          {dataingredientes.length > 0 &&
            dataingredientes.map((item, index) => {
              return (
                <p key={index} className="ingrediente-tag">
                  {item}
                  <button
                    disabled={load}
                    type="button"
                    style={{ background: "none", color: "#fff", border: "0", marginLeft: "10px" }}
                    onClick={() => {
                      setDatangrediente(dataingredientes.filter((ing) => ing !== item));
                    }}
                  >
                    x
                  </button>
                </p>
              );
            })}
          <textarea
            name="preparo"
            placeholder="Modo de preparo: "
            style={{ width: "100%", padding: "1rem", outline: "none" }}
            onChange={(e) => setModo(e.target.value)}
          ></textarea>
          <div className="box-input-file">
            <input
              id="files"
              onChange={(e) => FilesRegister(e)}
              type="file"
              multiple={true}
              max={2}
            ></input>
            <div className="input-false">
              <FiUpload size={25}></FiUpload>
              <p>Inserir fotos</p>
            </div>
          </div>
          <div className="box-list-files">
            {datafiles?.map((item: InputFilesType, index: number) => {
              return (
                <span
                  style={{
                    padding: "5px",
                    background: "coral",
                    color: "#fff",
                    width: "max-content",
                  }}
                  key={index}
                >
                  {item.name} <button type="button" onClick={()=>handleDeletefile(item.name,index)}>X</button>
                </span>
              );
            })}
          </div>
          <button id="btnpost" type="submit">Postar</button>
        </div>
      </form>
      <Footer></Footer>
    </div>
  );
}
